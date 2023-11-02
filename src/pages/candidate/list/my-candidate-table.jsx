import Pagination from "@/components/organism/pagination";
import SearchFilter from "@/components/organism/search-filter";
import SimpleTable from "@/components/organism/simple-table";
import { Badge } from "@/components/ui/badge";
import { fetchMyCandidates } from "@/services/candidate";
import { formatTimestamp } from "@/utils/dateTime";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import MyCandidateAction from "./actions/mycandidate-action";

export const columns = [
  {
    id: "name",
    header: "Details",
    cell: ({ getValue }) => (
      <div className="flex flex-col ">
        <span className="capitalize">{getValue("name")}</span>
        <span className="text-xs text-muted-foreground">
          {getValue("phoneNumber")}
        </span>
      </div>
    ),
  },
  {
    id: "referrer",
    header: () => <div>Referred by</div>,
    cell: ({ row }) => (
      <div className="flex flex-col ">
        <span className="capitalize">
          {row.self ? "Self Applied" : `${row.referror["name"]}`}
        </span>
        {!row.self && (
          <span className="text-xs text-muted-foreground">
            {row.referror["phoneNumber"]}
          </span>
        )}
        <span className="text-xs text-muted-foreground">
          {formatTimestamp(row.createdDate)}
        </span>
      </div>
    ),
  },
  {
    id: "job",
    header: "Category & Role",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="capitalize">{row.role["name"]}</span>
        <span className="text-xs text-muted-foreground">
          {row.category["name"]}
        </span>
      </div>
    ),
  },
  {
    id: "status",
    header: "Latest Status",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <span className="inline-block">
            <Badge>{row.latestStatus}</Badge>
          </span>
          <span className="text-xs text-muted-foreground">
            {formatTimestamp(row.updatedDate)}
          </span>
        </div>
      );
    },
  },
  {
    id: "action",
    header: "",
    cell: ({ row }) => {
      return <MyCandidateAction rowData={row} />;
    },
  },
];

const MyCanidateTable = () => {
  const recruiterId = JSON.parse(localStorage.getItem("userdata")).id;
  const [filterTerm, setFilterTerm] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["Candidate", "My", page, filterTerm],
    queryFn: () => fetchMyCandidates(recruiterId, page, filterTerm),
  });

  useEffect(() => {
    setPage(1);
  }, [filterTerm]);

  // data && console.log(data?.data);
  const totalPages = Math.floor(data?.data?.totalRows / 30) || 1;
  const candidateList = data?.data?.candidates;

  return (
    <div className="w-full">
      <div className="pb-4 flex_between">
        <SearchFilter
          onChange={setFilterTerm}
          placeholder="Filter by name..."
        />
      </div>
      <SimpleTable
        columns={columns}
        data={candidateList}
        isLoading={isLoading}
      />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default MyCanidateTable;
