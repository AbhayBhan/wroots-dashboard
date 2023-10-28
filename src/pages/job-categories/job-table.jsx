import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import * as React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { AddForm } from "@/components/organism/add-form";
import Pagination from "@/components/organism/pagination";
import SearchFilter from "@/components/organism/search-filter";
import SimpleTable from "@/components/organism/simple-table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { jobCategoryData } from "@/data/job-categories";
import { useState } from "react";
import { JobCategoryForm } from "./job-category-form";

export const columns = [
  {
    id: "category",
    header: "Category Name",
    cell: ({ getValue }) => (
      <div className="flex items-center gap-3">
        <Avatar>
          {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p>{getValue("category")}</p>
      </div>
    ),
  },
  {
    id: "average_salary",
    header: "Average Salary",
    cell: ({ getValue }) => (
      <div className="capitalize">{getValue("average_salary")}</div>
    ),
  },
  {
    id: "job_growth_rate",
    header: "Job Growth Rate",
    cell: ({ getValue }) => {
      return (
        <div className="text-xs">
          <p>{getValue("job_growth_rate")}</p>
        </div>
      );
    },
  },

  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      return (
        <div className="flex justify-end gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Pencil1Icon className="w-5 h-5 text-slate-500" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="mb-3">Edit Job Categories</DialogTitle>
                <JobCategoryForm />
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <TrashIcon className="w-5 h-5 text-red-500" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction variant="destructive">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];

const JobTable = () => {
  const [page, setPage] = useState(1);
  const [filterTerm, setFilterTerm] = useState("");

  return (
    <div className="w-full">
      <div className=" pb-4">
        <SearchFilter
          onChange={setFilterTerm}
          placeholder="Filter by name..."
        />
      </div>
      <SimpleTable data={jobCategoryData} columns={columns} />
      <Pagination page={page} setPage={setPage} totalPages={100} />
    </div>
  );
};

export default JobTable;