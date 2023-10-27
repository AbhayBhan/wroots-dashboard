import { experienceData } from "@/data/candidate";
import React from "react";

const ExperienceCard = () => {
  return (
    <div className="p-5 border rounded-md bg-background text-muted-foreground">
      <h4 className="mb-4 font-medium text-slate-400">Experience </h4>
      <ul className="space-y-3 text-sm">
        {experienceData?.map((item) => (
          <li>
            <div className="flex justify-between">
              <div>
                <p className="font-medium">{item.position}</p>
                <p className="">{item.company}</p>
              </div>

              <div className="flex flex-col text-xs">
                <div className="flex">
                  <span>{item.startDate} - </span>
                  <span>{item.endDate}</span>
                </div>
                <p className="text-right">{item.location}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExperienceCard;
