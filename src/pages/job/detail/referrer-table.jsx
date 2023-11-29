import Pagination from "@/components/organism/pagination";
import SearchFilter from "@/components/organism/search-filter";
import SimpleTable from "@/components/organism/simple-table";
import { applicantsData } from "@/data/job";
import { fetchAllCandidates } from "@/services/candidate";
import { getCandidatesOffered } from "@/services/jobs";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const columns = [
  {
    id: "name",
    header: "Name",
    cell: ({ getValue }) => (
      <div className="capitalize whitespace-nowrap flex items-center min-h-[36px]">
        {getValue("latest_name") || "-"}
      </div>
    ),
  },
  {
    id: "contact",
    header: "Contact",
    cell: ({ getValue }) => (
      <div className="whitespace-nowrap">
        <p>{getValue("latest_phone_number")}</p>
        <p className="text-xs lowercase text-muted-foreground">
          {getValue("latest_email") || "-"}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "applied_date",
    header: "Last Updated On",
    cell: ({ getValue }) => {
      const appliedDate = getValue("updated_date");
      return (
        <div className="lowercase whitespace-nowrap">
          {appliedDate ? new Date(appliedDate).toLocaleString() : "-"}
        </div>
      );
    },
  },
];

const ReferrerTable = ({ roleId }) => {
  const [filterTerm, setFilterTerm] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["Job", "CandidateOffered", roleId],
    queryFn: () => getCandidatesOffered(roleId, page),
  });

  useEffect(() => {
    setPage(1);
  }, [filterTerm]);

  return (
    <div className="w-full">
      <SearchFilter
        className="pb-4"
        onChange={setFilterTerm}
        placeholder="Search by Name"
      />
      <SimpleTable
        columns={columns}
        // data={applicantsData}
        data={data?.data?.candidates}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ReferrerTable;
