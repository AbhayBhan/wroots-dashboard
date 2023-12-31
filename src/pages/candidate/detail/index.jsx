import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchSingleCandidate } from "@/services/candidate";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ExtraInfoCard from "./extra-info-card";
import InfoCard from "./info-card";
import NotesSection from "./notes-section";
import Numberscard from "./numbers-card";
import ProcessingSection from "./processing-section";
import Spinner from "@/components/organism/spinner";
import AppliedJobs from "./appliedJobs";
import { Button } from "@/components/ui/button";
import { assignCandidateInBulk } from "@/services/candidate";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import RecruiterListModal from "../list/actions/recruiterListModal";
import { toast } from "react-toastify";

const CandidateDetail = () => {
  const { id } = useParams();
  const ref = useRef();
  const [candidateData, setCandidateData] = useState();
  const [processingList, setProcessingList] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const { data, mutate, isLoading } = useMutation(fetchSingleCandidate, {
    onSuccess: ({ data }) => {
      setCandidateData(data?.[0]);
      setProcessingList(data?.[0].candidateProcessingHistory);
    },
  });

  const assignCandidate = useMutation(assignCandidateInBulk, {
    onSuccess: (data) => {
      console.log(data);
      setShouldRefresh(true);
      toast("Successfully Assigned", {autoClose:2000})
    }
  })

  function handleClick(id) {
    console.log(candidateData)
    const payload = {
      candidateIDs: [candidateData.id],
      recruiterId: id,
    };
    console.log(payload)
    assignCandidate.mutate(payload);
    setIsOpen(false)
  }

  const addProcess = (newList) => {
    setProcessingList(newList);
  }

  const deleteProcess = (id) => {
    setProcessingList(prevList => {
      const updatedList = prevList.filter(process => process.id !== id);
      return updatedList;
    });
  };

  useEffect(() => {
    if (shouldRefresh) {
      mutate(parseInt(id));
      ref.current.scrollIntoView({
        behavior: "smooth",
      });
      setShouldRefresh(false);
    }
  }, [shouldRefresh]);

  return (
    <div ref={ref} className="grid grid-cols-12 gap-4">
      <h2 className="mb-5 text-2xl font-bold tracking-tight col-span-full ">
        Candidate Detail
      </h2>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="relative w-full col-span-4 space-y-4">
            <div className="border rounded-md bg-background text-muted-foreground">
              <div className="flex flex-col items-center justify-center px-6 pt-10 pb-6">
                <Avatar className="h-[100px] w-[100px] rounded-md mb-3">
                  <AvatarImage src="https://firebasestorage.googleapis.com/v0/b/wraeapp.appspot.com/o/user%20(1).png?alt=media&token=aaa47440-c97b-4ad8-bf3c-1f0aacb777f6" />
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

              <div className="flex">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button variant="default" size="sm" className="mx-auto">
                      Assign To Recruiter
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="mb-3">Choose Recruiter</DialogTitle>
                      <RecruiterListModal
                        isLoading={assignCandidate.isLoading}
                        handleAssignToRecruiterAction={
                          handleClick
                        }
                      />
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>

              <hr className="mx-4 mt-2" />
              {/* <Separator className="mx-4 mt-2"/> */}
              <InfoCard
                email={candidateData?.email}
                phone={candidateData?.phoneNumber}
                status={candidateData?.status}
                id={candidateData?.id}
                name={candidateData?.name}
                refresh={setShouldRefresh}
              />
            </div>
            {/* <ExperienceCard /> */}
            <ExtraInfoCard candidateData={candidateData} />
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
                addProcess={addProcess}
                processingData={processingList}
                candidateId={parseInt(id)}
                removeProcess={deleteProcess}
              />
            </TabsContent>
            <TabsContent
              value="Job Applied"
              className="p-4 rounded-md bg-background"
            >
              <AppliedJobs candidateId={parseInt(id)} />
            </TabsContent>
            <TabsContent value="Notes" className="p-4 rounded-md bg-background">
              <NotesSection candidateId={parseInt(id)} />
            </TabsContent>
          </Tabs>
        </>
      )}
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
