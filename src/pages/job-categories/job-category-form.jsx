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
        <div className="flex-col w-full text-sm flex_center text-muted-foreground">
          <div className="w-20 h-20 mb-2 duration-300 border rounded-full hover:border-primary">
            <label htmlFor="image" className="w-full h-full flex_center ">
              <PlusIcon className="w-4 h-4" />
              <input id="image" type="file" className="hidden" />
            </label>
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
