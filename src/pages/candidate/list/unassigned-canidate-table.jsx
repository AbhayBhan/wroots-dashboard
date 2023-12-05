import Pagination from "@/components/organism/pagination";
import SearchFilter from "@/components/organism/search-filter";
import SimpleTable from "@/components/organism/simple-table";
import Spinner from "@/components/organism/spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  assignCandidateInBulk,
  fetchUnassignCandidates,
} from "@/services/candidate";
import { statusColors } from "@/utils/colorMap";
import { categoryOptions } from "@/utils/contants";
import { formatTimestamp } from "@/utils/dateTime";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
import RecruiterListModal from "./actions/recruiterListModal";
import UnassignedCandidateAction from "./actions/unassigned-candidate-action";
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
      <div className="flex flex-col whitespace-nowrap">
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
    ),
  },
  {
    id: "job",
    header: "Category & Role",
    cell: ({ row }) => (
      <div className="flex flex-col whitespace-nowrap">
        <span className="text-xs text-muted-foreground">
          {row.role?.name ? row.role.name : "NA"}
        </span>
        <span className="text-xs text-muted-foreground">
          {row.company?.name ? row.company.name : "NA"}
        </span>
        <span className="text-xs text-muted-foreground">
          {row.category.name}
        </span>
      </div>
    ),
  },
  {
    id: "status",
    header: "Latest Status",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col whitespace-nowrap">
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
      return <UnassignedCandidateAction row={row} />;
    },
  },
];

const UnassignedCanidateTable = () => {
  const { categoryId, isManager, isSuperAdmin } = JSON.parse(
    localStorage.getItem("userdata")
  );

  const [selectedRows, setSelectedRows] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams({});

  const page = Number(searchParams.get("page")) || 1;
  const filterTerm = searchParams.get("filterTerm");
  const category = Number(searchParams.get("category")) || null;

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
    queryKey: ["Canidate", "Unassign", page, category, filterTerm],
    queryFn: () =>
      fetchUnassignCandidates(
        isManager ? category : categoryId,
        page,
        filterTerm
      ),
  });

  const candidateList = data?.data?.candidates || [];

  const selectAllRows = (isAllChecked) => {
    if (isAllChecked) {
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

  const totalPages = Math.ceil(data?.data?.totalRows / 30) || 1;

  return (
    <div className="w-full">
      <div className="pb-4 flex_between">
        <SearchFilter
          initialValue={filterTerm}
          onChange={(value) => handleParamChange("filterTerm", value)}
          placeholder="Search by Name..."
        />
        {selectedRows.length > 0 ? (
          <AssignRecruiter selectedRows={selectedRows} />
        ) : (
          isManager && (
            <ReactSelect
              options={categoryOptions}
              className="w-1/6 text-sm"
              isSearchable={false}
              value={categoryOptions.find(
                (option) => option.value === category
              )}
              onChange={(e) => handleParamChange("category", e.value)}
            />
          )
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
        getIsAllRowSelected={selectedRows.length === candidateList.length}
      />
      <Pagination
        page={page || 1}
        setPage={(value) => handleParamChange("page", value)}
        // onPageChange={setPage}
        totalPages={totalPages}
      />
    </div>
  );
};

const AssignRecruiter = ({ selectedRows }) => {
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

export default UnassignedCanidateTable;
