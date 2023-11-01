import { useState } from "react";
import Spinner from "@/components/organism/spinner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createProcessing } from "@/services/candidate";
import { fetchActiveJobs } from "@/services/jobs";
import { statusData } from "@/services/mock/skill";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import ReactSelect from "react-select";

const ProcessingForm = ({ candidateId }) => {
  const form = useForm({
    // resolver: zodResolver(profileFormSchema),
    // defaultValues,
    mode: "onChange",
  });

  const [processLoading, setProcessLoading] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["Job", "Active"],
    queryFn: () => fetchActiveJobs(),
  });

  const { mutate } = useMutation(createProcessing, {
    onSuccess: ({ data }) => {
      setProcessLoading(false);
      window.location.reload(); // On success, We must close the dialog box, This is Temporary Fix.
    },
  });

  function onSubmit(data) {
    setProcessLoading(true);
    const selectedJob = jobOptions.find(option => option.id === data.roleId);
    const userdata = JSON.parse(localStorage.getItem("userdata"));
    const reqBody = {
      ...data,
      recruiterId: userdata.id,
      recruiterEmail: userdata.email,
      candidateId,
      candidateInterestedInRole: true,
      candidateInterestedInCompany: true,
      self_apply : false,
      locationIds: [4],
      referralAmount : selectedJob ? selectedJob.referral_amount : null,
      hiringCompanyId : selectedJob ? selectedJob.company_id : null
    };
    mutate(reqBody);
  }

  const jobOptions = data?.data?.roles;

  const generateOptions = (list) =>
    list?.map((option) => ({
      value: option.id,
      label: `${option.name} - ${option.CompanyName}`,
    }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="roleId"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Job</FormLabel>
              <FormControl>
                <ReactSelect
                  options={generateOptions(jobOptions)}
                  isSearchable
                  className="text-sm"
                  value={generateOptions(jobOptions)?.find(option => option.value === field.value) }
                  onChange={(e) => field.onChange(e.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="statusId"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={(e) => field.onChange(Number(e))}
                value={field.value}
                placeholder="Select a status"
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {statusData.map((st) => (
                    <SelectItem value={st.id} key={st.id}>
                      {st.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="candidateNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write note here..."
                  //   className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {processLoading ? <Spinner /> : "Create"}
        </Button>
      </form>
    </Form>
  );
};

export default ProcessingForm;