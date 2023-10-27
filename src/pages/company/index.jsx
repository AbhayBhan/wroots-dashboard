import React from "react";
import CompanyTable from "./company-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { AddForm } from "@/components/organism/add-form";

const Company = () => {
  return (
    <div>
      <div className="flex mb-5">
        <h2 className="text-2xl font-bold tracking-tight">Companies List</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" className="ml-auto">
              <PlusIcon className="w-4 h-4 mr-1" /> Add new Company
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-3">Add new Company</DialogTitle>
              <AddForm />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="p-4 mt-4 rounded-md bg-background">
        <CompanyTable />
      </div>
    </div>
  );
};

export default Company;
