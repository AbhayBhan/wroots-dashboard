import Pagination from "@/components/organism/pagination";
import SearchFilter from "@/components/organism/search-filter";
import SimpleTable from "@/components/organism/simple-table";
import Spinner from "@/components/organism/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchAllCategories } from "@/services/JobCategories";
import { useMutation } from "@tanstack/react-query";
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

  const [categoryData, setCategoryData] = React.useState([]);

  const { mutate, isLoading } = useMutation({
    mutationFn: fetchAllCategories,
    onSuccess: ({ data }) => {
      setCategoryData(data.category.records);
      console.log(data.category.records);
    },
  });

  React.useEffect(() => {
    mutate();
  }, []);

  return (
    <div className="w-full">
      <div className=" pb-4">
        <SearchFilter
          onChange={setFilterTerm}
          placeholder="Filter by name..."
        />
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <SimpleTable data={categoryData} columns={columns} />
      )}
      <Pagination page={page} setPage={setPage} totalPages={100} />
    </div>
  );
};

export default JobTable;
