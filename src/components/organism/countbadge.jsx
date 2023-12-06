import React from "react";
import { Badge } from "../ui/badge";
import Spinner from "./spinner";

const CountBadge = ({title,data,isLoading}) => {
  return (
    <div className="flex items-center justify-center mb-2">
      <Badge className="text-sm">
        Total {title} : {isLoading ? <Spinner className="text-white" /> : data}
      </Badge>
    </div>
  );
};

export default CountBadge;
