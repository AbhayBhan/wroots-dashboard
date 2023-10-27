import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InfoCard from "@/pages/candidate/detail/info-card";
import Numberscard from "@/pages/candidate/detail/numbers-card";
import CandidateTable from "./candidate-table";
import { useLocation, useParams } from "react-router-dom";

const RecruiterDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  console.log(state);

  const recruiterDetails = state.recruiterDetails;

  return (
    <div className="grid grid-cols-12 gap-4">
      <h2 className="mb-5 text-2xl font-bold tracking-tight col-span-full">
        Recruiter Details
      </h2>
      <div className="relative w-full col-span-4 space-y-4">
        <div className="border rounded-md bg-background text-muted-foreground">
          <div className="flex flex-col items-center justify-center px-6 pt-10 pb-6">
            <Avatar className="h-[100px] w-[100px] rounded-md mb-3">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h4 className="text-2xl font-medium text-center">
              {recruiterDetails?.recruiter_name}
            </h4>
          </div>

          <Numberscard />

          <hr className="mx-4 my-4" />
          <InfoCard
            hide={["skills", "resume"]}
            email={recruiterDetails?.recruiter_email}
            status={recruiterDetails?.recruiter_status}
            phone={recruiterDetails?.recruiter_phone}
            country={"India"}
          />
        </div>
      </div>
      <Tabs defaultValue="Candidate List" className="col-span-8">
        <TabsList className="flex justify-start h-auto p-0 bg-transparent border-b rounded-none w-fill">
          {["Candidate List"].map((item) => (
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
          value="Candidate List"
          className="p-4 rounded-md bg-background"
        >
          <CandidateTable id={recruiterDetails?.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecruiterDetails;
