import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { dayDifference, formatTimestamp } from "@/utils/dateTime";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { HiOutlineLocationMarker } from "react-icons/hi";
import parse from "html-react-parser";
import { formatNumberWithKM } from "@/utils/helper";
import { JobDetailsEditForm } from "./job-details-edit-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

const DetailsTab = ({ jobDetails }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    // <section className="grid grid-cols-12 gap-4">
    <section className="flex flex-col gap-4">
      <div className="col-span-9 card">
        <div className="flex_between">
          <h2 className="heading_1">{jobDetails?.name}</h2>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" title="Edit Job Details">
                <Pencil1Icon className="w-5 h-5 text-slate-500" />
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full lg:max-w-4xl">
              <DialogHeader>
                <DialogTitle className="mb-3">Edit Job Details</DialogTitle>
                <ScrollArea className="w-full h-[80vh]">
                  <div className="px-1">
                    <JobDetailsEditForm
                      initialData={jobDetails}
                      onSuccessAction={() => setIsOpen(false)}
                    />
                  </div>
                </ScrollArea>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex gap-4 mt-4">
          <Avatar className="h-[80px] w-[80px] rounded-full mb-3">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="text-lg font-medium">{jobDetails?.CompanyName}</h4>
            <p className="flex items-center text-sm text-muted-foreground">
              <HiOutlineLocationMarker size={18} className="mr-1" />
              <span>-</span>
            </p>
          </div>
        </div>

        <div className="flex gap-4 mt-4 text-muted-foreground">
          <div className="w-full space-y-2">
            <p>
              Referral amount : <strong>{jobDetails?.referral_amount}</strong>
            </p>
            <p>
              Status :{" "}
              <strong>{jobDetails?.active ? "Active" : "Unactive"}</strong>
            </p>
            <p>
              Allow batches : <strong>-</strong>
            </p>
            <p>
              Start on :{" "}
              <strong>{formatTimestamp(jobDetails?.start_date)}</strong>
            </p>
          </div>
          <div className="w-full space-y-2">
            <p>
              Referral : <strong>-</strong>
            </p>
            <p>
              Applicants : <strong>-</strong>
            </p>
            <p>
              Vacancy : <strong>{jobDetails?.no_of_positions}</strong>
            </p>
            <p>
              Expired on :{" "}
              <strong>{formatTimestamp(jobDetails?.end_date)}</strong> (
              {dayDifference(jobDetails?.start_date, jobDetails?.end_date)} days
              left)
            </p>
          </div>
        </div>

        <div></div>

        {/* <div>
          <h4 className="mb-2 heading_16">Overview</h4>
          <table className="text-sm text-muted-foreground">
            <tbody>
              <tr>
                <td className="px-2 font-medium">Status :</td>{" "}
                <td className="px-2">Active</td>
              </tr>
              <tr>
                <td className="px-2 font-medium">Expired on :</td>{" "}
                <td className="px-2">30th Feb 2023</td>
              </tr>
              <tr>
                <td className="px-2 font-medium">Allowed batches :</td>{" "}
                <td className="px-2">2022-23</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h4 className="mt-3 mb-2 heading_16">Referral Program:</h4>
          <table className="text-sm text-muted-foreground">
            <tbody>
              <tr>
                <td className="px-2 font-medium">Referral amount :</td>{" "}
                <td className="px-2">$12,000</td>
              </tr>
              <tr>
                <td className="px-2 font-medium">Total Referral :</td>{" "}
                <td className="px-2">26</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h4 className="mt-3 mb-2 heading_16">Applicants:</h4>
          <table className="text-sm text-muted-foreground">
            <tbody>
              <tr>
                <td className="px-2 font-medium">Total Applicants :</td>{" "}
                <td className="px-2">26</td>
              </tr>
            </tbody>
          </table>
        </div> */}
        <Separator className="my-4" />
        <div className="grid grid-cols-4 gap-4">
          <div className="p-4 rounded bg-secondary">
            <p className="">Employment Type</p>
            <h3 className="font-medium ">-</h3>
          </div>
          <div className="p-4 rounded bg-secondary">
            <p className="">Salary</p>
            <h3 className="font-medium ">
              {" "}
              {formatNumberWithKM(jobDetails?.min_salary)}
              {" - "}
              {formatNumberWithKM(jobDetails?.max_salary)} lpa
            </h3>
          </div>
          <div className="p-4 rounded bg-secondary">
            <p className="">Industry</p>
            <h3 className="font-medium ">-</h3>
          </div>
          <div className="p-4 rounded bg-secondary">
            <p className="">Experience</p>
            <h3 className="font-medium ">
              {jobDetails?.min_experience} - {jobDetails?.max_experience} years
            </h3>
          </div>
        </div>
        <Separator className="my-4" />
        <div>
          {/* <h5 className="mb-2 text-lg font-medium text-primary-foreground">Breif</h5> */}
          <h1 className="mb-4 text-2xl font-bold">Job Overview</h1>
          <div className="text-sm text-muted-foreground prose-slate prose-p:mb-3 prose-strong:text-lg prose-strong:text-foreground prose-ul:list-disc prose-ul:pl-6">
            {jobDetails?.briefing && parse(jobDetails?.briefing)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsTab;
