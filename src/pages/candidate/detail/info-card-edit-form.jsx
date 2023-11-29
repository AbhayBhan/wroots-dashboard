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
import { editCandidateDetails } from "@/services/candidate";
import { useState } from "react";
import { ScrollBar, ScrollArea } from "@/components/ui/scroll-area";


export function InfoCardEditForm({name, id, email, phoneNumber, refresh}) {
    const form = useForm({
        mode: "onChange",
        defaultValues: {
            name: name, 
            candidateId: id, 
            email: email, 
            phoneNumber: phoneNumber, 
            resumePath:"", 
            latest_experience:"", 
            noticePeriod:"", 
            selectedDate: "", 
            offeredDate:"", 
            joinedDate:"", 
            periodCompletedDate:""
        }
    });

    const [skills, setSkills] = useState([]);

    const { mutate } = useMutation(editCandidateDetails, {
        onSuccess: ({ data }) => console.log(data)
    });

    function onSubmit(data) {
        console.log(data);
        mutate(data);
        refresh(true)
    }

    return (
        <Form {...form} className="">
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid h-[80vh] grid-cols-2 gap-2 lg:grid-cols-12">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="col-span-2 space-y-1 lg:col-span-12 ">
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
                    name="email"
                    render={({ field }) => (
                        <FormItem className="col-span-2 space-y-1 lg:col-span-12">
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
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem className="space-y-1 lg:col-span-12 col-span-2">
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
                <FormField
                    control={form.control}
                    name="noticePeriod"
                    render={({ field }) => (
                        <FormItem className="space-y-1 lg:col-span-6">
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
                <FormField
                    control={form.control}
                    name="latest_experience"
                    render={({ field }) => (
                        <FormItem className="space-y-1 lg:col-span-6">
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
                    name="selectedDate"
                    render={({ field }) => (
                        <FormItem className="space-y-1 lg:col-span-3">
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
                    name="offeredDate"
                    render={({ field }) => (
                        <FormItem className="space-y-1 lg:col-span-3">
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
                <FormField
                    control={form.control}
                    name="joinedDate"
                    render={({ field }) => (
                        <FormItem className="space-y-1 lg:col-span-3">
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
                    name="periodCompletedDate"
                    render={({ field }) => (
                        <FormItem className="space-y-1 lg:col-span-3">
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

                <div className="col-span-full flex_end">
                    <Button type="submit" className="w-full">
                        Create
                    </Button>
                </div>
            </form>
        </Form>
    );
}
