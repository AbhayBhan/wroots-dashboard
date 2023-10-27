import { cn } from "@/lib/utils";
import React from "react";
import { BiLoader } from "react-icons/bi";

const Spinner = ({ className }) => {
  return (
    <BiLoader
      className={cn(
        "h-5 w-5 text-black animate-spin dark:text-white",
        className
      )}
    />
  );
};

export default Spinner;
