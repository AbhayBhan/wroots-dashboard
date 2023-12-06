import CountBadge from "@/components/organism/countbadge";
import Pagination from "@/components/organism/pagination";
import SearchFilter from "@/components/organism/search-filter";
import SimpleTable from "@/components/organism/simple-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  assignCandidateInBulk,
  exportAllCandidates,
  fetchAllCandidates,
} from "@/services/candidate";
import { latestStatus } from "@/services/mock/latestStatus";
import { fetchRecruiters } from "@/services/recruiter";
import { categoryOptions } from "@/utils/contants";
import {
  formatTimestamp,
  getFirstDateOfCurrentYear,
  getNow
} from "@/utils/dateTime";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ReactSelect from "react-select";
import AllCandidateAction from "./actions/all-candidate-action";

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
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRecuiterIds, setSelectedRecruiterIds] = useState([]);
  const [recruiterOptions, setRecruiterOptions] = useState([]);

  const [dateValues, setDateValues] = useState({
    startDate: "",
    endDate: "",
  });

  const [searchParams, setSearchParams] = useSearchParams({});

  const page = Number(searchParams.get("page")) || 1;
  const filterTerm = searchParams.get("filterTerm");
  const selectedCategory = Number(searchParams.get("category")) || null;
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

  const handleDateRangeChange = (range) => {
    setDateValues({ startDate: range.startDate, endDate: range.endDate });
    const dateRangeString = `${range.startDate}_${range.endDate}`;
    handleParamChange("dateRange", dateRangeString);
  };

  const { data, isLoading } = useQuery({
    queryKey: [
      "Candidates",
      "All",
      page,
      selectedCategory,
      selectedStatus,
      selectedRecuiterIds,
      filterTerm,
      dateValues,
    ],
    queryFn: () =>
      fetchAllCandidates(
        page,
        filterTerm,
        selectedStatus,
        selectedCategory,
        selectedRecuiterIds,
        dateValues.startDate,
        dateValues.endDate
      ),
    // keepPreviousData: true,
  });

  const { mutate } = useMutation(fetchRecruiters, {
    onSuccess: ({ data }) => {
      setRecruiterOptions(
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

  const handleSelectRecruiter = (data) => {
    const selectedValues = data.map((option) => option.value);
    setSelectedRecruiter(data);
    setSelectedRecruiterIds(selectedValues);
    handleParamChange("recruiters", selectedValues);
  };

  useEffect(() => {
    const dateRange = searchParams.get("dateRange");
    if (dateRange) {
      const [startDate, endDate] = dateRange.split("_");
      console.log(startDate, endDate);
      setDateValues({ startDate, endDate });
    } else {
      setDateValues({
        startDate: getFirstDateOfCurrentYear(),
        endDate: getNow(),
      });
    }
  }, [searchParams]);

  useEffect(() => {
    const recruiters = searchParams.get("recruiters");
    if (recruiters) {
      const splitedRecruiters = recruiters.split(",");
      const recruiterArray = recruiterOptions.filter((recruiter) =>
        splitedRecruiters.includes(`${recruiter.value}`)
      );
      setSelectedRecruiter(recruiterArray);
      setSelectedRecruiterIds(splitedRecruiters);
    }
  }, [recruiterOptions, searchParams]);

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("userdata")).id;
    const reqbody = {
      // pageno: page,
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
        <div className="flex flex-col gap-4 pb-4">
          <div className="flex flex-row justify-between w-full gap-2">
            <SearchFilter
              initialValue={filterTerm}
              onChange={(value) => handleParamChange("filterTerm", value)}
              placeholder="Search by Name..."
            />
            {/* <DateRange
              from={dateValues.startDate}
              to={dateValues.endDate}
              onChange={handleDateRangeChange}
            /> */}
            <DateRangeSelect
              from={dateValues.startDate}
              to={dateValues.endDate}
              onChange={handleDateRangeChange}
            />
          </div>
          <div className="flex flex-row justify-between w-full gap-2">
            <ReactSelect
              options={categoryOptions}
              className="w-full text-sm"
              isSearchable={false}
              value={categoryOptions.find(
                (option) => option.value === selectedCategory
              )}
              onChange={(e) => handleParamChange("category", e.value)}
            />
            <ReactSelect
              options={latestStatus}
              className="w-full text-sm"
              value={latestStatus.find(
                (option) => option.value === selectedStatus
              )}
              onChange={(e) => handleParamChange("status", e.value)}
              placeholder="Select Status"
            />
            <ReactSelect
              options={recruiterOptions}
              className="w-full text-sm"
              value={selectedRecruiter}
              onChange={handleSelectRecruiter}
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
        setPage={(value) => handleParamChange("page", value)}
        totalPages={totalPages}
      />
    </div>
  );
};

const DateRangeSelect = ({ from, to, onChange }) => {
  const [dateRange, setDateRange] = useState({
    from: "",
    to: "",
  });

  const handleDateChange = (e) => {
    const { name, value } = e.target;

    setDateRange((prev) => ({ ...prev, [name]: value }));

    onChange({
      startDate: name === "from" ? value : dateRange.from,
      endDate: name === "to" ? value : dateRange.to,
    });
  };

  useEffect(() => {
    setDateRange({ from, to });
  }, [from, to]);

  console.log(dateRange);

  return (
    <div className="flex space-x-2">
      <Input
        type="date"
        name="from"
        value={dateRange.from || ""}
        onChange={handleDateChange}
      />
      <Input
        type="date"
        name="to"
        value={dateRange.to || ""}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default CandidateTable;
