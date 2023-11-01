import React, { useEffect, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { fetchSingleCandidate } from "@/services/candidate";
import ProcessingForm from "../processing-form";
import Spinner from "@/components/organism/spinner";
import Processinglist from "../../detail/processing-section/processing-list";

const MyCandidateAction = ({ rowData }) => {
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [processingList, setProcessingList] = useState([]);
  const { mutate } = useMutation(fetchSingleCandidate, {
    onSuccess: ({ data }) => {
      setLoading(false);
      console.log(data);
      setProcessingList(data[0].candidateProcessingHistory);
    },
  });

  useEffect(() => {
    mutate(rowData.id);
  }, []);
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
      <Dialog open={isOpen} onOpenChange={setIsOpen} >
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
            <ProcessingForm onSuccessAction={() => setIsOpen(false)} candidateId={rowData.id}/>
            <ScrollArea className="h-72 w-full mt-3 rounded-md border">
              <div className="p-4">
                {!loading ? (
                  <Processinglist data={processingList} />
                ) : (
                  <div className="w-full h-full flex justify-center items-center"><Spinner /></div>
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
