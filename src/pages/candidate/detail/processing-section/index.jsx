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

const ProcessingSection = ({processingData}) => {
  return (
    <div>
      <div className="flex_end">
        <Dialog>
          <DialogTrigger asChild>
            <Button title="Create Processing" className="whitespace-nowrap">
              Create Processing
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-3">Processing</DialogTitle>
              <ProcessingForm />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <Processinglist data={processingData} />
    </div>
  );
};

export default ProcessingSection;
