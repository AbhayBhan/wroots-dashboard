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
import { categoryData } from "@/data/category";
import { companyData } from "@/data/company";
import { locationData } from "@/data/location";
import { skillData } from "@/data/skill";
import { formatDateForInput } from "@/utils/dateTime";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ReactSelect from "react-select";

export function JobDetailsEditForm({ initialData, onSuccessAction }) {
  const form = useForm({
    defaultValues: {
      job_title: initialData?.name || "",
      open_positions: initialData?.no_of_positions || "",
      job_valid_till: formatDateForInput(initialData?.end_date) || "",
      min_experience: initialData?.min_experience || "",
      max_experience: initialData?.max_experience || "",
      min_ctc: initialData?.min_salary || "",
      max_ctc: initialData?.max_salary || "",
      skills: initialData?.skills || "",
      location: initialData?.location || "",
      referral_amount: initialData?.referral_amount || "",
      category: initialData?.category_id || "",
      company: initialData?.company_id || "",
      briefing: initialData?.briefing || "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    console.log(typeof initialData.briefing);
  }, []);

  const [skillSet, setSkillSet] = useState([]);
  const [companySet, setCompanySet] = useState([]);
  const [categorySet, setCategorySet] = useState([]);
  const [locationSet, setLocationSet] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  const [skills, setSkills] = useState([]);

  // const { mutate } = useMutation(createRecruiter, {
  //     onSuccess: ({ data }) => console.log(data)
  // });

  function onSubmit(data) {
    // mutate(data);
    console.log(data);
  }

  useEffect(() => {
    const transformedSkillSet = skillData.map((skill) => ({
      label: skill.name,
      value: skill,
    }));

    const transformedCompanySet = companyData.map((company) => ({
      label: company.name,
      value: company,
    }));

    const transformedCategorySet = categoryData.map((cat) => ({
      label: cat.name,
      value: cat,
    }));

    const transformedLocationSet = locationData.map((loc) => ({
      label: loc.name,
      value: loc,
    }));

    setSkillSet(transformedSkillSet);

    setCompanySet(transformedCompanySet);

    setCategorySet(transformedCategorySet);

    setLocationSet(transformedLocationSet);
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-2 lg:grid-cols-12"
      >
        <FormField
          control={form.control}
          name="job_title"
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
          name="open_positions"
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
          name="job_valid_till"
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
                  min={0}
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
          name="min_ctc"
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
          name="max_ctc"
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

        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem className="col-span-2 space-y-1 lg:col-span-6 ">
              <FormLabel>Skills required</FormLabel>
              <FormControl>
                <ReactSelect
                  options={skillSet}
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
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="space-y-1 lg:col-span-6">
              <FormLabel>Location</FormLabel>
              <FormControl>
                <ReactSelect
                  options={locationSet}
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
        />

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
          name="category"
          render={({ field }) => (
            <FormItem className="space-y-1 lg:col-span-4">
              <FormLabel>Category</FormLabel>
              <FormControl>
                <ReactSelect
                  options={categorySet}
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
          name="company"
          render={({ field }) => (
            <FormItem className="space-y-1 lg:col-span-4">
              <FormLabel>Company</FormLabel>
              <FormControl>
                <ReactSelect
                  options={companySet}
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
          <Button type="submit" className="mt-8">
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
}
