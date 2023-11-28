import Pagination from "@/components/organism/pagination";
import SearchFilter from "@/components/organism/search-filter";
import SimpleTable from "@/components/organism/simple-table";
import { getCandidatesApplied } from "@/services/jobs";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const columns = [
  {
    id: "name",
    header: "Name",
    cell: ({ getValue }) => (
      <div className="capitalize whitespace-nowrap flex items-center min-h-[36px]">
        {getValue("name") || "-"}
      </div>
    ),
  },
  {
    id: "contact",
    header: "Contact",
    cell: ({ getValue }) => (
      <div className=" whitespace-nowrap">
        <p>{getValue("phoneNumber")}</p>
        <p className="text-xs lowercase text-muted-foreground">
          {getValue("email") || "-"}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "applied_date",
    header: "Applied on",
    cell: ({ getValue }) => {
      const appliedDate = getValue("applied_date");
      return (
        <div className="lowercase whitespace-nowrap">
          {appliedDate ? new Date(appliedDate).toLocaleString() : "-"}
        </div>
      );
    },
  },
  {
    id: "recruiter",
    header: "Handle by",
    cell: ({ getValue }) => (
      <div className=" whitespace-nowrap">
        <p>{getValue("recruiter_name")}</p>
        <p className="text-xs text-muted-foreground">
          {getValue("recruiter_contact") || "-"}
        </p>
      </div>
    ),
  },
];

const ApplicantsTable = ({ roleId }) => {
  const [filterTerm, setFilterTerm] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["Job", "CandidateApplied", roleId, page],
    queryFn: () => getCandidatesApplied(roleId, page),
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
        data={data?.data?.candidates}
        isLoading={isLoading}
      />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default ApplicantsTable;
