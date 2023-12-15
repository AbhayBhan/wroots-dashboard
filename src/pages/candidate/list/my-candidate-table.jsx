import { useEffect, useState } from "react";
import Pagination from "@/components/organism/pagination";
import SearchFilter from "@/components/organism/search-filter";
import SimpleTable from "@/components/organism/simple-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  exportMyCandidates,
  fetchMyCandidates,
  assignCandidateInBulk,
} from "@/services/candidate";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Spinner from "@/components/organism/spinner";
import { formatTimestamp } from "@/utils/dateTime";
import { useQuery, useMutation } from "@tanstack/react-query";
import MyCandidateAction from "./actions/mycandidate-action";
import ReactSelect from "react-select";
import { latestStatus } from "@/services/mock/latestStatus";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import RecruiterListModal from "./actions/recruiterListModal";
import CountBadge from "@/components/organism/countbadge";

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
      <Link to={`/candidate/${getValue("id")}/details`}>
        <div className="flex flex-col whitespace-nowrap">
          <span className="capitalize">{getValue("name")}</span>
          <span className="text-xs text-muted-foreground">
            {getValue("phoneNumber")}
          </span>
        </div>
      </Link>
    ),
  },
  {
    id: "referrer",
    header: () => <div>Referred by</div>,
    cell: ({ row }) => (
      <Link to={`/candidate/${row.id}/details`}>
        <div className="flex flex-col whitespace-nowrap">
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
      </Link>
    ),
  },
  {
    id: "job",
    header: "Category & Role",
    cell: ({ row }) => (
      <Link to={`/candidate/${row.id}/details`}>
        <div className="flex flex-col whitespace-nowrap">
          <span className="text-xs">
            {row.latestRoleName
              ? row.latestRoleName
              : row.role?.name
              ? row.role.name
              : "NA"}
          </span>
          <span className="text-xs text-muted-foreground">
            {row.latestCompanyName
              ? row.latestCompanyName
              : row.company?.name
              ? row.company.name
              : "NA"}
          </span>
          <span className="text-xs text-muted-foreground">
            {row.category.name}
          </span>
        </div>
      </Link>
    ),
  },
  {
    id: "status",
    header: "Latest Status",
    cell: ({ row }) => {
      return (
        <Link to={`/candidate/${row.id}/details`}>
          <div className="flex flex-col whitespace-nowrap">
            <span className="inline-block">
              <Badge>{row.latestStatus}</Badge>
            </span>
            <span className="text-xs text-muted-foreground">
              {formatTimestamp(row.updatedDate)}
            </span>
          </div>
        </Link>
      );
    },
  },
  {
    id: "action",
    header: "",
    cell: ({ row }) => {
      return <MyCandidateAction rowData={row} />;
    },
  },
];

const MyCanidateTable = () => {
  const {
    id: recruiterId,
    categoryId,
    isManager,
  } = JSON.parse(localStorage.getItem("userdata"));

  const [selectedRows, setSelectedRows] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams({});

  const page = Number(searchParams.get("page")) || 1;
  const filterTerm = searchParams.get("filterTerm");
  const selectedStatus = searchParams.get("status") || null;

  const handleParamChange = (key, value) => {
    setSearchParams(
      (pre) => {
        pre.set(`${key}`, `${value}`);
        return pre;
      },
      { replace: true }
    );
  };

  const { data, isLoading } = useQuery({
    queryKey: ["Candidate", "My", selectedStatus, page, filterTerm],
    queryFn: () =>
      fetchMyCandidates(recruiterId, page, filterTerm, selectedStatus),
  });

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

  // useEffect(() => {
  //   if (filterTerm) {
  //     handlePageChange(1);
  //   }
  // }, [filterTerm]);

  const totalPages = Math.ceil(data?.data?.totalRows / 30) || 1;
  const candidateList = data?.data?.candidates;

  return (
    <div className="w-full">
      <div className="pb-4 flex_between">
        <SearchFilter
          initialValue={filterTerm}
          onChange={(value) => handleParamChange("filterTerm", value)}
          placeholder="Search by Name..."
        />
        {selectedRows.length > 0 ? (
          <AssignRecruiter selectedRows={selectedRows} isManager={isManager} />
        ) : (
          <div className="flex flex-row justify-between w-1/3 gap-2">
            <ReactSelect
              options={latestStatus}
              className="w-full text-sm"
              value={latestStatus.find(
                (option) => option.value === selectedStatus
              )}
              onChange={(e) => handleParamChange("status", e.value)}
              placeholder="Select Status"
            />
            <Button
              onClick={() => exportMyCandidates(categoryId, recruiterId)}
              variant="outline"
              className="mr-2"
            >
              Export
            </Button>
          </div>
        )}
      </div>
      <CountBadge
        title={"Candidates"}
        data={data?.data?.totalRows}
        isLoading={isLoading}
      />
      <SimpleTable
        columns={columns}
        data={candidateList}
        isLoading={isLoading}
        selectAllRows={selectAllRows}
        toggleRowSelection={toggleRowSelection}
        getIsRowSelected={(id) => selectedRows.includes(id)}
        getIsAllRowSelected={selectedRows.length === candidateList?.length}
      />
      <Pagination
        page={page || 1}
        setPage={(value) => handleParamChange("page", value)}
        totalPages={totalPages}
      />
    </div>
  );
};

const AssignRecruiter = ({ selectedRows, isManager }) => {
  const [isOpen, setIsOpen] = useState(false);

  const assignMutation = useMutation({
    mutationFn: assignCandidateInBulk,
    onSuccess: () => {
      toast.success("Candidates Assigned");
      navigate(`/candidate?currentTab=My+Candidates`);
      setIsOpen(false);
    },
  });

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

  return (
    <div className="flex gap-2">
      {isManager && (
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
                handleAssignToRecruiterAction={handleAssignToRecruiterAction}
              />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
      <Button
        size="sm"
        disabled={assignMutation.isLoading}
        onClick={handleAssignAction}
      >
        {assignMutation.isLoading ? (
          <Spinner className="text-white" />
        ) : (
          "Assign Selected"
        )}
      </Button>
    </div>
  );
};

export default MyCanidateTable;
