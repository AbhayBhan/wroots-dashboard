import Pagination from "@/components/organism/pagination";
import SearchFilter from "@/components/organism/search-filter";
import SimpleTable from "@/components/organism/simple-table";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchAllCategories } from "@/services/JobCategories";
import { fetchAllCandidates } from "@/services/candidate";
import { latestStatus } from "@/services/mock/latestStatus";
import { formatTimestamp } from "@/utils/dateTime";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import ReactSelect from "react-select";
import AllCandidateAction from "./actions/all-candidate-action";

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
      <div className="flex flex-col whitespace-nowrap ">
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
      return <AllCandidateAction row={row} />;
    },
  },
];

const CandidateTable = () => {
  const [filterTerm, setFilterTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
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
    queryKey: ["Candidates", "All", page, selectedStatus, filterTerm],
    queryFn: () => fetchAllCandidates(page, filterTerm, selectedStatus),
    // keepPreviousData: true,
  });

  const categoryQuery = useQuery({
    queryKey: ["Category", "All"],
    queryFn: fetchAllCategories,
  });

  useEffect(() => {
    if (filterTerm) {
      handlePageChange(1);
    }
  }, [filterTerm]);

  const totalPages = Math.floor(data?.data?.totalRows / 30) || 1;
  const categoryOptions = categoryQuery.data?.data?.category?.records;

  return (
    <div className="w-full">
      <div className="pb-4 flex_between">
        <SearchFilter
          className=""
          onChange={setFilterTerm}
          placeholder="Filter by name..."
        />
        <div className="flex justify-between w-1/3">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="max-w-[200px] w-full">
              <SelectValue placeholder="Category " />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className="w-full h-72">
                <SelectItem value={null} disabled>
                  Select category
                </SelectItem>
                {categoryOptions?.map((option) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.name}
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
          <ReactSelect
            options={latestStatus}
            className="text-sm"
            value={selectedStatus?.label}
            onChange={(data) => setSelectedStatus(data.value)}
            placeholder="Select Status"
          />
        </div>
      </div>
      <div className="flex flex-row justify-center mb-2">
        <Badge className="bg-blue-400 text-md">
          Total Candidates : {data?.data?.totalRows}
        </Badge>
      </div>
      <SimpleTable
        columns={columns}
        data={data?.data?.candidates}
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

export default CandidateTable;
