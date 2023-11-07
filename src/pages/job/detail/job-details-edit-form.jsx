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
import { useEffect, useState } from "react";
import { ScrollBar, ScrollArea } from "@/components/ui/scroll-area";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Select, SelectItem, SelectValue, SelectContent, SelectTrigger } from "@/components/ui/select";
import { skillData } from "@/data/skill";
import { companyData } from "@/data/company";
import { locationData } from "@/data/location";
import { categoryData } from "@/data/category";
import ReactSelect from "react-select";


export function JobDetailsEditForm() {
    const form = useForm({
        mode: "onChange",
    });

    const [skillSet, setSkillSet] = useState([]);
    const [companySet, setCompanySet] = useState([]);
    const [categorySet, setCategorySet] = useState([]);
    const [locationSet, setLocationSet] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();


    const [skills, setSkills] = useState([]);

    // const { mutate } = useMutation(createRecruiter, {
    //     onSuccess: ({ data }) => console.log(data)
    // });

    function onSubmit(data) {
        // mutate(data);
        console.log(data);
    }

    useEffect(() => {
        const transformedSkillSet = skillData.map((skill) => ({
            label: skill.name,
            value: skill,
        }));

        const transformedCompanySet = companyData.map((company) => ({
            label: company.name,
            value: company,
        }));

        const transformedCategorySet = categoryData.map((cat) => ({
            label: cat.name,
            value: cat,
        }));

        const transformedLocationSet = locationData.map((loc) => ({
            label: loc.name,
            value: loc,
        }));

        setSkillSet(transformedSkillSet);

        setCompanySet(transformedCompanySet);

        setCategorySet(transformedCategorySet);

        setLocationSet(transformedLocationSet);
    }, []);

    return (
        <Form {...form} className="">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <ScrollArea><ScrollBar></ScrollBar></ScrollArea>
                <FormField
                    control={form.control}
                    name="job_title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Job title"
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    id="name"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-between px-5">
                    <FormField
                        control={form.control}
                        name="open_positions"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Open Positions</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Open positions"
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
                        name="job_valid_till"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Job Valid Till</FormLabel>
                                <FormControl>
                                    <Input
                                        type="date"
                                        placeholder="Job valid till"
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-between px-5">
                    <FormField
                        control={form.control}
                        name="min_experience"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Min Exp(Years, eg:5)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="min experience"
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
                        name="min_experience"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Max Exp(Years, eg:5)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="max experience"
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.target.value)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-between px-5">
                    <FormField
                        control={form.control}
                        name="min_ctc"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Min CTC(In lakhs, eg:500000)</FormLabel>
                                <FormControl>
                                    <Input
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
                        name="max_ctc"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Min CTC(In lakhs, eg:700000)</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
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
                    name="briefing"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Briefing</FormLabel>
                            <FormControl>
                                <ReactQuill
                                    theme="snow"
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.target.value)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-between px-5">
                    <FormField
                        control={form.control}
                        name="referral_amount"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Referral Amount</FormLabel>
                                <FormControl>
                                    <Input
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
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <ReactSelect
                                    options={categorySet}
                                    isSearchable
                                    className="text-sm"
                                    value={field.value}
                                    onChange={(e) => field.onChange(e)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                </div>
                <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Skills required</FormLabel>
                            <FormControl>
                                <ReactSelect
                                    options={skillSet}
                                    isSearchable
                                    isMulti
                                    className="text-sm"
                                    value={field.value}
                                    onChange={(e) => field.onChange(e)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex justify-between px-5">
                <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                                <ReactSelect
                                    options={companySet}
                                    isSearchable
                                    className="text-sm"
                                    value={field.value}
                                    onChange={(e) => field.onChange(e)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <ReactSelect
                                    options={locationSet}
                                    isSearchable
                                    isMulti
                                    className="text-sm"
                                    value={field.value}
                                    onChange={(e) => field.onChange(e)}
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
