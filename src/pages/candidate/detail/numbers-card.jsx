import React from "react";
import { HiOutlineClipboard, HiOutlineCurrencyDollar } from "react-icons/hi";

const Numberscard = () => {
  return (
    <div className="flex justify-center px-5 pb-4 space-x-5">
      <div className="flex gap-2">
        <div className="p-2 rounded bg-secondary w-fit">
          <HiOutlineClipboard className="w-7 h-7" />
        </div>
        <div>
          <span className="text-lg font-medium">34</span>
          <span className="block text-xs font-normal text-muted-foreground">
            Jobs Applied
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <div className="p-2 rounded bg-secondary w-fit">
          <HiOutlineCurrencyDollar className="w-7 h-7" />
        </div>
        <div>
          <span className="text-lg font-medium">34</span>
          <span className="block text-xs font-normal text-muted-foreground">
            Payout
          </span>
        </div>
      </div>
    </div>
  );
};

export default Numberscard;
