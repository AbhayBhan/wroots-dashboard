import Pagination from "@/components/organism/pagination";
import SearchFilter from "@/components/organism/search-filter";
import SimpleTable from "@/components/organism/simple-table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { candidateData } from "@/data/candidate";
import { useState } from "react";
import MyCandidateAction from "./actions/mycandidate-action";
import { useQuery } from "@tanstack/react-query";
import { fetchMyCandidates } from "@/services/candidate";

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
        <span className="capitalize">{row.referror["name"]}</span>
        <span className="text-xs text-muted-foreground">
          {row.referror["phoneNumber"]}
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
    header: "Latest status",
    cell: ({ getValue }) => {
      const status = getValue("status");
      const status_ref = {
        Pending: "default",
        Rejected: "destructive",
        Accepted: "success",
      };
      return (
        <div className="capitalize ">
          {status_ref[status] ? (
            <Badge variant={status_ref[status]}>{status}</Badge>
          ) : (
            "-"
          )}
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
  const [filterTerm, setFilterTerm] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["Candidate", "My", page],
    queryFn: () => fetchMyCandidates(12, page),
  });

  // data && console.log(data?.data);
  const totalPages = Math.floor(data?.data?.totalRows / 30) || 1;

  return (
    <div className="w-full">
      <div className="flex_between pb-4">
        <SearchFilter
          onChange={setFilterTerm}
          placeholder="Filter by name..."
        />
        {/* <Select>               Hidden for this release.
          <SelectTrigger className="max-w-[200px] w-full">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="m@example.com">Category 1</SelectItem>
            <SelectItem value="m@support.com">Category 2</SelectItem>
            <SelectItem value="m@google.com">Category 3</SelectItem>
          </SelectContent>
        </Select> */}
      </div>
      <SimpleTable
        columns={columns}
        data={data?.data?.candidates}
        isLoading={isLoading}
      />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default MyCanidateTable;
