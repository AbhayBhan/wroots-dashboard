import React from "react";
import { Badge } from "../ui/badge";
import Spinner from "./spinner";

const CountBadge = ({title,data,isLoading}) => {
  return (
    <div className="flex flex-row justify-center mb-2">
      <Badge className="bg-blue-200 text-md">
        Total {title} : {isLoading ? <Spinner /> : data}
      </Badge>
    </div>
  );
};

export default CountBadge;
