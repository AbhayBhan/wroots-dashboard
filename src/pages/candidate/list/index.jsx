import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { CandidateForm } from "../components/candidate-form";
import CandidateTable from "./all-candidate-table";
import MyCanidateTable from "./my-candidate-table";
import UnassignedCanidateTable from "./unassigned-canidate-table";
import { useSearchParams } from "react-router-dom";

const CandidateList = () => {
  const isSuperAdmin = JSON.parse(
    localStorage.getItem("userdata")
  ).isSuperAdmin;
  const isManager = JSON.parse(
    localStorage.getItem("userdata")
  ).isManager;

  const [searchParams, setSearchParams] = useSearchParams({
    currentTab: "Unassigned Candidate",
  });

  const [isOpen, setIsOpen] = useState(false);

  const onTabChange = (e) => {
    setSearchParams(
      (pre) => {
        pre.set("currentTab", e);
        return pre;
      },
      { replace: true}
    );
  };

  return (
    <div>
      <div className="mb-5 flex_between">
        <h2 className="text-2xl font-bold tracking-tight">Candidate List</h2>
        <div className="flex items-center">
          <Button variant="outline" className="mr-2">
            Export
          </Button>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="default" className="ml-auto">
                <PlusIcon className="w-4 h-4 mr-1" /> Create
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="mb-3">Add new Candidate</DialogTitle>
                <CandidateForm onSuccessAction={() => setIsOpen(false)} />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {/* all candidate tab will only visible to superAdmin  */}
      <Tabs value={searchParams.get("currentTab")} onValueChange={onTabChange}>
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
            <CandidateTable />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default CandidateList;
