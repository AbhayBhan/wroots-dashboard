import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNote } from "@/services/mock/candidate";
import Spinner from "@/components/organism/spinner";

const Noteform = () => {
  const queryClient = useQueryClient();
  const form = useForm({
    // resolver: zodResolver(profileFormSchema),
    mode: "onChange",
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: addNote,
    mutationKey: ["Add-Note"],
    keepPreviousData: true,
    onSuccess: () => {
      form.reset({ description: "" });
      queryClient.invalidateQueries({ queryKey: ["All-Notes"] });
    },
  });

  function onSubmit(data) {
    data["author"] = "David Johnson";
    console.log(data);
    mutate(data);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Textarea placeholder="Write note here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex_end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Spinner className="text-primary-foreground" />
            ) : (
              "Post"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default Noteform;
