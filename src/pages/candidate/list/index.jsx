import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CandidateTable from "./all-candidate-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { AddForm } from "@/components/organism/add-form";
import { getAllCandidates } from "@/services/mock/candidate";
import UnassignedCanidateTable from "./unassigned-canidate-table";
import MyCanidateTable from "./my-candidate-table";

const CandidateList = () => {
  const isSuperAdmin = JSON.parse(
    localStorage.getItem("userdata")
  ).isSuperAdmin;
  return (
    <div>
      <div className="flex_between mb-5">
        <h2 className="text-2xl font-bold tracking-tight">Candidate List</h2>
        <div className="flex items-center">
          <Button variant="outline" className="mr-2">
            Export
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" className="ml-auto">
                <PlusIcon className="w-4 h-4 mr-1" /> Create
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="mb-3">Add new Candidate</DialogTitle>
                <AddForm />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Tabs defaultValue="Unassigned Candidates">
        <TabsList className="flex justify-start h-auto p-0 bg-transparent border-b rounded-none w-fill">
          {[
            "Unassigned Candidates",
            "My Candidates",
            isSuperAdmin && "All Candidates",
          ]
            .filter((item) => item !== false)
            .map((item) => (
              <TabsTrigger
                key={item}
                value={item}
                className="data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent rounded-none capitalize"
              >
                {item}
              </TabsTrigger>
            ))}
        </TabsList>
        <div className="p-4 mt-4 rounded-md bg-background">
          <TabsContent value="Unassigned Candidates" className="m-0">
            <UnassignedCanidateTable />
          </TabsContent>
          <TabsContent value="My Candidates" className="m-0">
            <MyCanidateTable />
          </TabsContent>
          <TabsContent value="All Candidates" className="m-0">
            <CandidateTable fetchFuntion={getAllCandidates} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default CandidateList;
