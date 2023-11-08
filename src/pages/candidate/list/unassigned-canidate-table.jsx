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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { statusColors } from "@/utils/colorMap";
import { formatTimestamp } from "@/utils/dateTime";
import { CursorArrowIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RecruiterListModal from "./actions/recruiterListModal";
import ReactSelect from "react-select";

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
      return <UnassignedAction row={row} />;
    },
  },
];

const categoryOptions = [
  {
    label: "BPO",
    value: 1,
  },
  {
    label: "IT",
    value: 6,
  },
  {
    label: "NON IT",
    value: 7,
  },
];

const UnassignedCanidateTable = () => {
  const [filterTerm, setFilterTerm] = useState("");
  const { categoryId, isManager } = JSON.parse(
    localStorage.getItem("userdata")
  );
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["Canidate", "Unassign", page, selectedCategory, filterTerm],
    queryFn: () =>
      fetchUnassignCandidates(
        isManager ? selectedCategory : categoryId,
        page,
        filterTerm,
        isManager
      ),
  });

  const assignMutation = useMutation({
    mutationFn: assignCandidateInBulk,
    onSuccess: () => {
      toast.success("Candidates Assigned");
      navigate(`/candidate?currentTab=My+Candidates`);
      setIsOpen(false);
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
    assignMutation.mutate(payload);
  };

  const handleAssignToRecruiterAction = (id) => {
    const payload = {
      candidateIDs: selectedRows,
      recruiterId: id,
    };
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
        {selectedRows.length > 0 ? (
          <div>
            <div className="flex gap-2">
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button variant="default" size="sm">
                    Assign To Recruiter
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="mb-3">Choose Recruiter</DialogTitle>
                    <RecruiterListModal
                      isLoading={assignMutation.isLoading}
                      handleAssignToRecruiterAction={
                        handleAssignToRecruiterAction
                      }
                    />
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <Button
                size="sm"
                disabled={isLoading}
                onClick={handleAssignAction}
              >
                {isLoading ? (
                  <Spinner className="text-white" />
                ) : (
                  "Assign Selected"
                )}
              </Button>
            </div>
          </div>
        ) : (
          isManager && (
            <ReactSelect
              options={categoryOptions}
              className="w-1/6 text-sm"
              isSearchable={false}
              value={categoryOptions.find(
                (option) => option.value === selectedCategory
              )}
              onChange={(e) => setSelectedCategory(e.value)}
            />
          )
        )}
      </div>
      <div className="flex flex-row justify-center mb-2">
        <Badge className="bg-blue-400 text-md" >
          Total Candidates : {data?.data?.totalRows}
        </Badge>
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

const UnassignedAction = ({ row }) => {
  const ref = useRef();
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(assignCandidate, {
    onSuccess: () => {
      toast.success("Candidate Assigned, Redirecting...");
      setTimeout(() => {
        navigate(`/candidate/${row.id}/details`);
      }, 500);
    },
  });

  const handleClick = () => {
    const userdata = JSON.parse(localStorage.getItem("userdata"));
    mutate({
      recruiterEmail: userdata.email,
      candidateID: row.id,
    });
  };

  const handleSaveLinkPosn = () => {
    const divPosn = ref.current.getBoundingClientRect();
    sessionStorage.setItem("scrollPosition", divPosn.y);
  };

  useEffect(() => {
    const scrollPosition = +sessionStorage.getItem("scrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, scrollPosition);
    }
  }, [row.id]);

  return (
    <div ref={ref} className="gap-2 flex_end">
      <Link
        to={`/candidate/${row?.id}/details`}
        // className="hidden h-8 ml-auto lg:flex"
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "hover:bg-muted "
        )}
        onClick={handleSaveLinkPosn}
        title="Detail View"
      >
        <EyeOpenIcon className="w-5 h-5 text-slate-500" />
      </Link>
      <Button size="sm" disabled={isLoading} onClick={handleClick}>
        {isLoading ? <Spinner className="text-white" /> : "Assign to me"}
      </Button>
    </div>
  );
};

export default UnassignedCanidateTable;
