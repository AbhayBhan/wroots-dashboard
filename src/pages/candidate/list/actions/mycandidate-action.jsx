import Spinner from "@/components/organism/spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaTimes, FaWhatsapp } from "react-icons/fa";
import {
  fetchSingleCandidate,
  deactivateCandidate,
} from "@/services/candidate";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Processinglist from "../../detail/processing-section/processing-list";
import ProcessingForm from "../processing-form";
import useScroll from "@/hooks/useScroll";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-dropdown-menu";

const MyCandidateAction = ({ rowData }) => {
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [queryFlag, setQueryFlag] = useState(false);
  const [notes, setNotes] = useState("");
  const [processingList, setProcessingList] = useState([]);

  const currentDivId = `mycandidate-${rowData.id}`;
  const { saveRowPosition } = useScroll(currentDivId);

  const { mutate } = useMutation(fetchSingleCandidate, {
    onSuccess: ({ data }) => {
      setLoading(false);
      console.log(data);
      setProcessingList(data[0].candidateProcessingHistory);
    },
  });

  const { mutate: deactiveMutate , isLoading} = useMutation(deactivateCandidate, {
    onSuccess: () => {
      setIsRejectOpen(false);
      setNotes("");
    },
  });

  const addProcess = (data) => {
    //In Case there is a need to update the processing list in future
  }

  useEffect(() => {
    if (queryFlag) {
      mutate(rowData.id);
    }
    return () => {
      setQueryFlag(false);
    };
  }, [queryFlag]);

  return (
    <div className="flex justify-end gap-2" id={currentDivId}>
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
              onSuccessAction={() => setIsOpen(false)}
              candidateId={rowData.id}
              addProcess={addProcess}
            />
            <ScrollArea className="w-full mt-3 border rounded-md h-72">
              <div className="p-4">
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
      <Dialog open={isRejectOpen} onOpenChange={setIsRejectOpen}>
        <DialogTrigger asChild>
          <button><FaTimes className="mt-0.5" color="red" size={28} /></button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-3">Deactivate Candidate</DialogTitle>
            <Label>Note</Label>
            <Textarea
              placeholder="Write note here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <Button
              onClick={() => {
                const recruiterId = JSON.parse(
                  localStorage.getItem("userdata")
                ).id;
                deactiveMutate({
                  note: notes,
                  candidateId: rowData.id,
                  recruiterId,
                });
              }}
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : "Deactivate Candidate"}
            </Button>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <a
        href={`https://wa.me/+91${rowData.phoneNumber}`}
        target="_blank"
        className="mt-0.5"
      >
        <FaWhatsapp size={28} color="green" />
      </a>
    </div>
  );
};

export default MyCandidateAction;
