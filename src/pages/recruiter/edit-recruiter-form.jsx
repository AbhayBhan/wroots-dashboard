import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import { updateRecruiter } from "@/services/recruiter";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
import React from "react";
import { categoryOptions } from "@/utils/contants";

export function EditRecruiterForm({ rowData , refresh}) {
  const form = useForm({
    mode: "onChange",
    values: rowData,
  });

  const toastId = React.useRef(null);

  const { mutate } = useMutation(updateRecruiter, {
    onSuccess: ({ data }) => {
      console.log(data);
      toast("Successfully Updated", { autoClose: 2000 });
      refresh(true);
    },
  });

  function onSubmit(data) {
    console.log(data)
    let obj={
      id: data.id,
      domain_id: data.domain_id,
      recruiter_name: data.recruiter_name,
      recruiter_email: data.recruiter_email,
      recruiter_status: data.recruiter_status,
      isSuperAdmin: data.isSuperAdmin,
      categoryId: data.categoryId,
      isManager: data.isManager
    }
    console.log(obj)
    mutate(obj);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="recruiter_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Name"
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
          name="recruiter_email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="Email"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                id="email"
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="my-auto">Category</FormLabel>
              <FormControl>
                <ReactSelect
                  options={categoryOptions}
                  className="text-sm"
                  isSearchable={false}
                  value={categoryOptions.find(
                    (option) => option.value === field.value
                  )}
                  onChange={(e) => field.onChange(e.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isSuperAdmin"
          render={({ field }) => (
            <FormItem className="flex gap-2">
              <Checkbox
                id="superAdmin"
                className="mt-2"
                checked={field.value}
                value={field.value}
                onCheckedChange={(e) => field.onChange(e)}
              />
              <FormLabel>Super Admin</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isManager"
          render={({ field }) => (
            <FormItem className="flex gap-2">
              <Checkbox
                id="Manager"
                className="mt-2"
                checked={field.value}
                value={field.value}
                onCheckedChange={(e) => field.onChange(e)}
              />
              <FormLabel>Manager</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full mt-4">
          Update Recruiter
        </Button>
      </form>
    </Form>
  );
}
