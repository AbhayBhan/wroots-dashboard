import Spinner from "@/components/organism/spinner";
import { Button, buttonVariants } from "@/components/ui/button";
import useScroll from "@/hooks/useScroll";
import { cn } from "@/lib/utils";
import { assignCandidate } from "@/services/candidate";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UnassignedCandidateAction = ({ row }) => {
  const navigate = useNavigate();

  const currentdivId = `unassignCandidate-${row?.id}`;
  const { saveRowPosition } = useScroll(currentdivId);

  const { mutate, isLoading } = useMutation({
    mutationFn: assignCandidate,
    onSuccess: () => {
      toast.success("Candidate Assigned, Redirecting...");
      setTimeout(() => {
        navigate(`/candidate/${row.id}/details`);
      }, 200);
    },
  });

  const handleClick = () => {
    const userdata = JSON.parse(localStorage.getItem("userdata"));
    mutate({
      recruiterEmail: userdata.email,
      candidateID: row.id,
    });
  };

  return (
    <div className="gap-2 flex_end" id={currentdivId}>
      <Link
        to={`/candidate/${row?.id}/details`}
        // className="hidden h-8 ml-auto lg:flex"
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "hover:bg-muted "
        )}
        onClick={saveRowPosition}
        title="Detail View"
      >
        <EyeOpenIcon className="w-5 h-5 text-slate-500" />
      </Link>
      <Button
        size="sm"
        disabled={isLoading}
        onClick={handleClick}
        className="whitespace-nowrap"
      >
        {isLoading ? <Spinner className="text-white" /> : "Assign to me"}
      </Button>
    </div>
  );
};

export default UnassignedCandidateAction;
