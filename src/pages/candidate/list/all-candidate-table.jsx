import React, { useEffect, useState } from "react";
import Pagination from "@/components/organism/pagination";
import SearchFilter from "@/components/organism/search-filter";
import SimpleTable from "@/components/organism/simple-table";
import { Badge } from "@/components/ui/badge";
import { DateRange } from "@/components/ui/date-range";
import { categoryOptions } from "@/utils/contants";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  exportAllCandidates,
  fetchAllCandidates,
  assignCandidateInBulk,
} from "@/services/candidate";
import { latestStatus } from "@/services/mock/latestStatus";
import { formatDateOnlyString, formatTimestamp } from "@/utils/dateTime";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import ReactSelect from "react-select";
import AllCandidateAction from "./actions/all-candidate-action";
import CountBadge from "@/components/organism/countbadge";
import { fetchRecruiters } from "@/services/recruiter";
import { getFirstDayOfYear, getCurrentDate } from "@/utils/dateTime";

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
      <div className="flex flex-col whitespace-nowrap ">
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
    ),
  },
  {
    id: "status",
    header: "Latest Status",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col whitespace-nowrap">
          <span className="inline-block">
            <Badge>{row.latestStatus}</Badge>
          </span>
          <span className="text-xs text-muted-foreground">
            {row.recruiter?.name ? row.recruiter.name : "NA"}
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
      return <AllCandidateAction row={row} />;
    },
  },
];

const CandidateTable = () => {
  const [filterTerm, setFilterTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [recruiterArray, setRecruiterArray] = useState(null);
  const [recruiterList, setRecruiterList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const [dateValues, setDateValues] = useState({
    startDate: getFirstDayOfYear(),
    endDate: getCurrentDate(),
  });

  const [searchParams, setSearchParams] = useSearchParams({});

  const page = Number(searchParams.get("page"));

  const handlePageChange = (page) => {
    setSearchParams(
      (pre) => {
        pre.set("page", `${page}`);
        return pre;
      },
      { replace: true }
    );
  };

  const { data, isLoading } = useQuery({
    queryKey: [
      "Candidates",
      "All",
      page,
      selectedCategory,
      selectedStatus,
      selectedRecruiter,
      filterTerm,
      dateValues,
    ],
    queryFn: () =>
      fetchAllCandidates(
        page,
        filterTerm,
        selectedStatus,
        selectedCategory,
        recruiterArray,
        formatDateOnlyString(dateValues.startDate),
        formatDateOnlyString(dateValues.endDate)
      ),
    // keepPreviousData: true,
  });

  const { mutate } = useMutation(fetchRecruiters, {
    onSuccess: ({ data }) => {
      setRecruiterList(
        data.recruiters.map((it) => {
          return { label: it.recruiter_name, value: it.id };
        })
      );
    },
  });

  const assignMutation = useMutation({
    mutationFn: assignCandidateInBulk,
    onSuccess: () => {
      toast.success("Candidates Assigned");
      window.location.reload();
    },
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

  const handleAssignAction = () => {
    const userdata = JSON.parse(localStorage.getItem("userdata"));
    const payload = {
      candidateIDs: selectedRows,
      recruiterId: userdata?.id,
    };
    assignMutation.mutate(payload);
  };

  useEffect(() => {
    if (filterTerm) {
      handlePageChange(1);
    }
  }, [filterTerm]);

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("userdata")).id;
    const reqbody = {
      pageno: page,
      recruiterId: id,
    };
    mutate(reqbody);
  }, []);

  const totalPages = Math.ceil(data?.data?.totalRows / 30) || 1;
  const candidateList = data?.data?.candidates;

  return (
    <div className="w-full">
      {selectedRows.length > 0 ? (
        <div>
          <Button size="sm" disabled={isLoading} onClick={handleAssignAction}>
            {isLoading ? <Spinner className="text-white" /> : "Assign Selected"}
          </Button>
        </div>
      ) : (
        <div className="pb-4 flex flex-col gap-4">
          <div className="flex flex-row justify-between gap-2 w-full">
            <SearchFilter
              className=""
              onChange={setFilterTerm}
              placeholder="Search by name..."
            />
            <DateRange
              from={dateValues.startDate}
              to={dateValues.endDate}
              onChange={setDateValues}
            />
          </div>
          <div className="flex flex-row justify-between gap-2 w-full">
            <ReactSelect
              options={categoryOptions}
              className="w-full text-sm"
              isSearchable={false}
              value={categoryOptions.find(
                (option) => option.value === selectedCategory
              )}
              onChange={(e) => setSelectedCategory(e.value)}
            />
            <ReactSelect
              options={latestStatus}
              className="w-full text-sm"
              value={selectedStatus?.label}
              onChange={(data) => setSelectedStatus(data.value)}
              placeholder="Select Status"
            />
            <ReactSelect
              options={recruiterList}
              className="w-full text-sm"
              value={selectedRecruiter}
              onChange={(data) => {
                const selectedValues = data.map((option) => option.value);
                setSelectedRecruiter(data);
                setRecruiterArray(selectedValues);
              }}
              placeholder="Select Recruiter"
              isSearchable
              isMulti
            />
            <Button
              onClick={() =>
                exportAllCandidates(
                  selectedCategory,
                  selectedRecruiter,
                  selectedStatus
                )
              }
              variant="outline"
              className="mr-2"
            >
              Export
            </Button>
          </div>
        </div>
      )}
      <CountBadge
        title={"Candidates"}
        data={data?.data?.totalRows}
        isLoading={isLoading}
      />
      <SimpleTable
        columns={columns}
        data={data?.data?.candidates}
        isLoading={isLoading}
        selectAllRows={selectAllRows}
        toggleRowSelection={toggleRowSelection}
        getIsRowSelected={(id) => selectedRows.includes(id)}
        getIsAllRowSelected={selectedRows.length === candidateList?.length}
      />
      <Pagination
        page={page || 1}
        setPage={handlePageChange}
        totalPages={totalPages}
      />
    </div>
  );
};

export default CandidateTable;
