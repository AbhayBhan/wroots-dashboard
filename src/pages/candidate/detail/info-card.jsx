import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { InfoCardEditForm } from "./info-card-edit-form";
import { ScrollArea } from "@/components/ui/scroll-area";

const InfoCard = ({
  hide = [],
  email,
  phone,
  languages,
  country,
  status,
  skills,
  id,
  name,
  refresh
}) => {
  return (
    <div className="p-5">
      <div className="flex_between">
        <p className="font-medium text-slate-400">Details</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Pencil1Icon className="w-5 h-5 text-slate-500" />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full lg:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="mb-3">Edit details</DialogTitle>
              <ScrollArea className="w-full h-[80vh]">
                <div className="px-1">
                  <InfoCardEditForm name={name} email={email} id={id} phoneNumber={phone} refresh={refresh}/>
                </div>
              </ScrollArea>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <ul className="pt-4 space-y-2 text-sm">
        {!hide.includes("email") && (
          <li>
            <span className="font-medium">Email:</span>{" "}
            <span className="text-muted-foreground">{email}</span>{" "}
          </li>
        )}
        {!hide.includes("phone") && (
          <li>
            <span className="font-medium">Phone:</span>{" "}
            <span className="text-muted-foreground">{phone}</span>
          </li>
        )}
        {/* {!hide.includes("language") && (
          <li>
            <span className="font-medium">Language:</span>{" "}
            <span className="text-muted-foreground">{languages}</span>
          </li>
        )}
        {!hide.includes("country") && (
          <li>
            <span className="font-medium">Country:</span>{" "}
            <span className="text-muted-foreground">{country}</span>
          </li>
        )}
        {!hide.includes("status") && (
          <li>
            <span className="font-medium">Status:</span>{" "}
            <span className="text-muted-foreground">{status}</span>
          </li>
        )} */}
        {!hide.includes("expected_salary") && (
          <li>
            <span className="font-medium">Expexted Salary:</span>{" "}
            <span className="text-muted-foreground">{"NaN"}</span>
          </li>
        )}
        {!hide.includes("notice_period") && (
          <li>
            <span className="font-medium">Notice Period:</span>{" "}
            <span className="text-muted-foreground">{"NaN"}</span>
          </li>
        )}
        {!hide.includes("experience") && (
          <li>
            <span className="font-medium">Experience:</span>{" "}
            <span className="text-muted-foreground">{"NaN"}</span>
          </li>
        )}
        {!hide.includes("resume") && (
          <li className="flex">
            <span className="font-medium">Resume:</span>
            <p className="flex_between w-full">
              <Button variant="link" className="p-0 h-fit">
                View
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="link" className="p-0 h-fit">
                    Upload
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="mb-3">Upload resume</DialogTitle>
                    <div className="flex_center border-2 border-dashed hover:border-blue-500 rounded flex-1 py-10 text-muted-foreground">
                      Upload PDF
                    </div>
                    <Button className="w-full mt-2">Upload</Button>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </p>
          </li>
        )}
        {!hide.includes("skills") && (
          <li>
            <span className="font-medium">Skills:</span>{" "}
            <span className="text-muted-foreground">{skills}</span>
          </li>
        )}
        {!hide.includes("selected_date") && (
          <li>
            <span className="font-medium">Selected Date:</span>{" "}
            <span className="text-muted-foreground">{"NaN"}</span>
          </li>
        )}
        {!hide.includes("offered_date") && (
          <li>
            <span className="font-medium">Offered Date:</span>{" "}
            <span className="text-muted-foreground">{"NaN"}</span>
          </li>
        )}
        {!hide.includes("joined_date") && (
          <li>
            <span className="font-medium">Joined Date:</span>{" "}
            <span className="text-muted-foreground">{"NaN"}</span>
          </li>
        )}
        {!hide.includes("completion_date") && (
          <li>
            <span className="font-medium">Completion Date:</span>{" "}
            <span className="text-muted-foreground">{"NaN"}</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default InfoCard;
