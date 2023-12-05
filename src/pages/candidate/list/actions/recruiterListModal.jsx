import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Spinner from "@/components/organism/spinner";
import { fetchRecruiters } from "@/services/recruiter";
import ReactSelect from "react-select";
import { Button } from "@/components/ui/button";

const RecruiterListModal = ({ isLoading, handleAssignToRecruiterAction }) => {
  const [recruiterList, setRecruiterList] = useState([]);
  const [selectedRecruiter, setSelectedRecruiter] = useState({});

  const { mutate, isLoading: fetchLoading } = useMutation(fetchRecruiters, {
    onSuccess: ({ data }) =>
      setRecruiterList(
        data?.recruiters.map((rec) => {
          return {
            label: rec?.recruiter_name || "Invalid-Name",
            value: rec?.id,
          };
        })
      ),
  });

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("userdata")).id;
    const reqbody = {
      recruiterId: id,
    };
    mutate(reqbody);
  }, []);

  return (
    <div>
      {fetchLoading ? (
        <div className="flex w-full items-center justify-center h-10">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-sm mb-1">Recruiter Name</h1>
            <ReactSelect
              options={recruiterList}
              isSearchable
              className="text-sm"
              value={selectedRecruiter}
              onChange={(e) => setSelectedRecruiter(e)}
            />
          </div>
          <div className="flex justify-center">
            <Button
              disabled={!selectedRecruiter.value || isLoading}
              onClick={() =>
                handleAssignToRecruiterAction(selectedRecruiter.value)
              }
            >
              {isLoading ? <Spinner /> : "Select"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruiterListModal;
