import Spinner from "@/components/organism/spinner";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { fetchSingleCandidate } from "@/services/candidate";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Processinglist from "../../detail/processing-section/processing-list";
import ProcessingForm from "../processing-form";

const MyCandidateAction = ({ rowData }) => {
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [queryFlag, setQueryFlag] = useState(false);
  const [processingList, setProcessingList] = useState([]);
  const { mutate } = useMutation(fetchSingleCandidate, {
    onSuccess: ({ data }) => {
      setLoading(false);
      console.log(data);
      setProcessingList(data[0].candidateProcessingHistory);
    },
  });

  useEffect(() => {
    if (queryFlag) {
      mutate(rowData.id);
    }
    return () => {
      setQueryFlag(false);
    };
  }, [queryFlag]);

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
      <Dialog
        open={isOpen}
        onOpenChange={(e) => {
          setIsOpen(e);
          setQueryFlag(true);
        }}
      >
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
            <ProcessingForm
              candidateId={rowData.id}
              onSuccessAction={() => setIsOpen(false)}
            />
            <ScrollArea className="w-full mt-3 border rounded-md h-72">
              <div className="h-full px-4">
                {!loading ? (
                  <Processinglist data={processingList} />
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <Spinner />
                  </div>
                )}
              </div>
            </ScrollArea>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyCandidateAction;
