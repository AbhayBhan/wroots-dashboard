import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { fetchActiveJobs } from "@/services/jobs";
import { getFirstDayOfYear, getCurrentDate } from "@/utils/dateTime";
import { Card1, Card2, Card3 } from "./cards/cards";
import {
  getSuperAdminDashboard,
  getRecruiterDashboard,
} from "@/services/dashboard";
import Spinner from "@/components/organism/spinner";
import MyResponsiveFunnel from "./cards/funnel";

const Dashboard = () => {
  const userdata = JSON.parse(localStorage.getItem("userdata"));
  const [funnelData, setFunnelData] = useState([
    { id: 1, label: "test", value: 2000 },
  ]);
  const form = useForm({
    // resolver: zodResolver(profileFormSchema),
    defaultValues: {
      category: "",
      startDate: getFirstDayOfYear(),
      endDate: getCurrentDate(),
    },
    mode: "onChange",
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

  function onSubmit(data) {
    console.log(data);
  }

  const jobOptions = categoryData?.data?.roles?.records?.map((job) => ({
    label: job?.name,
    value: job?.id,
  }));

  useEffect(() => {
    if (userdata?.isSuperAdmin) {
      mutate(form.getValues());
    } else {
      mutate({ ...form.getValues(), recruiterId: userdata?.id });
    }
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 h-[1000px]"
      >
        <div className="flex justify-between mb-5">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
            <h4>Here is the summary of the overall data</h4>
          </div>
          <div className="flex justify-between mt-2 gap-3">
            {/* <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Select
                    onValueChange={(e) => field.onChange(Number(e))}
                    value={field.value}
                    placeholder="Select Category"
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-[227px]">
                      {jobOptions?.map((option) => (
                        <SelectItem value={option.value} key={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      type="date"
                      value={field.value}
                      onChange={(e) => field.onChange(e)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      type="date"
                      value={field.value}
                      onChange={(e) => field.onChange(e)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
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
      </form>
    </Form>
  );
};

export default Dashboard;
