import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProcessingForm from "../../list/processing-form";
import Processinglist from "./processing-list";
import { useState } from "react";
import {useMutation} from "@tanstack/react-query";
import { deleteProcessing } from "@/services/candidate";

const ProcessingSection = ({processingData,candidateId, addProcess, removeProcess}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cphId, setcphId] = useState(0);

  const {mutate,isLoading} = useMutation(deleteProcessing,{
    onSuccess : () => removeProcess(cphId)
  });

  const deleteProcess = (cphId) => {
    mutate({candidateId,cphId});
    setcphId(cphId);
  }
  return (
    <div>
      <div className="flex_end">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button title="Create Processing" className="whitespace-nowrap">
              Create Processing
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-3">Processing</DialogTitle>
              <ProcessingForm addProcess={addProcess} onSuccessAction={() => setIsOpen(false)} candidateId={candidateId} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <Processinglist data={processingData} deleteProcess={deleteProcess}/>
    </div>
  );
};

export default ProcessingSection;
