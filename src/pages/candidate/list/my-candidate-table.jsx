import { useEffect, useState } from "react";
import Pagination from "@/components/organism/pagination";
import SearchFilter from "@/components/organism/search-filter";
import SimpleTable from "@/components/organism/simple-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { exportMyCandidates, fetchMyCandidates } from "@/services/candidate";
import { formatTimestamp } from "@/utils/dateTime";
import { useQuery } from "@tanstack/react-query";
import MyCandidateAction from "./actions/mycandidate-action";
import ReactSelect from "react-select";
import { latestStatus } from "@/services/mock/latestStatus";
import { Link, useSearchParams } from "react-router-dom";
import CountBadge from "@/components/organism/countbadge";

export const columns = [
  {
    id: "name",
    header: "Details",
    cell: ({ getValue }) => (
      <Link to={`/candidate/${getValue("id")}/details`}>
        <div className="flex flex-col whitespace-nowrap">
          <span className="capitalize">{getValue("name")}</span>
          <span className="text-xs text-muted-foreground">
            {getValue("phoneNumber")}
          </span>
        </div>
      </Link>
    ),
  },
  {
    id: "referrer",
    header: () => <div>Referred by</div>,
    cell: ({ row }) => (
      <Link to={`/candidate/${row.id}/details`}>
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
      </Link>
    ),
  },
  {
    id: "job",
    header: "Category & Role",
    cell: ({ row }) => (
      <Link to={`/candidate/${row.id}/details`}>
        <div className="flex flex-col whitespace-nowrap">
          <span className="text-xs text-muted-foreground">
            {row.role?.name ? row.role.name : "NA"}
          </span>
          <span className="text-xs text-muted-foreground">
            {row.company?.name ? row.company.name : "NA"}
          </span>
          <span className="inline-block">{row.category.name}</span>
        </div>
      </Link>
    ),
  },
  {
    id: "status",
    header: "Latest Status",
    cell: ({ row }) => {
      return (
        <Link to={`/candidate/${row.id}/details`}>
          <div className="flex flex-col whitespace-nowrap">
            <span className="inline-block">
              <Badge>{row.latestStatus}</Badge>
            </span>
            <span className="text-xs text-muted-foreground">
              {formatTimestamp(row.updatedDate)}
            </span>
          </div>
        </Link>
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
  const { id: recruiterId, categoryId } = JSON.parse(
    localStorage.getItem("userdata")
  );
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
        <div className="flex flex-row justify-between gap-2 w-1/3">
          <ReactSelect
            options={latestStatus}
            className="w-full text-sm"
            value={selectedStatus?.label}
            onChange={(data) => setSelectedStatus(data.value)}
            placeholder="Select Status"
          />
          <Button
            onClick={() => exportMyCandidates(categoryId, recruiterId)}
            variant="outline"
            className="mr-2"
          >
            Export
          </Button>
        </div>
      </div>
      <CountBadge
        title={"Candidates"}
        data={data?.data?.totalRows}
        isLoading={isLoading}
      />
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
