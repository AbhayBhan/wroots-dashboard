import Pagination from "@/components/organism/pagination";
import SearchFilter from "@/components/organism/search-filter";
import SimpleTable from "@/components/organism/simple-table";
import { candidateData } from "@/data/candidate";
import { useState } from "react";

export const columns = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue }) => (
      <div className="capitalize whitespace-nowrap flex items-center h-9">
        {getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "mobile",
    header: "Mobile",
    cell: ({ getValue }) => (
      <div className="lowercase whitespace-nowrap">{getValue("mobile")}</div>
    ),
  },
  {
    id: "date",
    header: "Referred on",
    cell: ({ getValue }) => (
      <div className=" whitespace-nowrap">
        {new Date(getValue("referrer_time")).toLocaleString()}
      </div>
    ),
  },
];

const CandidateReferredTable = () => {
  const [page, setPage] = useState(1);
  const [filterTerm, setFilterTerm] = useState("");
  // const { data, isLoading } = useQuery({
  //   queryFn: () => getAllCandidates(page,filterTerm),
  //   queryKey: ["All-Processingkjh", page,filterTerm],
  //   keepPreviousData: true,
  // });

  return (
    <div className="w-full">
      <SearchFilter
        className="pb-4"
        onChange={setFilterTerm}
        placeholder="Filter by name..."
      />
      <SimpleTable columns={columns} data={candidateData?.slice(0,10)} />
      <Pagination page={page} setPage={setPage} totalPages={1000} />
    </div>
  );
};

export default CandidateReferredTable;
