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
import { addLocation, updateLocation } from "@/services/location";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";

const profileFormSchema = z.object({
  name: z.string(),
});

export function LocationForm({ onSuccessAction, initialData }) {
  const queryClient = useQueryClient();
  const isEditing = !!initialData; // Determine if it's editing or adding

  const defaultValues = isEditing ? { name: initialData.name } : { name: "" };

  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: isEditing ? updateLocation : addLocation,
    onSuccess: ({ data }) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["All-Locations"] });
      onSuccessAction();
    },
  });

  function onSubmit(data) {
    const payload = {
      ...data,
      ...(isEditing && { id: initialData.id }),
    };

    // console.log(payload);
    mutate(payload);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <Spinner className="text-white" />
          ) : isEditing ? (
            "Edit Location"
          ) : (
            "Add Location"
          )}
        </Button>
      </form>
    </Form>
  );
}
