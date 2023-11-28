import Pagination from "@/components/organism/pagination";
import SearchFilter from "@/components/organism/search-filter";
import SimpleTable from "@/components/organism/simple-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { categoryOptions } from "@/utils/contants";
import {
  exportArchivedCandidates,
  fetchArchivedCandidate,
} from "@/services/candidate";
import { formatTimestamp } from "@/utils/dateTime";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import ReactSelect from "react-select";
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
        <span className="text-xs text-muted-foreground">
          {row.role?.name ? row.role.name : "NA"}
        </span>
        <span className="text-xs text-muted-foreground">
          {row.company?.name ? row.company.name : "NA"}
        </span>
        <span className="inline-block">{row.category.name}</span>
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
            {row.recruiter?.name ? row.recruiter.name : "NA"}
          </span>
          <span className="text-xs text-muted-foreground">
            {formatTimestamp(row.updatedDate)}
          </span>
        </div>
      );
    },
  },
];

const ArchivedTable = () => {
  const { categoryId, id: recruiterId } = JSON.parse(
    localStorage.getItem("userdata")
  );
  const [filterTerm, setFilterTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams({});

  const page = Number(searchParams.get("page")) || 1;

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
    queryKey: ["Candidates", "Archive", page, selectedCategory, filterTerm],
    queryFn: () =>
      fetchArchivedCandidate(
        page,
        selectedCategory ? selectedCategory : categoryId
      ),
  });

  useEffect(() => {
    if (filterTerm) {
      handlePageChange(1);
    }
  }, [filterTerm]);

  const totalPages = Math.floor(data?.data?.totalRows / 30) || 1;

  console.log(data?.data);

  return (
    <div className="w-full">
      <div className="pb-4 flex_between">
        <SearchFilter
          className=""
          onChange={setFilterTerm}
          placeholder="Filter by name..."
        />
        <div className="flex flex-row justify-between gap-2 w-1/3">
          <ReactSelect
            options={categoryOptions}
            className="w-full text-sm"
            placeholder="Select Category"
            isSearchable={false}
            value={categoryOptions.find(
              (option) => option.value === selectedCategory
            )}
            onChange={(e) => setSelectedCategory(e.value)}
          />
          <Button
            onClick={() =>
              exportArchivedCandidates(
                selectedCategory ? selectedCategory : categoryId,
                recruiterId
              )
            }
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

export default ArchivedTable;
