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
import { createCandidate } from "@/services/candidate";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export function CandidateForm({ onSuccessAction, initialData }) {
  const isEditing = !!initialData; // Determine if it's editing or adding

  const defaultValues = {
    name: isEditing ? initialData.name : "",
    email: isEditing ? initialData.email : "",
    phoneNumber: isEditing ? initialData.phoneNumber : "",
    referrorName: isEditing ? initialData.referrorName : "",
    referrorPhoneNumber: isEditing ? initialData.referrorPhoneNumber : "",
    recruiterId: isEditing ? initialData.recruiterId : "",
  };

  const form = useForm({
    mode: "onChange",
    defaultValues,
  });

  const candidateMuatation = useMutation(createCandidate, {
    onSuccess: ({ data }) => {
      console.log(data);
      onSuccessAction();
    },
  });

  function onSubmit(data) {
    // candidateMuatation.mutate(data);
    console.log(data);
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
                <Input placeholder="Candidate nsame..." {...field} />
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
          name="phoneNumber"
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
        <FormField
          control={form.control}
          name="recruiterId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recruiter</FormLabel>
              <FormControl>
                <Input placeholder="Recruiter..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full mt-4">
          Create
        </Button>
      </form>
    </Form>
  );
}
