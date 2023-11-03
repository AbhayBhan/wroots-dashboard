import * as React from "react";

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";

import AdvancePagination from "@/components/organism/advance-pagination";
import AdvanceTable from "@/components/organism/advance-table";
import SearchFilter from "@/components/organism/search-filter";
import { fetchActiveJobs } from "@/services/jobs";
import { formatNumberWithKM } from "@/utils/helper";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import JobTableActions from "./job-table-actions";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Job Name",
    cell: ({ row }) => (
      <div className="flex gap-3">
        <Avatar>
          {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col whitespace-nowrap">
          <p>{row.original["name"]}</p>
          <p className="text-xs text-muted-foreground">
            {row.original["CompanyName"] || "-"}
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "salary",
    header: "Salary",
    cell: ({ row }) => (
      <div className="capitalize whitespace-nowrap">
        {formatNumberWithKM(row.original["min_salary"])} {" - "} 
        {formatNumberWithKM(row.original["max_salary"])}
      </div>
    ),
  },
  // {
  //   id: "counts",
  //   header: "Counts",
  //   cell: ({ row }) => {
  //     return (
  //       <div className="text-xs whitespace-nowrap">
  //         <p>{row.original["appliedCount"] || 0} Applied</p>
  //         <p>{row.original["referredCount"] || 0} Referred</p>
  //       </div>
  //     );
  //   },
  // },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <JobTableActions rowData={row.original} />;
    },
  },
];

const JobTable = () => {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const { data, mutate, isLoading } = useMutation({
    mutationKey: ["Jobs", "Active"],
    mutationFn: fetchActiveJobs,
  });

  useEffect(() => {
    mutate();
  }, []);

  const table = useReactTable({
    data: data?.data?.roles || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center pb-4">
        <SearchFilter
          placeholder="Filter position..."
          onChange={(value) => table.getColumn("name")?.setFilterValue(value)}
        />
      </div>
      <AdvanceTable
        table={table}
        columnLength={columns.length}
        isLoading={isLoading}
      />
      <AdvancePagination table={table} />
    </div>
  );
};

export default JobTable;
