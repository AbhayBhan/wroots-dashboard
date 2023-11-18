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
import { addCompany, editCompany } from "@/services/companies";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const CompanyForm = ({ initialData, onSuccessAction }) => {
  const isEditMode = typeof initialData === "object";
  const queryClient = useQueryClient();
  const defaultValues = {
    name: initialData?.name || "",
  };

  const form = useForm({
    defaultValues,
  });

  const companyMutation = useMutation({
    mutationFn: isEditMode ? editCompany : addCompany,
    onSuccess: ({ data }) => {
      isEditMode
        ? toast.success("Company edited successfully!!")
        : toast.success("Company added successfully!!");
      queryClient.invalidateQueries({ queryKey: ["All-Company"] });
      if (onSuccessAction) onSuccessAction();
    },
    onError: () => {
      isEditMode
        ? toast.error("Failed to edit company!!")
        : toast.error("Failed to add company!!");
    },
  });

  function onSubmit(data) {
    let payload;

    if (isEditMode) {
      payload = {
        newName: data?.name,
        id: initialData?.id,
      };
    } else {
      payload = { name: data?.name };
    }
    console.log(payload);
    companyMutation.mutate(payload);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={companyMutation.isLoading}
        >
          {companyMutation.isLoading ? (
            <Spinner className="text-white" />
          ) : isEditMode ? (
            "Edit Company"
          ) : (
            "Add Company"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CompanyForm;
