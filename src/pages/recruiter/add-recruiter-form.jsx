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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "../../components/ui/dropdown-menu";
import { Checkbox } from "../../components/ui/checkbox";
import { createRecruiter } from "@/services/recruiter";


export function AddRecruiterForm() {
  const form = useForm({
    mode: "onChange",
  });

  const {mutate} = useMutation(createRecruiter, {
    onSuccess : ({data}) => console.log(data)
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
                  placeholder="name"
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
                placeholder="email"
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
                  placeholder="password"
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
            <FormItem className="flex space-x-5 justify-center">
              <FormLabel className="my-auto">Category</FormLabel>
              <FormControl className="">
                <select
                  className="border border-black rounded-md"
                  name=""
                  placeholder="Select"
                  id="dropdown"
                >
                  <option value="1">BPO</option>
                  <option value="6">IT</option>
                  <option value="7">NOT IT</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isSuperAdmin"
          render={({ field }) => (
            <FormItem className="flex space-x-12 justify-center">
              <FormLabel className="my-auto">Super Admin</FormLabel>
              <Checkbox id="superAdmin" className="" />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Create
        </Button>
      </form>
    </Form>
  );
}
