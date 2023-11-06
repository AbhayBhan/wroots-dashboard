import { EyeOpenIcon } from "@radix-ui/react-icons";

import Pagination from "@/components/organism/pagination";
import SearchFilter from "@/components/organism/search-filter";
import SimpleTable from "@/components/organism/simple-table";
import { buttonVariants } from "@/components/ui/button";
import { useAppUsersContext } from "@/contexts/appUsersContext";
import { cn } from "@/lib/utils";
import { fetchAllAppusers } from "@/services/Appusers";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { searchReferror } from "@/services/Appusers";

export const columns = [
  {
    id: "full_name",
    header: "Name",
    cell: ({ getValue }) => (
      <div className="capitalize space-x-1">
        <span>{getValue("first_name")}</span>
        <span>{getValue("middle_name")}</span>
        <span>{getValue("last_name")}</span>
        
      </div>
    ),
  },
  {
    id: "referrals",
    header: "Total Referrals",
    cell: ({ getValue }) => <div className="lowercase">{0}</div>,
  },
  {
    id: "mobile",
    header: "Contect info",
    cell: ({ getValue }) => (
      <div className="lowercase">{getValue("phone_number")}</div>
    ),
  },
  {
    id: "join_date",
    header: "Last login at",
    cell: ({ getValue }) => (
      <div className="capitalize">{getValue("updated_date")}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ getValue }) => {
      return (
        <div className="flex justify-end gap-2">
          <Link
            to={`/app-users/details/${getValue("id")}`}
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
  const [isLoading, setIsLoading] = useState(true);
  const [usersDataArray, setUsersDataArray] = useState([]);
  const [usersData, setUsersData]=useState({});
  const [totalPages, setTotalPages]=useState(0);
  const [apiInUse, setApiInUse]=useState("fetchAllAppusers");

  const { details, setDetails } = useAppUsersContext();

  const { mutate } = useMutation(fetchAllAppusers, {
    onSuccess: ({ data }) => {
      setUsersData(data);
      setTotalPages(Math.ceil(data.totalCount / 30));
      setUsersDataArray(data.referrors);
      setIsLoading(false);
      setDetails(data.referrors);
      setApiInUse("fetchAllAppusers");
    },
    onError: (err) => {
      console.log(err);
      setIsLoading(false);
    },
  });

  const searchReferrorMutate = useMutation(searchReferror, {
    onSuccess: ({ data }) => {
      setUsersData(data);
      setTotalPages(Math.ceil(data.referrors.length / 30));
      setUsersDataArray(data.referrors);
      setIsLoading(false);
      setDetails(data.referrors);
      setApiInUse("searchReferror");
    },
    onError: (err) => {
      console.log(err);
      setIsLoading(false);
    },
  });

  useEffect(() => {
    setIsLoading(true);
    mutate(page);
    console.log(page)
  }, [page]);

  useEffect(()=>{
    if (filterTerm){
      setIsLoading(true);
      searchReferrorMutate.mutate(filterTerm);
    }
  },[filterTerm]);

  return (
    <div className="w-full">
      <SearchFilter
        className="pb-4"
        onChange={setFilterTerm}
        placeholder="Filter by name..."
      />
      <SimpleTable
        columns={columns}
        data={apiInUse=="fetchAllAppusers"?usersDataArray:usersDataArray.slice((page*30)-30, 30)}
        isLoading={isLoading}
      />
      {isLoading ? (
        ""
      ) : (
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};

export default UsersTable;
