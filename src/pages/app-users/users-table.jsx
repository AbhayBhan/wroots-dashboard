import { EyeOpenIcon } from "@radix-ui/react-icons";

import Pagination from "@/components/organism/pagination";
import SearchFilter from "@/components/organism/search-filter";
import SimpleTable from "@/components/organism/simple-table";
import { buttonVariants } from "@/components/ui/button";
import { usersData } from "@/data/users";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { fetchAllAppusers } from "@/services/Appusers";

export const columns = [
  {
    id: "full_name",
    header: "Name",
    cell: ({ getValue }) => (
      <div className="capitalize">{getValue("name")}</div>
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
    cell: ({getValue}) => {
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
  const [isLoading, setIsLoading]=useState(true);
  const [usersDataArray,setUsersDataArray]=useState({});

  const { mutate } = useMutation(fetchAllAppusers, {
    onSuccess: ({ data }) => {
      console.log(data);
      // Use the setUserDataArray to update data array
      setIsLoading(false);
    },
    onError: (err)=>{
      console.log(err);
      setIsLoading(false);
    }
  });

  useEffect(()=>{
    mutate();
  },[])

  // fetch("https://wroots-backend.onrender.com/referror/getallReferror?pageno=1")
  // .then(res=>res.json())
  // .then((res)=>{
  //   setUsersDataArray(res.referrors);
  //   setIsLoading(false)})
  // .catch(err=>console.log(err));

  return (
    <div className="w-full">
      <SearchFilter
        className="pb-4"
        onChange={setFilterTerm}
        placeholder="Filter by name..."
      />
      <SimpleTable columns={columns} data={usersDataArray} isLoading={isLoading} />
      <Pagination page={page} setPage={setPage} totalPages={10} />

    </div>
  );
};

export default UsersTable;
