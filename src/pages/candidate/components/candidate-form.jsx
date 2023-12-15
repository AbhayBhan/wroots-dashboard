import React, { useState } from "react";
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
import { categoryOptions } from "@/utils/contants";
import ReactSelect from "react-select";
import { createCandidate } from "@/services/candidate";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Spinner from "@/components/organism/spinner";
import { toast } from "react-toastify";

export function CandidateForm({ onSuccessAction, initialData }) {
  const isEditing = !!initialData; // Determine if it's editing or adding

  const [selectedCategory, setSelectedCategory] = useState(null);

  const defaultValues = {
    candiddateName: isEditing ? initialData.name : "",
    email: isEditing ? initialData.email : "",
    candidiatePhoneNumber: isEditing ? initialData.phoneNumber : "",
    referrorName: isEditing ? initialData.referrorName : "",
    referrorPhoneNumber: isEditing ? initialData.referrorPhoneNumber : "",
  };

  const form = useForm({
    mode: "onChange",
    defaultValues,
  });

  const candidateMuatation = useMutation(createCandidate, {
    onSuccess: ({ data }) => {
      toast.success("Candidate Created Successfully.");
      onSuccessAction();
    },
    onError: ({response}) => {
      toast.warn(response.data.msg)
      form.reset();
    }
  });

  function onSubmit(data) {
    const recruiterId = JSON.parse(localStorage.getItem('userdata')).id;
    const reqbody = { ...data, categoryId: selectedCategory, recruiterId };
    candidateMuatation.mutate(reqbody);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="candiddateName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Candidate name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Candidate email..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="candidiatePhoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Candidate phone number..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="referrorName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Referror Name</FormLabel>
              <FormControl>
                <Input placeholder="Referror Name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="referrorPhoneNumber"
          type="tel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Referror Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Referror phone number..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Category</FormLabel>
          <ReactSelect
            options={categoryOptions}
            className="w-full text-sm"
            isSearchable={false}
            value={categoryOptions.find(
              (option) => option.value === selectedCategory
            )}
            onChange={(e) => setSelectedCategory(e.value)}
          />
        </div>

        <Button disabled={candidateMuatation.isLoading} type="submit" className="w-full mt-4">
          {candidateMuatation.isLoading ? <Spinner /> : "Create"}
        </Button>
      </form>
    </Form>
  );
}
