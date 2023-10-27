import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobTable from "@/pages/job/job-table";

import { AddForm } from "@/components/organism/add-form";
import DeleteAlert from "@/components/organism/delete-alert";
import { Button } from "@/components/ui/button";

const CompanyDetails = () => {
  return (
    <div>
      <div className="flex_between mb-5">
        <h2 className="text-2xl font-bold tracking-tight">Company Details</h2>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Edit</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="mb-3">Add new Candidate</DialogTitle>
               Edit form will be there.
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <DeleteAlert />
        </div>
      </div>
      <Tabs defaultValue="Active Jobs" className="col-span-8">
        <TabsList className="flex justify-start h-auto p-0 bg-transparent border-b rounded-none w-fill">
          {["Active Jobs", "Archive Jobs"].map((item) => (
            <TabsTrigger
              key={item}
              value={item}
              className="data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent rounded-none capitalize"
            >
              {item}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent
          value="Active Jobs"
          className="p-4 rounded-md bg-background"
        >
          <JobTable />
        </TabsContent>
        <TabsContent
          value="Archive Jobs"
          className="p-4 rounded-md bg-background"
        >
          <JobTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompanyDetails;
