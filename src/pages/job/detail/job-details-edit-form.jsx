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
import { Input } from "@/components/ui/input";
import { fetchAllCategories } from "@/services/JobCategories";
import { getCompanies } from "@/services/companies";
import { editJob } from "@/services/jobs";
import { getLocations } from "@/services/location";
import { getSkills } from "@/services/skill";
import { formatDateForInput } from "@/utils/dateTime";
import { extractValuesFromOptions } from "@/utils/helper";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactSelect from "react-select";
import { toast } from "react-toastify";

export function JobDetailsEditForm({ initialData, onSuccessAction }) {
  const form = useForm({
    defaultValues: {
      name: initialData?.name || "",
      no_of_positions: initialData?.no_of_positions || "",
      end_date: formatDateForInput(initialData?.end_date) || "",
      min_experience: initialData?.min_experience || 0,
      max_experience: initialData?.max_experience || "",
      min_salary: initialData?.min_salary || "",
      max_salary: initialData?.max_salary || "",
      referral_amount: initialData?.referral_amount || "",
      category_id: { label: "", value: initialData?.category_id } || "",
      company_id:
        { label: initialData?.CompanyName, value: initialData?.company_id } ||
        "",
      briefing: initialData?.briefing || "",
    },
    mode: "onChange",
  });

  const jobMutation = useMutation({
    mutationFn: editJob,
    onSuccess: () => {
      toast.success("Job edited successfully!!");
      if(onSuccessAction){
        onSuccessAction();
      }
    },
    onError: () => {
      toast.error("Failed to edit Job!!");
    },
  });

  function onSubmit(data) {
    // const { skills, location, ...other } = data;
    const location = extractValuesFromOptions(data.location);
    const skills = extractValuesFromOptions(data.skills);
    const company_id = data.company_id.value;
    const category_id = data.category_id.value;
    const start_date = formatDateForInput(initialData?.start_date);
    const id = initialData?.id;
    const payload = { ...data, id,location,skills, company_id, category_id, start_date };

    // console.log(payload);
    jobMutation.mutate(payload);
  }

  const companyQuery = useQuery({
    queryKey: ["All-Company"],
    queryFn: getCompanies,
    refetchOnWindowFocus: false,
    onSuccess: ({ data }) => {
      const currentCompany = data?.companies?.find(
        (item) => item.id === initialData?.company_id
      );

      form.setValue("company_id", {
        label: currentCompany?.name,
        value: currentCompany?.id,
      });
    },
  });

  const skillQuery = useQuery({
    queryKey: ["All-Skills"],
    queryFn: getSkills,
    refetchOnWindowFocus: false,
  });

  const locationQuery = useQuery({
    queryKey: ["All-Locations"],
    queryFn: getLocations,
    refetchOnWindowFocus: false,
  });

  const categoryQuery = useQuery({
    queryKey: ["All-Categories"],
    queryFn: fetchAllCategories,
    refetchOnWindowFocus: false,
    onSuccess: ({ data }) => {
      const currentCategory = data?.category?.records.find(
        (item) => item.id === initialData?.category_id
      );

      form.setValue("category_id", {
        label: currentCategory?.name,
        value: currentCategory?.id,
      });
    },
  });

  const categoryData = categoryQuery?.data?.data?.category?.records;

  const generateOptions = (data) => {
    return data?.map((item) => ({ label: item?.name, value: item?.id }));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-2 lg:grid-cols-12"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="col-span-2 space-y-1 lg:col-span-6 ">
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Job title"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  id="name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="no_of_positions"
          render={({ field }) => (
            <FormItem className="space-y-1 lg:col-span-3">
              <FormLabel>Open Positions</FormLabel>
              <FormControl>
                <Input
                  placeholder="Open positions"
                  type="number"
                  min={0}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="end_date"
          render={({ field }) => (
            <FormItem className="space-y-1 lg:col-span-3">
              <FormLabel>Job Valid Till</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  placeholder="Job valid till"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="min_experience"
          render={({ field }) => (
            <FormItem className="space-y-1 lg:col-span-3">
              <FormLabel>
                Min Exp{" "}
                <span className="text-xs font-normal text-muted-foreground">
                  (Years, eg: 5)
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                 
                  placeholder="min experience"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="max_experience"
          render={({ field }) => (
            <FormItem className="space-y-1 lg:col-span-3">
              <FormLabel>
                Max Exp{" "}
                <span className="text-xs font-normal text-muted-foreground">
                  (Years, eg: 5)
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="max experience"
                  min={0}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="min_salary"
          render={({ field }) => (
            <FormItem className="space-y-1 lg:col-span-3 ">
              <FormLabel>
                Min CTC{" "}
                <span className="text-xs font-normal text-muted-foreground">
                  (In lakhs, eg: 500000)
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="max_salary"
          render={({ field }) => (
            <FormItem className="space-y-1 lg:col-span-3">
              <FormLabel>
                Min CTC{" "}
                <span className="text-xs font-normal text-muted-foreground">
                  (In lakhs, eg: 700000)
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem className="col-span-2 space-y-1 lg:col-span-6 ">
              <FormLabel>Skills required</FormLabel>
              <FormControl>
                <ReactSelect
                  options={generateOptions(skillQuery?.data?.data?.skills)}
                  isSearchable
                  isMulti
                  className="text-sm"
                  value={field.value}
                  onChange={(e) => field.onChange(e)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        {/* <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="space-y-1 lg:col-span-6">
              <FormLabel>Location</FormLabel>
              <FormControl>
                <ReactSelect
                  options={generateOptions(
                    locationQuery?.data?.data?.locations
                  )}
                  isSearchable
                  isMulti
                  className="text-sm"
                  value={field.value}
                  onChange={(e) => field.onChange(e)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="referral_amount"
          render={({ field }) => (
            <FormItem className="space-y-1 lg:col-span-4">
              <FormLabel>Referral Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category_id"
          render={({ field }) => (
            <FormItem className="space-y-1 lg:col-span-4">
              <FormLabel>Category</FormLabel>
              <FormControl>
                <ReactSelect
                  options={generateOptions(categoryData)}
                  isSearchable
                  className="text-sm"
                  value={field.value}
                  onChange={(e) => field.onChange(e)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company_id"
          render={({ field }) => (
            <FormItem className="space-y-1 lg:col-span-4">
              <FormLabel>Company</FormLabel>
              <FormControl>
                <ReactSelect
                  options={generateOptions(companyQuery?.data?.data?.companies)}
                  isSearchable
                  className="text-sm"
                  value={field.value}
                  onChange={(e) => field.onChange(e)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="briefing"
          render={({ field }) => (
            <FormItem className="space-y-1 col-span-full">
              <FormLabel>Briefing</FormLabel>
              <FormControl>
                <ReactQuill
                  className="min-h-[160px] border rounded-md shadow-sm"
                  theme="snow"
                  value={field.value}
                  onChange={(e) => field.onChange(e)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-full flex_end">
          <Button
            type="submit"
            className="mt-8"
            disabled={!form.formState.isDirty || jobMutation.isLoading}
          >
            {jobMutation.isLoading ? (
              <Spinner className="text-white" />
            ) : (
              "Update"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
