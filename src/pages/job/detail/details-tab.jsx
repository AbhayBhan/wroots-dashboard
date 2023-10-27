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

const DetailsTab = ({ jobDetails }) => {
  return (
    // <section className="grid grid-cols-12 gap-4">
    <section className="flex flex-col gap-4">
      <div className="card  col-span-9">
        <div className="flex_between">
          <h2 className="heading_1">{jobDetails?.name}</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" title="Edit Job Details">
                <Pencil1Icon className="w-5 h-5 text-slate-500" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="mb-3">Edit Job Details</DialogTitle>
                <div>Edit form will be there</div>
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
            <h4 className="font-medium text-lg">Reliance Jio</h4>
            <p className="text-muted-foreground flex_center text-sm">
              <HiOutlineLocationMarker size={18} className="mr-1" />
              <span>Benguluru, India</span>
            </p>
          </div>
        </div>

        <div className="mt-4 flex gap-4 text-muted-foreground">
          <div className="w-full space-y-2">
            <p>
              Referral amount : <strong>{jobDetails?.referral_amount}</strong>
            </p>
            <p>
              Status :{" "}
              <strong>{jobDetails?.active ? "Active" : "Unactive"}</strong>
            </p>
            <p>
              Allow batches : <strong>22-2023</strong>
            </p>
            <p>
              Start on :{" "}
              <strong>{formatTimestamp(jobDetails?.start_on)}</strong>
            </p>
          </div>
          <div className="w-full space-y-2">
            <p>
              Referral : <strong>30</strong>
            </p>
            <p>
              Applicants : <strong>16</strong>
            </p>
            <p>
              Vacancy : <strong>{jobDetails?.no_of_positions}</strong> (Male
              only)
            </p>
            <p>
              Expired on :{" "}
              <strong>{formatTimestamp(jobDetails?.end_on)}</strong> (
              {dayDifference(jobDetails?.start_on, jobDetails?.end_on)} days
              left)
            </p>
          </div>
        </div>

        <div></div>

        {/* <div>
          <h4 className="heading_16 mb-2">Overview</h4>
          <table className=" text-sm text-muted-foreground">
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
          <h4 className="heading_16 mt-3 mb-2">Referral Program:</h4>
          <table className=" text-sm text-muted-foreground">
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
          <h4 className="heading_16 mt-3 mb-2">Applicants:</h4>
          <table className=" text-sm text-muted-foreground">
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
          <div className="rounded bg-secondary p-4">
            <p className="">Employment Type</p>
            <h3 className="font-medium ">Full Time</h3>
          </div>
          <div className="rounded bg-secondary p-4">
            <p className="">Salary</p>
            <h3 className="font-medium ">
              {" "}
              {formatNumberWithKM(jobDetails?.min_salary)}
              {" - "}
              {formatNumberWithKM(jobDetails?.max_salary)} lpa
            </h3>
          </div>
          <div className="rounded bg-secondary p-4">
            <p className="">Industry</p>
            <h3 className="font-medium ">IT</h3>
          </div>
          <div className="rounded bg-secondary p-4">
            <p className="">Job Function</p>
            <h3 className="font-medium ">Business Intelligence</h3>
          </div>
        </div>
        <Separator className="my-4" />
        <div>
          {/* <h5 className="font-medium text-lg mb-2 text-primary-foreground">Breif</h5> */}
          <div className="text-muted-foreground text-sm prose-slate prose-p:mb-3 prose-strong:text-lg prose-strong:text-foreground prose-ul:list-disc prose-ul:pl-6">
            {parse(jobDetails?.briefing)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsTab;
