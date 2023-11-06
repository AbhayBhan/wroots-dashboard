import Pagination from "@/components/organism/pagination";
import SearchFilter from "@/components/organism/search-filter";
import SimpleTable from "@/components/organism/simple-table";
import Spinner from "@/components/organism/spinner";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  assignCandidate,
  assignCandidateInBulk,
  fetchUnassignCandidates,
} from "@/services/candidate";
import { statusColors } from "@/utils/colorMap";
import { formatTimestamp } from "@/utils/dateTime";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const columns = [
  {
    id: "selection",
    header: ({ selectAllRows, getIsAllRowSelected }) => (
      <Checkbox checked={getIsAllRowSelected} onCheckedChange={selectAllRows} />
    ),
    cell: ({ row, getIsRowSelected, toggleRowSelection }) => (
      <Checkbox
        checked={getIsRowSelected(row.id)}
        onCheckedChange={() => toggleRowSelection(row.id)}
      />
    ),
  },
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
            <Badge
              className={`${statusColors[row.latestStatus] || "bg-gray-400"}`}
            >
              {row.latestStatus}
            </Badge>
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
  const { categoryId, isManager } = JSON.parse(
    localStorage.getItem("userdata")
  );
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["Canidate", "Unassign", page, selectedCategory, filterTerm],
    queryFn: () =>
      fetchUnassignCandidates(categoryId, page, filterTerm, isManager),
  });

  const assignMutation = useMutation({
    mutationFn: assignCandidateInBulk,
    onSuccess: () => {
      toast.success("Candidates Assigned");
      navigate(`/candidate?currentTab=My+Candidates`);
    },
  });

  const candidateList = data?.data?.candidates || [];

  const selectAllRows = (e) => {
    if (e) {
      const allRowIds = candidateList?.map((candidate) => candidate.id);
      setSelectedRows(allRowIds);
    } else {
      setSelectedRows([]);
    }
  };

  const toggleRowSelection = (rowId) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  const handleAssignAction = () => {
    const userdata = JSON.parse(localStorage.getItem("userdata"));
    const payload = {
      candidateIDs: selectedRows,
      recruiterId: userdata?.id,
    };
    // console.log(payload);
    assignMutation.mutate(payload);
  };

  useEffect(() => {
    setPage(1);
  }, [filterTerm]);

  const totalPages = Math.floor(data?.data?.totalRows / 30) || 1;

  return (
    <div className="w-full">
      <div className="pb-4 flex_between">
        <SearchFilter
          className=""
          onChange={setFilterTerm}
          placeholder="Filter by name..."
        />
        {selectedRows.length > 0 && (
          <Button size="sm" disabled={isLoading} onClick={handleAssignAction}>
            {isLoading ? <Spinner className="text-white" /> : "Assign Selected"}
          </Button>
        )}
      </div>
      <SimpleTable
        columns={columns}
        data={candidateList}
        isLoading={isLoading}
        selectAllRows={selectAllRows}
        toggleRowSelection={toggleRowSelection}
        getIsRowSelected={(id) => selectedRows.includes(id)}
        getIsAllRowSelected={selectedRows.length === candidateList.length}
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
      {isLoading ? <Spinner className="text-white" /> : "Assign to me"}
    </Button>
  );
};

export default UnassignedCanidateTable;
