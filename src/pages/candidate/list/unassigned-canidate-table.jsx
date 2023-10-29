import Pagination from "@/components/organism/pagination";
import SearchFilter from "@/components/organism/search-filter";
import SimpleTable from "@/components/organism/simple-table";
import Spinner from "@/components/organism/spinner";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { candidateData } from "@/data/candidate";
import { cn } from "@/lib/utils";
import { assignCandidate, fetchUnassignCandidates } from "@/services/candidate";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
        <span className="capitalize">{row.referror["name"]}</span>
        <span className="text-xs text-muted-foreground">
          {row.referror["phoneNumber"]}
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
    id: "action",
    header: "",
    cell: ({ row }) => {
      return (
        <div className="flex_end gap-2">
          <Link
            to={`/candidate/${row?.id}/details`}
            // className="hidden h-8 ml-auto lg:flex"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "hover:bg-muted "
            )}
            title="Detail View"
          >
            <EyeOpenIcon className="w-5 h-5 text-slate-500" />
          </Link>
          <AssignMeButton id={row?.id} />
        </div>
      );
    },
  },
];

const UnassignedCanidateTable = () => {
  const [filterTerm, setFilterTerm] = useState("");
  const categoryId = JSON.parse(localStorage.getItem('userdata')).categoryId;
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ["Canidate", "Unassign", page],
    queryFn: () => fetchUnassignCandidates(categoryId, page),
  });

  const totalPages = Math.floor(data?.data?.totalRows / 30) || 1;

  return (
    <div className="w-full">
      <div className="flex_between pb-4">
        <SearchFilter
          className=""
          onChange={setFilterTerm}
          placeholder="Filter by name..."
        />
        {/* <Select>                   Hidden for this release.
          <SelectTrigger className="max-w-[200px] w-full">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="m@example.com">Category 1</SelectItem>
            <SelectItem value="m@support.com">Category 2</SelectItem>
            <SelectItem value="m@google.com">Category 3</SelectItem>
          </SelectContent>
        </Select> */}
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

const AssignMeButton = ({ id }) => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(assignCandidate, {
    onSuccess : () => {
      toast.success("Candidate Assigned, Redirecting...");
      setTimeout(() => {
        navigate(`/candidate/${id}/details`)
      },5000);
    }
  });

  const handleClick = () => {
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    mutate({
      recruiterEmail : userdata.email,
      candidateID: id,
    });
  };

  return (
    <Button size="sm" disabled={isLoading} onClick={handleClick}>
      {isLoading ? <Spinner /> : "Assign to me"}
    </Button>
  );
};

export default UnassignedCanidateTable;
