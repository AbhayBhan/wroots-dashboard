import { Separator } from "@/components/ui/separator";
import React from "react";
import { formatDateString } from "@/utils/dateTime";

const ExtraInfoCard = ({candidateData}) => {
  console.log(candidateData);
  return (
    <div className="p-5 border rounded-md bg-background text-muted-foreground">
      <h4 className="mb-4 font-medium text-slate-400">Referral Against </h4>

      <ul className="space-y-2 text-sm">
        <li>
          <span className="font-medium">Role:</span>{" "}
          <span className="text-muted-foreground">{candidateData?.role?.name}</span>{" "}
        </li>
        <li>
          <span className="font-medium">Category:</span>{" "}
          <span className="text-muted-foreground">{candidateData?.category?.name}</span>{" "}
        </li>
        <li>
          <span className="font-medium">Company:</span>{" "}
          <span className="text-muted-foreground">{candidateData?.company?.name}</span>{" "}
        </li>
        <li>
          <span className="font-medium">Latest Role:</span>{" "}
          <span className="text-muted-foreground">{candidateData?.company?.name}</span>{" "}
        </li>
        <li>
          <span className="font-medium">Latest Company:</span>{" "}
          <span className="text-muted-foreground">{candidateData?.company?.name}</span>{" "}
        </li>
      </ul>
      <Separator className="my-3" />
      <h4 className="mb-4 font-medium text-slate-400">Handle by </h4>
      <ul className="space-y-2 text-sm">
        <li>
          <span className="font-medium">Recrutier Name:</span>{" "}
          <span className="text-muted-foreground">{candidateData?.referror?.name}</span>{" "}
        </li>
        <li>
          <span className="font-medium">Email:</span>{" "}
          <span className="text-muted-foreground">{candidateData?.referror?.email}</span>{" "}
        </li>
        <li>
          <span className="font-medium">Assigned on:</span>{" "}
          <span className="text-muted-foreground">
            {candidateData?.referror?.createdAt && formatDateString(candidateData?.referror?.createdAt)}
          </span>{" "}
        </li>
      </ul>
    </div>
  );
};

export default ExtraInfoCard;
