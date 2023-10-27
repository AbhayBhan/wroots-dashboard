import Spinner from "@/components/organism/spinner";
import { Button } from "@/components/ui/button";
import {
  FormField,
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addSkill, updateSkill } from "@/services/skill"; // Add updateSkill function for editing
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";

const profileFormSchema = z.object({
  name: z.string(),
});

export function SkillForm({ onSuccessAction, initialData }) {
  const isEditing = !!initialData; // Determine if it's editing or adding

  const defaultValues = isEditing ? { name: initialData.name } : { name: "" };

  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: isEditing ? updateSkill : addSkill,
    onSuccess: ({ data }) => {
      console.log(data);
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
              <FormLabel>Skill Name</FormLabel>
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
            "Edit Skill"
          ) : (
            "Add Skill"
          )}
        </Button>
      </form>
    </Form>
  );
}
