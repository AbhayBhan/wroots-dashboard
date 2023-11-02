import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { createRecruiter } from "@/services/recruiter";
import { useState } from "react";
import { ScrollBar, ScrollArea } from "@/components/ui/scroll-area";


export function InfoCardEditForm() {
    const form = useForm({
        mode: "onChange",
    });

    const [skills, setSkills]=useState([]);

    // const { mutate } = useMutation(createRecruiter, {
    //     onSuccess: ({ data }) => console.log(data)
    // });

    function onSubmit(data) {
        // mutate(data);
        data.skills=data.skills.split(",") // String is parsed into array
        console.log(data);
    }

    return (
        <Form {...form} className="">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <ScrollArea><ScrollBar></ScrollBar></ScrollArea>
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
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="phone no."
                                    type="number"
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    id="phone"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex">
                    <FormField
                        control={form.control}
                        name="salary"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Expected Salary</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Salary $"
                                        type="number"
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="notice_period"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Notice Period</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Notice period"
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Experience</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="experience"
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Skills</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="skills"
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex">
                <FormField
                    control={form.control}
                    name="selected_date"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Selected Date</FormLabel>
                            <FormControl>
                                <Input
                                    type="date"
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="offered_date"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Offered Date</FormLabel>
                            <FormControl>
                                <Input
                                    type="date"
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                </div>
                <div className="flex">
                <FormField
                    control={form.control}
                    name="joined_date"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Joined Date</FormLabel>
                            <FormControl>
                                <Input
                                    type="date"
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="copmletion_date"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Completion date</FormLabel>
                            <FormControl>
                                <Input
                                    type="date"
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                </div>

                <Button type="submit" className="w-full">
                    Create
                </Button>
            </form>
        </Form>
    );
}
