import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { Checkbox } from "../../components/ui/checkbox";
import { createRecruiter } from "@/services/recruiter";
import ReactSelect from "react-select";
import { categoryOptions } from "@/utils/contants";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { DialogClose } from "@radix-ui/react-dialog";

export function AddRecruiterForm({refresh}) {
  const form = useForm({
    mode: "onChange",
  });

  useEffect(()=>{
    form.setValue("isSuperAdmin", false);
    form.setValue("isManager", false);
  },[])

  const { mutate } = useMutation(createRecruiter, {
    onSuccess: ({ data }) =>{
      console.log(data)
      toast("Successfully Added", {autoClose:2000});
      refresh(true);
    },
    onError:(data)=>{
      console.log(data.config.data);
      toast("Something Happened", {autoClose:2000});
    }
  });

  function onSubmit(data) {
    mutate(data);
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
          name="recruiter_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Password"
                  type="password"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  id="password"
                />
              </FormControl>
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
                value={field.value}
                onCheckedChange={(e) => field.onChange(e)}
              />
              <FormLabel>Manager</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

<DialogClose>
        <Button type="submit" className="w-full mt-4">
          Create Recruiter
        </Button>
</DialogClose>
      </form>
    </Form>
  );
}
