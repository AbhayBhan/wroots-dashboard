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
      <div className="capitalize whitespace-nowrap min-h-[36px]">
        <p>{getValue("name")}</p>
        <p className="text-xs lowercase text-muted-foreground">
          {getValue("email")}
        </p>
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
    id: "applied_date",
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
];

const ReferrerTable = ({ roleId }) => {
  const [filterTerm, setFilterTerm] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["Job", "CandidateOffered", roleId, page],
    queryFn: () => getCandidatesOffered(roleId, page),
  });

  useEffect(() => {
    setPage(1);
  }, [filterTerm]);

  const totalPages = Math.ceil(data?.data?.totalRows / 30) || 1;

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
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default ReferrerTable;
