import Pagination from "@/components/organism/pagination";
import SearchFilter from "@/components/organism/search-filter";
import SimpleTable from "@/components/organism/simple-table";
import { candidateData } from "@/data/candidate";
import { fetchCandidatesHandled } from "@/services/recruiter";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const columns = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue }) => (
      <div className="capitalize whitespace-nowrap flex items-center h-9">
        {getValue("candidateName")}
      </div>
    ),
  },
  {
    accessorKey: "mobile",
    header: "Mobile",
    cell: ({ getValue }) => (
      <div className="lowercase whitespace-nowrap">
        {getValue("mobile") || "-"}
      </div>
    ),
  },
  {
    id: "date",
    header: "Updated on",
    cell: ({ getValue }) => (
      <div className=" whitespace-nowrap">
        {new Date(getValue("referrer_time")).toLocaleString()}
      </div>
    ),
  },
];

const CandidateTable = ({ id }) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages]=useState(0);
  const [candidatesList, setCandidatesList]=useState([]);
  const [filterTerm, setFilterTerm] = useState("");
  const { data, mutate, isLoading } = useMutation({
    mutationKey: ["Recuiter", "Candidates", page],
    mutationFn: fetchCandidatesHandled,
    onSuccess: (data)=>{
      console.log(data)
      setCandidatesList(data?.data?.candidates);
      setTotalPages(Math.ceil(data.data.totalCount/30));
    }
  });

  useEffect(() => {
    mutate({
      recruiterId: id,
      pageno: page
    });
  }, [page]);

  return (
    <div className="w-full">
      <SearchFilter
        className="pb-4"
        onChange={setFilterTerm}
        placeholder="Search by Name"
      />
      <SimpleTable
        columns={columns}
        data={candidatesList}
        isLoading={isLoading}
      />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default CandidateTable;
