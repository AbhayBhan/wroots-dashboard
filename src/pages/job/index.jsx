import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import JobTable from "./job-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { AddForm } from "@/components/organism/add-form";

const Job = () => {
  return (
    <div>
      <div className="flex mb-5">
        <h2 className="text-2xl font-bold tracking-tight">Jobs List</h2>
        {/* <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" className="ml-auto">
              <PlusIcon className="w-4 h-4 mr-1" /> Add new Job
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-3">Add new Job</DialogTitle>
              Add job form will be there.
            </DialogHeader>
          </DialogContent>
        </Dialog> */}
        <Button onClick={() => window.location.href = "https://wroots-form.netlify.app/"} variant="default" className="ml-auto">
          <PlusIcon className="w-4 h-4 mr-1" /> Add new Job
        </Button>
      </div>
      {/* <Tabs defaultValue="active">
        <TabsList className="flex justify-start h-auto p-0 bg-transparent border-b rounded-none w-fill">
          {["active", "archived"].map((item) => (
            <TabsTrigger
              value={item}
              key={item}
              className="data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent rounded-none capitalize"
            >
              {item}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="p-4 mt-4 rounded-md bg-background">
          <TabsContent value="active" className="m-0">
            <JobTable />
          </TabsContent>
          <TabsContent value="archived" className="m-0">
            <JobTable />
          </TabsContent>
        </div>
      </Tabs> */}
      <div className="p-4 mt-4 rounded-md bg-background">
        <JobTable />
      </div>
    </div>
  );
};

export default Job;
