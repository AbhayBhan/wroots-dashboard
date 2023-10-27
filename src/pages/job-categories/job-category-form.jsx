import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FileInput from "@/components/organism/file-input";
import { PlusIcon } from "@radix-ui/react-icons";

const categoryFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
});

// This can come from your database or API.

export function JobCategoryForm({ initialData }) {
  const defaultValues = {
    name: initialData?.name || "",
  };

  const form = useForm({
    resolver: zodResolver(categoryFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="w-full flex_center flex-col text-muted-foreground text-sm">
          <div className="rounded-full flex_center h-20 w-20 border mb-2">
            <label htmlFor="image">
              <PlusIcon className="w-4 h-4" />
            </label>
            <input id="image" type="file" className="hidden" />
          </div>
          <p>Upload image</p>
        </div>

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

        <Button type="submit" className="w-full">
          Done
        </Button>
      </form>
    </Form>
  );
}
