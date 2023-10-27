import Pagination from "@/components/organism/pagination";
import SearchFilter from "@/components/organism/search-filter";
import SimpleTable from "@/components/organism/simple-table";
import { applicantsData } from "@/data/job";
import React, { useState } from "react";

const columns = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue }) => (
      <div className="capitalize whitespace-nowrap min-h-[36px]">
        <p>{getValue("name")}</p>
        <p className="text-xs text-muted-foreground lowercase">{getValue("email")}</p>
      </div>
    ),
  },
  {
    id: "referrer",
    header: "Referrer",
    cell: ({ getValue }) => (
      <div className=" whitespace-nowrap">
        <p>{getValue("referrer")}</p>
        <p className="text-xs text-muted-foreground">
          {getValue("referrer_contact")}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "applied_date",
    header: "Refer on",
    cell: ({ getValue }) => (
      <div className="lowercase whitespace-nowrap">
        {new Date(getValue("applied_date")).toLocaleString()}
      </div>
    ),
  },
  {
    id: "recruiter",
    header: "Handle by",
    cell: ({ getValue }) => (
      <div className=" whitespace-nowrap">
        <p>{getValue("recruiter_name")}</p>
        <p className="text-xs text-muted-foreground">
          {getValue("recruiter_contact")}
        </p>
      </div>
    ),
  },
  {
    id: "update",
    header: "Update on",
    cell: ({ getValue }) => (
      <div className=" whitespace-nowrap">
        {new Date(getValue("applied_date")).toLocaleString()}
      </div>
    ),
  },
];

const JoinedTable = () => {
  const [filterTerm, setFilterTerm] = useState("");
  const [page, setPage] = useState(1);
  return (
    <div className="w-full">
      <SearchFilter
        className="pb-4"
        onChange={setFilterTerm}
        placeholder="Filter by name..."
      />

      <SimpleTable columns={columns} data={applicantsData} />

      <Pagination page={page} setPage={setPage} totalPages={1000} />
    </div>
  );
};

export default JoinedTable;
