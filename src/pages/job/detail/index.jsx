import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ApplicantsTable from "./applicants-table";
import DetailsTab from "./details-tab";
import JoinedTable from "./joined-table";
import ReferrerTable from "./referrer-table";
import { useLocation, useParams } from "react-router-dom";
import Alert from "@/components/ui/alert";
import PeriodCompleteTable from "./period-complete-table";
import { toast } from "react-toastify";

const JobDetail = () => {
  const { id } = useParams();
  const { state } = useLocation();

  const jobDetails = state.jobDetails;
  return (
    <section>
      <div className="mb-5 flex_between">
        <h2 className="text-2xl font-bold tracking-tight col-span-full">
          Job Detail
        </h2>
        <div className="space-x-2">
          <Button onClick={() => {
            navigator.clipboard.writeText(`https://jobs.wraeglobal.com/jobs?id=${id}`);
            toast.success("Copied Link to Clipboard")
          }} variant="outline">Copy link</Button>
          <Button>Send push</Button>
        </div>
      </div>
      <Tabs defaultValue="Details">
        <TabsList className="flex justify-start h-auto p-0 bg-transparent border-b rounded-none w-fill">
          {[
            "Details",
            "Applicants",
            "Offered",
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
            <Alert variant="warn">
              This is the original applicants received for this job, In order to
              change status or do any changes, Use candidates list and search
              for the candidate.
            </Alert>
            <ApplicantsTable roleId={jobDetails?.id} />
          </TabsContent>
          <TabsContent value="Offered" className="m-0">
            <Alert variant="warn">
              This is the original offered candidates for this job, In order to
              change status or do any changes, Use candidates list and search
              for the candidate.
            </Alert>
            <ReferrerTable roleId={jobDetails?.id} />
          </TabsContent>
          <TabsContent value="Joined" className="m-0">
            <Alert variant="warn">
              This is the original people who joined for this job. Use Candiates
              processing history to reflect changes history.
            </Alert>
            <JoinedTable roleId={jobDetails?.id} />
          </TabsContent>
          <TabsContent value="Period Complete" className="m-0">
            <Alert variant="warn">
              This is the original people who joined for this job. Use Candiates
              processing history to reflect changes history.
            </Alert>
            <PeriodCompleteTable roleId={jobDetails?.id} />
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
};

export default JobDetail;
