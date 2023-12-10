import React, { useState, useEffect } from "react";
import BarComponent from "./barcomponent";
import { DateRange } from "@/components/ui/date-range";
import { useQuery } from "@tanstack/react-query";
import { getRecruiterReports } from "@/services/dashboard";
import Spinner from "@/components/organism/spinner";
import {
  formatDateOnlyString,
  getCurrentDate,
  getFirstDayOfYear,
} from "@/utils/dateTime";

const Reports = () => {
  const [reportList, setReportList] = useState([]);

  const [dateValues, setDateValues] = useState({
    startDate: getFirstDayOfYear(),
    endDate: getCurrentDate(),
  });

  const { data, isLoading } = useQuery({
    queryKey: ["Recruiter", "Reports", dateValues],
    queryFn: () =>
      getRecruiterReports({
        startDate: formatDateOnlyString(dateValues.startDate),
        endDate: formatDateOnlyString(dateValues.endDate),
      }),
  });

  useEffect(() => {
    setReportList(
      data?.data?.results.map((rep) => ({
        labels: [
          "assignedDateCount",
          "selectedDateCount",
          "offeredDateCount",
          "joinedDateCount",
          "PeriodCompletedCount",
        ],
        datasets: [
          {
            label: `${rep.RecruiterName}'s Report`,
            data: [
              rep.assignedDateCount,
              rep.selectedDateCount,
              rep.offeredDateCOunt,
              rep.joinedDateCount,
              rep.PeriodCompletedCount,
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(201, 203, 207, 0.2)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ],
            borderWidth: 1,
          },
        ],
      }))
    );
  }, [data]);

  return (
    <div className="w-full">
      <div className="flex justify-between mb-5">
        <h2 className="text-2xl font-bold tracking-tight">Recruiter Reports</h2>
        <DateRange
          from={dateValues.startDate}
          to={dateValues.endDate}
          onChange={setDateValues}
        />
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="flex flex-row flex-wrap gap-3">
          {reportList?.map((data, index) => (
            <BarComponent key={index} index={index} data={data} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Reports;
