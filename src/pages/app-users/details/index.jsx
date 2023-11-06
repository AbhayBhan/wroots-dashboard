import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobTable from "@/pages/job/job-table";
// import NotesSection from "./notes-section";
// import Numberscard from "./numbers-card";
import Numberscard from "@/pages/candidate/detail/numbers-card";
import InfoCard from "@/pages/candidate/detail/info-card";
import PayoutTable from "@/pages/payout/payout-table";
import CandidateReferredTable from "../candidate-referred-table";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AppUsersInfoCard from "./appusers-info-card";
import { useAppUsersContext } from "@/contexts/appUsersContext";

const AppUserDetail = () => {

  const {id} = useParams();
  const [userData, setUserData] = useState({});

  const {details, setDetails}=useAppUsersContext();

  useEffect(()=>{
    console.log(details.find(item=>item.id==id));
    setUserData(details.find(item=>item.id==id));
  },[])

  return (
    <div className="grid grid-cols-12 gap-4">
      <h2 className="mb-5 text-2xl font-bold tracking-tight col-span-full">
        App User Details
      </h2>
      <div className="relative w-full col-span-4 space-y-4">
        <div className="border rounded-md bg-background text-muted-foreground">
          <div className="flex flex-col items-center justify-center px-6 pt-10 pb-6">
            <Avatar className="h-[100px] w-[100px] rounded-md mb-3">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h4 className="text-2xl font-medium space-x-1">
              <span>{userData.first_name}</span>
              <span>{userData.middle_name}</span>
              <span>{userData.last_name}</span>
            </h4>
          </div>

          <Numberscard />

          <hr className="mx-4 my-4" />
          <AppUsersInfoCard userData={userData}/>
        </div>
        {/* <ExperienceCard /> */}
        {/* <ExtraInfoCard /> */}
      </div>
      <Tabs defaultValue="Candidate Referred" className="col-span-8">
        <TabsList className="flex justify-start h-auto p-0 bg-transparent border-b rounded-none w-fill">
          {["Candidate Referred", "Job Applied", "Payouts"].map((item) => (
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
          value="Candidate Referred"
          className="p-4 rounded-md bg-background"
        >
          <CandidateReferredTable />
        </TabsContent>
        <TabsContent
          value="Job Applied"
          className="p-4 rounded-md bg-background"
        >
          <JobTable />
        </TabsContent>
        <TabsContent value="Payouts" className="p-4 rounded-md bg-background">
          <PayoutTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const ReferrerDetails = () => {
  return (
    <div className="w-full">
      <h2 className="font-medium text-base mb-4 text-slate-400">Referred by</h2>
      <div className="space-y-2">
        <p>Rajesh Kumar</p>
        <p>+91 698574123</p>
        <p>12th Jan 2023</p>
      </div>
    </div>
  );
};
const Tags = () => {
  return (
    <div className="w-full">
      <h2 className="font-medium text-base mb-4 text-slate-400">Tags</h2>
      <div className="space-y-2">
        <Badge>Self Applied</Badge>
      </div>
    </div>
  );
};

export default AppUserDetail;
