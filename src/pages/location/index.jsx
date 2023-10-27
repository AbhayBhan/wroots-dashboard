import React from "react";
import LocationTable from "./location-table";
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
import { LocationForm } from "./location-form";
import { useState } from "react";

const Location = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="flex mb-5">
        <h2 className="text-2xl font-bold tracking-tight">Location List</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="ml-auto">
              <PlusIcon className="w-4 h-4 mr-1" /> Add new Location
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-3">Add new Location</DialogTitle>
              <LocationForm onSuccessAction={() => setIsOpen(false)} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="p-4 mt-4 rounded-md bg-background">
        <LocationTable />
      </div>
    </div>
  );
};

export default Location;
