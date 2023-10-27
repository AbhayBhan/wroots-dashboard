import { EyeOpenIcon } from "@radix-ui/react-icons";

import Pagination from "@/components/organism/pagination";
import SearchFilter from "@/components/organism/search-filter";
import SimpleTable from "@/components/organism/simple-table";
import { buttonVariants } from "@/components/ui/button";
import { usersData } from "@/data/users";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Link } from "react-router-dom";

export const columns = [
  {
    id: "full_name",
    header: "Name",
    cell: ({ getValue }) => (
      <div className="capitalize">{getValue("full_name")}</div>
    ),
  },
  {
    id: "referrals",
    header: "Total Referrals",
    cell: ({ getValue }) => <div className="lowercase">{56}</div>,
  },
  {
    id: "mobile",
    header: "Contect info",
    cell: ({ getValue }) => (
      <div className="lowercase">{getValue("mobile")}</div>
    ),
  },
  {
    id: "join_date",
    header: "Last login at",
    cell: ({ getValue }) => (
      <div className="capitalize">{getValue("join_date")}</div>
    ),
  },
  {
    id: "actions",
    cell: () => {
      return (
        <div className="flex justify-end gap-2">
          <Link
            to={"/app-users/details"}
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

const UsersTable = () => {
  const [page, setPage] = useState(1);
  const [filterTerm, setFilterTerm] = useState("");

  return (
    <div className="w-full">
      <SearchFilter
        className="pb-4"
        onChange={setFilterTerm}
        placeholder="Filter by name..."
      />
      <SimpleTable columns={columns} data={usersData} />
      <Pagination page={page} setPage={setPage} totalPages={1000} />
    </div>
  );
};

export default UsersTable;
