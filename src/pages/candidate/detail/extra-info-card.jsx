import { Separator } from "@/components/ui/separator";
import React from "react";

const ExtraInfoCard = () => {
  return (
    <div className="p-5 border rounded-md bg-background text-muted-foreground">
      <h4 className="mb-4 font-medium text-slate-400">Referral Against </h4>

      <ul className="space-y-2 text-sm">
        <li>
          <span className="font-medium">Role:</span>{" "}
          <span className="text-muted-foreground">Web Developer</span>{" "}
        </li>
        <li>
          <span className="font-medium">Category:</span>{" "}
          <span className="text-muted-foreground">IT</span>{" "}
        </li>
      </ul>
      <Separator className="my-3" />
      <h4 className="mb-4 font-medium text-slate-400">Handle by </h4>
      <ul className="space-y-2 text-sm">
        <li>
          <span className="font-medium">Recrutier Name:</span>{" "}
          <span className="text-muted-foreground">David Smith</span>{" "}
        </li>
        <li>
          <span className="font-medium">Email:</span>{" "}
          <span className="text-muted-foreground">johndeo@gmail.com</span>{" "}
        </li>
        <li>
          <span className="font-medium">Assigned on:</span>{" "}
          <span className="text-muted-foreground">
            23th Jun 2023 at 04:00 PM
          </span>{" "}
        </li>
      </ul>
    </div>
  );
};

export default ExtraInfoCard;
