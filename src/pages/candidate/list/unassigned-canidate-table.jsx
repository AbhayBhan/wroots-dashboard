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
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { assignCandidate, fetchUnassignCandidates } from "@/services/candidate";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { formatTimestamp } from "@/utils/dateTime";
import { fetchAllCategories } from "@/services/JobCategories";
import { ScrollArea } from "@/components/ui/scroll-area";

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
        <div className="gap-2 flex_end">
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
          <AssignMeButton candidateId={row?.id} />
        </div>
      );
    },
  },
];

const UnassignedCanidateTable = () => {
  const [filterTerm, setFilterTerm] = useState("");
  // const categoryId = JSON.parse(localStorage.getItem("userdata")).categoryId;
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ["Canidate", "Unassign", page, selectedCategory, filterTerm],
    queryFn: () => fetchUnassignCandidates(selectedCategory, page, filterTerm),
  });
  const categoryQuery = useQuery({
    queryKey: ["Category"],
    queryFn: () => fetchAllCategories(),
  });

  useEffect(() => {
    setPage(1);
  }, [filterTerm]);

  // console.log(data?.data);
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
        {/* <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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

const AssignMeButton = ({ candidateId }) => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(assignCandidate, {
    onSuccess: () => {
      toast.success("Candidate Assigned, Redirecting...");
      setTimeout(() => {
        navigate(`/candidate/${candidateId}/details`);
      }, 500);
    },
  });

  const handleClick = () => {
    const userdata = JSON.parse(localStorage.getItem("userdata"));
    mutate({
      recruiterEmail: userdata.email,
      candidateID: candidateId,
    });
  };

  return (
    <Button size="sm" disabled={isLoading} onClick={handleClick}>
      {isLoading ? <Spinner /> : "Assign to me"}
    </Button>
  );
};

export default UnassignedCanidateTable;
