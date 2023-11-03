import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import React from "react";

const buttonVariants = cva("p-4 mb-4 text-sm border rounded-md ", {
  variants: {
    variant: {
      success:
        "border-emerald-500 text-emerald-500 bg-emerald-50 dark:bg-emerald-900/40",
      error: "border-red-500 text-red-500 bg-red-50 dark:bg-red-900/40",
      warn: "border-amber-500 text-amber-500 bg-amber-50 dark:bg-amber-900/40",
      info: "border-blue-500 text-blue-500 bg-blue-50 dark:bg-blue-900/40",
    },
  },
  defaultVariants: {
    variant: "success",
  },
});

const Alert = ({ className, variant, children }) => {
  return (
    <div className={cn(buttonVariants({ variant, className }))}>{children}</div>
  );
};

export default Alert;
