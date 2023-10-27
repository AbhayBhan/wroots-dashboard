import Pagination from "@/components/organism/pagination";
import SearchFilter from "@/components/organism/search-filter";
import SimpleTable from "@/components/organism/simple-table";
import { fetchRecruiters } from "@/services/recruiter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import RecruiterTableActions from "./recruiter-table-actions";

export const columns = [
  {
    id: "name",
    header: "Name",
    cell: ({ getValue }) => (
      <div className="capitalize">{getValue("recruiter_name")}</div>
    ),
  },
  {
    id: "email",
    header: "Email",
    cell: ({ getValue }) => (
      <div className="lowercase">{getValue("recruiter_email")}</div>
    ),
  },
  {
    id: "type",
    header: "Type",
    cell: ({ getValue }) => (
      <div>{getValue("isSuperAdmin") ? "Super admin" : "-"}</div>
    ),
  },

  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      return <RecruiterTableActions rowData={row} />;
    },
  },
];

const RecruiterTable = () => {
  const [filterTerm, setFilterTerm] = useState("second");
  const [page, setPage] = useState(1);

  const { data, mutate, isLoading } = useMutation({
    mutationKey: ["All-Recuiter"],
    mutationFn: fetchRecruiters,
  });

  useEffect(() => {
    mutate();
  }, []);

  const recruiterData = data?.data?.recruiters;

  return (
    <div className="w-full">
      <div className=" pb-4">
        <SearchFilter
          className=""
          onChange={setFilterTerm}
          placeholder="Filter by name..."
        />
      </div>
      <SimpleTable
        columns={columns}
        data={recruiterData}
        isLoading={isLoading}
      />
      <Pagination page={page} setPage={setPage} totalPages={1000} />
    </div>
  );
};

export default RecruiterTable;
