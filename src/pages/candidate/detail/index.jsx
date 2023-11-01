import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobTable from "@/pages/job/job-table";
import { fetchSingleCandidate } from "@/services/candidate";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ExtraInfoCard from "./extra-info-card";
import InfoCard from "./info-card";
import NotesSection from "./notes-section";
import Numberscard from "./numbers-card";
import ProcessingSection from "./processing-section";

const CandidateDetail = () => {
  const { id } = useParams();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["Candidate-Details", id],
    queryFn: () => fetchSingleCandidate(parseInt(id)),
  });

  const candidateData = data?.data?.[0];

  return (
    <div className="grid grid-cols-12 gap-4">
      <h2 className="mb-5 text-2xl font-bold tracking-tight col-span-full ">
        Candidate Detail
      </h2>
      <div className="relative w-full col-span-4 space-y-4">
        <div className="border rounded-md bg-background text-muted-foreground">
          <div className="flex flex-col items-center justify-center px-6 pt-10 pb-6">
            <Avatar className="h-[100px] w-[100px] rounded-md mb-3">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <h4 className="text-2xl font-medium text-center ">
              {candidateData?.name}
            </h4>
          </div>
          {true ? (
            <div className="px-5 pb-4 text-sm flex gap-2">
              <ReferrerDetails data={candidateData?.referror} />
              <Tags self={candidateData?.self} />
            </div>
          ) : (
            <Numberscard />
          )}

          <hr className="mx-4 mt-2" />
          {/* <Separator className="mx-4 mt-2"/> */}
          <InfoCard
            email={candidateData?.email}
            phone={candidateData?.phoneNumber}
            status={candidateData?.status}
          />
        </div>
        {/* <ExperienceCard /> */}
        <ExtraInfoCard />
      </div>
      <Tabs defaultValue="Processing History" className="col-span-8">
        <TabsList className="flex justify-start h-auto p-0 bg-transparent border-b rounded-none w-fill">
          {["Processing History", "Job Applied", "Notes"].map((item) => (
            <TabsTrigger
              key={item}
              value={item}
              className="data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent rounded-none capitalize"
            >
              {item}
            </TabsTrigger>
          ))}
        </TabsList>
        {/* <TabsContent value="Details" className="">
          <div className="flex flex-col gap-3">
            <div className="h-64 border rounded-md bg-background"></div>
            <div className="h-64 border rounded-md bg-background"></div>
          </div>
        </TabsContent> */}
        <TabsContent
          value="Processing History"
          className="p-4 rounded-md bg-background"
        >
          <ProcessingSection
            processingData={candidateData?.candidateProcessingHistory}
            candidateId={parseInt(id)}
          />
        </TabsContent>
        <TabsContent
          value="Job Applied"
          className="p-4 rounded-md bg-background"
        >
          <JobTable />
        </TabsContent>
        <TabsContent value="Notes" className="p-4 rounded-md bg-background">
          <NotesSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const ReferrerDetails = ({ data }) => {
  return (
    <div className="w-full">
      <h2 className="font-medium text-base mb-4 text-slate-400">Referred by</h2>
      <div className="space-y-2">
        <p>{data?.name || null}</p>
        <p>{data?.phoneNumber || null}</p>
        <p>12th Jan 2023</p>
      </div>
    </div>
  );
};
const Tags = ({ self }) => {
  return (
    <div className="w-full">
      <h2 className="font-medium text-base mb-4 text-slate-400">Tags</h2>
      <div className="space-y-2">{self && <Badge>Self Applied</Badge>}</div>
    </div>
  );
};

export default CandidateDetail;
