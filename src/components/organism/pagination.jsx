import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "../ui/scroll-area";

const Pagination = ({ page, totalPages, setPage }) => {
  const handleNextClick = () => {
    setPage(page + 1);
  };
  const handlePreviousClick = () => {
    setPage(page - 1);
  };

  return (
    <div className="flex items-center justify-end pt-4 space-x-2">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Page No.</p>
        <Select value={page} onValueChange={(value) => setPage(value)}>
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent side="top">
            <ScrollArea className="h-28 ">
              {Array(totalPages)
                .fill(1)
                .map((_, index) => (
                  <SelectItem key={index} value={index + 1}>
                    {index + 1}
                  </SelectItem>
                ))}
            </ScrollArea>
          </SelectContent>
        </Select>

        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {page} of {totalPages}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handlePreviousClick}
          disabled={page === 1}
        >
          <ChevronLeftIcon className="w-4 h-4" />
          {/* Previous */}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleNextClick}
          disabled={totalPages === page}
        >
          {/* <span className="sr-only">Go to last page</span> */}
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
