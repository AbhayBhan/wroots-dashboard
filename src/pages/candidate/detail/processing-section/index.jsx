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

const ProcessingSection = ({processingData,candidateId}) => {
  const [isOpen, setIsOpen] = useState(false);
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
              <ProcessingForm onSuccessAction={() => setIsOpen(false)} candidateId={candidateId} />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <Processinglist data={processingData} />
    </div>
  );
};

export default ProcessingSection;
