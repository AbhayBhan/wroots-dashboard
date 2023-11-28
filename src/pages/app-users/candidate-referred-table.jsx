import Pagination from "@/components/organism/pagination";
import SearchFilter from "@/components/organism/search-filter";
import SimpleTable from "@/components/organism/simple-table";
import { candidateData } from "@/data/candidate";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchcandidatesReferred } from "@/services/Appusers";

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
      <div className="lowercase whitespace-nowrap">{getValue("phoneNumber")}</div>
    ),
  },
  {
    id: "date",
    header: "Referred on",
    cell: ({ getValue }) => (
      <div className=" whitespace-nowrap">
        {new Date(getValue("date")).toLocaleString()}
      </div>
    ),
  },
];

const CandidateReferredTable = ({id}) => {
  const [page, setPage] = useState(1);
  const [filterTerm, setFilterTerm] = useState("");
  const [data, setData]=useState([]);
  const [isLoading, setIsLoading]=useState(true);
  const [totalPages, setTotalPages]=useState(0);
  // const { data, isLoading } = useQuery({
  //   queryFn: () => getAllCandidates(page,filterTerm),
  //   queryKey: ["All-Processingkjh", page,filterTerm],
  //   keepPreviousData: true,
  // });

  const {mutate}=useMutation(fetchcandidatesReferred,{
    onSuccess:({data})=>{
      setTotalPages(Math.ceil(data.totalCount/10));
      setData(data.candidates);
      setIsLoading(false);
    }
  });

  useEffect(()=>{
    setIsLoading(true);
    mutate({page:1, referroId:id});
  },[]);

  return (
    <div className="w-full">
      <SearchFilter
        className="pb-4"
        onChange={setFilterTerm}
        placeholder="Search by name..."
      />
      <SimpleTable columns={columns} data={data?.slice((page*10)-10,page*10)} isLoading={isLoading}/>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default CandidateReferredTable;
