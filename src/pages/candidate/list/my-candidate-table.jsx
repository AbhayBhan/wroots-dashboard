import { useEffect, useState } from "react";
import Pagination from "@/components/organism/pagination";
import SearchFilter from "@/components/organism/search-filter";
import SimpleTable from "@/components/organism/simple-table";
import { Badge } from "@/components/ui/badge";
import { fetchMyCandidates } from "@/services/candidate";
import { formatTimestamp } from "@/utils/dateTime";
import { useQuery } from "@tanstack/react-query";
import MyCandidateAction from "./actions/mycandidate-action";
import ReactSelect from "react-select";
import { latestStatus } from "@/services/mock/latestStatus";
import { useSearchParams } from "react-router-dom";
import CountBadge from "@/components/organism/countbadge";

export const columns = [
  {
    id: "name",
    header: "Details",
    cell: ({ getValue }) => (
      <div className="flex flex-col whitespace-nowrap">
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
      <div className="flex flex-col whitespace-nowrap">
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
      <div className="flex flex-col whitespace-nowrap">
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
        <div className="flex flex-col whitespace-nowrap">
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
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams({});

  const page = Number(searchParams.get("page"));

  const handlePageChange = (page) => {
    setSearchParams(
      (pre) => {
        pre.set("page", `${page}`);
        return pre;
      },
      { replace: true }
    );
  };

  const { data, isLoading } = useQuery({
    queryKey: ["Candidate", "My", selectedStatus, page, filterTerm],
    queryFn: () =>
      fetchMyCandidates(recruiterId, page, filterTerm, selectedStatus),
  });

  useEffect(() => {
    if (filterTerm) {
      handlePageChange(1);
    }
  }, [filterTerm]);

  const totalPages = Math.ceil(data?.data?.totalRows / 30) || 1;
  const candidateList = data?.data?.candidates;

  return (
    <div className="w-full">
      <div className="pb-4 flex_between">
        <SearchFilter
          onChange={setFilterTerm}
          placeholder="Filter by name..."
        />
        <ReactSelect
          options={latestStatus}
          className="w-1/6 text-sm"
          value={selectedStatus?.label}
          onChange={(data) => setSelectedStatus(data.value)}
          placeholder="Select Status"
        />
      </div>
      <CountBadge title={"Candidates"} data={data?.data?.totalRows} isLoading={isLoading} />
      <SimpleTable
        columns={columns}
        data={candidateList}
        isLoading={isLoading}
      />
      <Pagination
        page={page || 1}
        setPage={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  );
};

export default MyCanidateTable;
