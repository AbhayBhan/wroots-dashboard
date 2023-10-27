import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ApplicantsTable from "./applicants-table";
import DetailsTab from "./details-tab";
import JoinedTable from "./joined-table";
import ReferrerTable from "./referrer-table";
import { useLocation, useParams } from "react-router-dom";

const JobDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();

  const jobDetails = state.jobDetails;
  return (
    <section>
      <div className="flex_between mb-5">
        <h2 className=" text-2xl font-bold tracking-tight col-span-full">
          Job Detail
        </h2>
        <div className="space-x-2">
          <Button variant="outline">Copy link</Button>
          <Button>Send push</Button>
        </div>
      </div>
      <Tabs defaultValue="Details">
        <TabsList className="flex justify-start h-auto p-0 bg-transparent border-b rounded-none w-fill">
          {[
            "Details",
            "Applicants",
            "Referred",
            "Joined",
            "Period Complete",
          ].map((item) => (
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
          <TabsContent value="Details" className="m-0">
            <DetailsTab jobDetails={jobDetails} />
          </TabsContent>
          <TabsContent value="Applicants" className="m-0">
            <div className="border border-amber-500 rounded-md p-4 text-sm text-amber-500 bg-amber-50 dark:bg-amber-900/40 mb-4">
              This is the original applicants received for this job, In order to
              change status or do any changes, Use candidates list and search
              for the candidate.
            </div>
            <ApplicantsTable />
          </TabsContent>
          <TabsContent value="Referred" className="m-0">
            <div className="border border-amber-500 rounded-md p-4 text-sm text-amber-500 bg-amber-50 dark:bg-amber-900/40 mb-4">
              This is the original referrals received for this job, In order to
              change status or do any changes, Use candidates list and search
              for the candidate.
            </div>
            <ReferrerTable />
          </TabsContent>
          <TabsContent value="Joined" className="m-0">
            <div className="border border-amber-500 rounded-md p-4 text-sm text-amber-500 bg-amber-50 dark:bg-amber-900/40 mb-4">
              This is the original people who joined for this job. Use Candiates
              processing history to reflect changes history.
            </div>
            <JoinedTable />
          </TabsContent>
          <TabsContent value="Period Complete" className="m-0">
            <div className="border border-amber-500 rounded-md p-4 text-sm text-amber-500 bg-amber-50 dark:bg-amber-900/40 mb-4">
              This is the original people who joined for this job. Use Candiates
              processing history to reflect changes history.
            </div>
            <JoinedTable />
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
};

export default JobDetail;
