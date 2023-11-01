import Pagination from "@/components/organism/pagination";
import SearchFilter from "@/components/organism/search-filter";
import SimpleTable from "@/components/organism/simple-table";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { fetchAllCandidates } from "@/services/candidate";
import { formatTimestamp } from "@/utils/dateTime";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

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
      return (
        <div className="flex_end">
          <Link
            to={`/candidate/${row.id}/details`}
            // className="hidden h-8 ml-auto lg:flex"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "hover:bg-muted "
            )}
            title="Detail View"
          >
            <EyeOpenIcon className="w-5 h-5 text-slate-500" />
          </Link>
        </div>
      );
    },
  },
];

const CandidateTable = () => {
  const [filterTerm, setFilterTerm] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryFn: () => fetchAllCandidates(page, filterTerm),
    queryKey: ["Candidates", "All", page, filterTerm],
    // keepPreviousData: true,
  });

  useEffect(() => {
    setPage(1);
  }, [filterTerm]);

  const totalPages = Math.floor(data?.data?.totalRows / 30) || 1;

  return (
    <div className="w-full">
      <div className="pb-4 flex_between">
        <SearchFilter
          className=""
          onChange={setFilterTerm}
          placeholder="Filter by name..."
        />
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

export default CandidateTable;
