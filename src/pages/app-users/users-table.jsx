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
import { useAppUsersContext } from "@/contexts/appUsersContext";
import AppUsersContext from "@/contexts/appUsersContext";
import { useContext } from "react";

export const columns = [
  {
    id: "full_name",
    header: "Name",
    cell: ({ getValue }) => (
      <div className="capitalize">{getValue("first_name")}{getValue("middle_name")}{getValue("last_name")}</div>
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
  const [usersDataArray,setUsersDataArray]=useState([]);

  const {details, setDetails}=useAppUsersContext();

  const { mutate } = useMutation(fetchAllAppusers, {
    onSuccess: ({ data }) => {
      setUsersDataArray(data.referrors);
      setIsLoading(false);
      setDetails(data.referrors);
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
  //   setIsLoading(false)
  //   setDetails(res.referrors);
  // })
  // .catch(err=>console.log(err));

  return (
    <div className="w-full">
      <SearchFilter
        className="pb-4"
        onChange={setFilterTerm}
        placeholder="Filter by name..."
      />
      <SimpleTable columns={columns} data={usersDataArray.slice((page*10)-10, page*10)} isLoading={isLoading} />
      {isLoading?""
      :<Pagination page={page} setPage={setPage} totalPages={usersDataArray.length%10==0?usersDataArray.length/10:usersDataArray.length/10+1} />
      }

    </div>
  );
};

export default UsersTable;
