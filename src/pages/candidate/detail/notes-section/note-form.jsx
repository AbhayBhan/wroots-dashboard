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
import Spinner from "@/components/organism/spinner";

const Noteform = ({submitNote,isLoading}) => {
  const form = useForm({
    // resolver: zodResolver(profileFormSchema),
    mode: "onChange",
  });

  function onSubmit(data) {
    submitNote(data.noteString);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="noteString"
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
