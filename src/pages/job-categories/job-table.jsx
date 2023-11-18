import Pagination from "@/components/organism/pagination";
import SearchFilter from "@/components/organism/search-filter";
import SimpleTable from "@/components/organism/simple-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchAllCategories } from "@/services/JobCategories";
import { useQuery } from "@tanstack/react-query";
import * as React from "react";

import { processName } from "@/utils/helper";
import JobCategoryActions from "./job-category-actions";

export const columns = [
  {
    id: "category",
    header: "Category Name",
    cell: ({ getValue }) => (
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={getValue("imageURL")} loading="lazy" />
          <AvatarFallback>{processName(getValue("name"))}</AvatarFallback>
        </Avatar>
        <p>{getValue("name")}</p>
      </div>
    ),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      return <JobCategoryActions row={row} />;
    },
  },
];

const JobTable = () => {
  const [page, setPage] = React.useState(1);
  const [filterTerm, setFilterTerm] = React.useState("");

  const categoryQuery = useQuery({
    queryKey: ["All-Categories"],
    queryFn: fetchAllCategories,
  });

  const categoryData = categoryQuery?.data?.data?.category?.records || [];

  return (
    <div className="w-full">
      <div className=" pb-4">
        <SearchFilter
          onChange={setFilterTerm}
          placeholder="Filter by name..."
        />
      </div>

      <SimpleTable
        data={categoryData}
        columns={columns}
        isLoading={categoryQuery.isLoading}
      />
      <Pagination page={page} setPage={setPage} totalPages={100} />
    </div>
  );
};

export default JobTable;
