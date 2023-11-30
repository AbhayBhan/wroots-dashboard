import * as React from "react";

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import SearchFilter from "@/components/organism/search-filter";
import { useMutation } from "@tanstack/react-query";
import { fetchAppliedJobs } from "@/services/candidate";
import SimpleTable from "@/components/organism/simple-table";

const columns = [
  {
    id: "role",
    accessorKey: "name",
    header: "Role Name",
    cell: ({ row }) => <div className="capitalize">{row.roleName}</div>,
  },
  {
    id: "company",
    header: "Company Name",
    cell: ({ row }) => <div className="capitalize">{row.companyName}</div>,
  },
];

const AppliedJobs = ({ candidateId }) => {

  const { data, mutate, isLoading } = useMutation(fetchAppliedJobs);

  React.useEffect(() => {
    mutate(candidateId);
  }, []);

  return (
    <div className="w-full">
      <SimpleTable
        data={data?.data?.jobs}
        columns={columns}
        isLoading={isLoading}
      />
    </div>
  );
};

export default AppliedJobs;
