import Pagination from "@/components/organism/pagination";
import SearchFilter from "@/components/organism/search-filter";
import SimpleTable from "@/components/organism/simple-table";
import { candidateData } from "@/data/candidate";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchJobsApplied } from "@/services/Appusers";

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
    accessorKey: "roleName",
    header: "Role Name",
    cell: ({ getValue }) => (
      <div className="lowercase whitespace-nowrap">{getValue("roleName")}</div>
    ),
  },
  {
    id: "candidateId",
    header: "Candidate Id",
    cell: ({ getValue }) => (
      <div className=" whitespace-nowrap">
        {getValue("candidateId")}
      </div>
    ),
  },
];

const JobAppliedTable = ({id}) => {
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

  const {mutate}=useMutation(fetchJobsApplied,{
    onSuccess:({data})=>{
        console.log(data);
      setTotalPages(Math.ceil(data.jobs.length/10));
      setData(data.jobs);
      setIsLoading(false);
    }
  });

  useEffect(()=>{
    setIsLoading(true);
    mutate(id);
  },[]);

  return (
    <div className="w-full">
      <SearchFilter
        className="pb-4"
        onChange={setFilterTerm}
        placeholder="Search by Name"
      />
      <SimpleTable columns={columns} data={data?.slice((page*10)-10,page*10)} isLoading={isLoading}/>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default JobAppliedTable;
