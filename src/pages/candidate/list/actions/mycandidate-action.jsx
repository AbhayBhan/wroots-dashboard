import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import ProcessingForm from "../processing-form";

const MyCandidateAction = ({ rowData }) => {
  return (
    <div className="flex justify-end gap-2">
      <Link
        to={`/candidate/${rowData.id}/details`}
        // className="hidden h-8 ml-auto lg:flex"
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "hover:bg-muted "
        )}
        title="Detail View"
      >
        <EyeOpenIcon className="w-5 h-5 text-slate-500" />
      </Link>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="sm"
            title="Create Processing"
            className="whitespace-nowrap"
          >
            Create Processing
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-3">Create Processing</DialogTitle>
            <ProcessingForm />
            <ScrollArea className="h-72 w-full mt-3 rounded-md border">
              <div className="p-4">
                <h4 className="mb-4 text-sm font-medium leading-none">
                  Processing History
                </h4>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((tag) => (
                  <div key={tag}>
                    <div className="text-sm">{tag}</div>
                    <Separator className="my-2" />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyCandidateAction;
