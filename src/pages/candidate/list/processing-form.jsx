import SearchFilter from "@/components/organism/search-filter";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { fetchActiveJobs } from "@/services/jobs";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const ProcessingForm = () => {
  const form = useForm({
    // resolver: zodResolver(profileFormSchema),
    // defaultValues,
    mode: "onChange",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["Job", "Active"],
    queryFn: () => fetchActiveJobs(),
  });

  function onSubmit(data) {
    console.log(data);
  }

  const jobOptions = data?.data?.roles?.records?.map((job) => ({
    label: job?.name,
    value: job?.id,
  }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex gap-2 w-full">
          <FormField
            control={form.control}
            name="job"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Job</FormLabel>
                <Select
                  onValueChange={(e) => field.onChange(Number(e))}
                  value={field.value}
                  placeholder="Select job"
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a job" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-[227px]">
                    <ScrollArea className="h-60">
                      {jobOptions?.map((option) => (
                        <SelectItem value={option.value} key={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="note"
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
          Update
        </Button>
      </form>
    </Form>
  );
};

export default ProcessingForm;
