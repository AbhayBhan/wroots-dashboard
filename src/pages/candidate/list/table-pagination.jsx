import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

export function TablePagination({ table, setPage, page }) {
  return (
    <div className="flex items-center justify-end pt-4 space-x-2">
      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Page No.</p>
        <Select value={page} onValueChange={(value) => setPage(Number(value))}>
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder="" />
          </SelectTrigger>
          <SelectContent side="top">
            {[1, 2].map((pageSize) => (
              <SelectItem key={pageSize} value={pageSize}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {page} of {table.getPageCount()}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((pre) => pre - 1)}
          //   disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeftIcon className="h-4 w-4" />
          {/* Previous */}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage((pre) => pre + 1)}
          //   disabled={!table.getCanNextPage()}
        >
          {/* <span className="sr-only">Go to last page</span> */}
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
