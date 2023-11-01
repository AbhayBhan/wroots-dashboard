import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DropdownMenu,
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
    DropdownMenuRadioGroup,} from "../ui/dropdown-menu";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";



const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  job: z.string().max(160).min(4),
 
});

// This can come from your database or API.
const defaultValues = {
  job: "Fullstack dev",
};

export function AddRecruiterForm() {
  const form = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data) {
    // I don't know why but it was not getting triggered after onSubmit of the form so i used handleSubmit function below
    console.log(data)
  }

  function handleSubmit(){
    console.log(document.getElementById("name").value);
    console.log(document.getElementById("email").value);
    console.log(document.getElementById("password").value);
    console.log(document.getElementById("dropdown").value);
    console.log(document.getElementById("superAdmin").value);

    var raw = JSON.stringify({
        recruiter_email: document.getElementById("email").value,
        recruiter_name: document.getElementById("name").value,
        recruiter_password: document.getElementById("password").value,
        isSuperAdmin: document.getElementById("superAdmin").value=='on'?true:false,
        categoryId: document.getElementById("dropdown").value
    });

    var requestOptions={
        method: 'POST',
        body: raw,
        redirect: "follow"
    }
    console.log(requestOptions)

    fetch("https://wroots-backend.onrender.com/recruiter/insertRecruiter", requestOptions)
    .then(res=>res.text())
    .then(res=>console.log(res))
    .catch(err=>console.log(err));

  }

  const [email, setEmail] = useState("");
  function handleEmailChange(e){
    setEmail(e.target.value.toLowerCase());
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
                <Input placeholder="name" {...field} id="name"/>
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
              <Input placeholder="email" value={email} onChange={(e)=>handleEmailChange(e)} id="email"/>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <Input placeholder="password" type="password" {...field} id="password"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex space-x-5 justify-center">
              <FormLabel className="my-auto">Category</FormLabel>
              <FormControl className="">
                <select className="border border-black rounded-md" name="" placeholder="Select" id="dropdown">
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
          name="Super Admin"
          render={({ field }) => (
            <FormItem className="flex space-x-12 justify-center">
              <FormLabel className="my-auto">Super Admin</FormLabel>
              <Checkbox id="superAdmin" className=""/>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" onClick={handleSubmit} className="w-full">Update</Button>
      </form>
    </Form>
  );
}
