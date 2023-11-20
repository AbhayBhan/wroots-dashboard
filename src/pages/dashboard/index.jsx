import Spinner from "@/components/organism/spinner";
import { DateRange } from "@/components/ui/date-range";
import {
  getRecruiterDashboard,
  getSuperAdminDashboard,
} from "@/services/dashboard";
import { fetchActiveJobs } from "@/services/jobs";
import {
  formatDateOnlyString,
  getCurrentDate,
  getFirstDayOfYear
} from "@/utils/dateTime";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Card1, Card2, Card3 } from "./cards/cards";
import MyResponsiveFunnel from "./cards/funnel";

const Dashboard = () => {
  const userdata = JSON.parse(localStorage.getItem("userdata"));
  const [funnelData, setFunnelData] = useState([
    { id: 1, label: "test", value: 2000 },
  ]);

  const [dateValues, setDateValues] = useState({
    startDate: getFirstDayOfYear(),
    endDate: getCurrentDate(),
  });

  const { data: categoryData, isLoading } = useQuery({
    queryKey: ["Job", "Active"],
    queryFn: fetchActiveJobs,
  });

  const { mutate, isLoading: dashboardLoading } = useMutation(
    userdata?.isSuperAdmin ? getSuperAdminDashboard : getRecruiterDashboard,
    {
      onSuccess: ({ data }) => {
        const allowedLabels = ["In_Process", "Joined", "Selected", "Quit"];
        const filteredData = data?.funnelData
          .filter((item) => allowedLabels.includes(item.name))
          .map((item) => ({
            id: item.candidate_processing_status_id,
            label: item.name,
            value: item.candidate_count,
          }))
          .sort((a, b) => b.value - a.value);

        setFunnelData(filteredData);
      },
    }
  );

  const jobOptions = categoryData?.data?.roles?.records?.map((job) => ({
    label: job?.name,
    value: job?.id,
  }));

  useEffect(() => {
    if (userdata?.isSuperAdmin) {
      mutate({
        startDate: formatDateOnlyString(dateValues.startDate),
        endDate: formatDateOnlyString(dateValues.endDate),
      });
    } else {
      mutate({
        startDate: formatDateOnlyString(dateValues.startDate),
        endDate: formatDateOnlyString(dateValues.endDate),
        recruiterId: userdata?.id,
      });
    }
  }, [dateValues]);

  return (
    <div className="space-y-2 h-[1000px]">
      <div className="flex justify-between mb-5">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
          <h4>Here is the summary of the overall data</h4>
        </div>
        <DateRange
          from={dateValues.startDate}
          to={dateValues.endDate}
          onChange={setDateValues}
        />
      </div>
      {dashboardLoading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="p-4 mt-4 rounded-md bg-background h-[450px]">
          <div className="flex justify-between w-full">
            <Card1 isLoading={isLoading} />
            <Card2 />
            <Card3 />
          </div>
          <MyResponsiveFunnel data={funnelData} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
