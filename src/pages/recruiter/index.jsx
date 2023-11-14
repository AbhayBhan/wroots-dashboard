import { AddForm } from "@/components/organism/add-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import UsersTable from "./recruiter-table";
import { AddRecruiterForm } from "@/pages/recruiter/add-recruiter-form";
import { useState } from "react";

const Recruiter = () => {
  const [shouldRefresh, setShouldRefresh]=useState(false);
  return (
    <div>
      <div className="flex mb-5">
        <h2 className="text-2xl font-bold tracking-tight">Recruiter List</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" className="ml-auto">
              <PlusIcon className="w-4 h-4 mr-1" /> Add new Recruiter
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-3">Add new Recruiter</DialogTitle>
              <AddRecruiterForm refresh={setShouldRefresh}/>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="p-4 mt-4 rounded-md bg-background">
        <UsersTable ShouldRefresh={shouldRefresh}/>
      </div>
    </div>
  );
};

export default Recruiter;
