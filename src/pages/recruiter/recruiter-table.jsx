import Pagination from "@/components/organism/pagination";
import SearchFilter from "@/components/organism/search-filter";
import SimpleTable from "@/components/organism/simple-table";
import { deleteBulkRecruiter, fetchRecruiters } from "@/services/recruiter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState, useRef } from "react";
import RecruiterTableActions from "./recruiter-table-actions";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { toast } from "react-toastify";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const RecruiterTable = ({ ShouldRefresh, SetShouldRefresh }) => {
  const columns = [
    {
      id: "select",
      header: ({ getIsAllRowSelected, selectAllRows }) => (
        <Checkbox
          checked={getIsAllRowSelected}
          onCheckedChange={(e) => selectAllRows(e)}
          aria-label="Select all"
        />
      ),
      cell: ({ toggleRowSelection, getIsRowSelected, rowIndex }) => (
        <Checkbox
          checked={getIsRowSelected}
          onCheckedChange={(e) => toggleRowSelection(e, rowIndex)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "name",
      header: "Name",
      cell: ({ getValue }) => (
        <div className="capitalize">{getValue("recruiter_name")}</div>
      ),
    },
    {
      id: "email",
      header: "Email",
      cell: ({ getValue }) => (
        <div className="lowercase">{getValue("recruiter_email")}</div>
      ),
    },
    {
      id: "type",
      header: "Type",
      cell: ({ getValue }) => (
        <div>{getValue("isSuperAdmin") ? "Super admin" : "-"}</div>
      ),
    },

    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        return <RecruiterTableActions rowData={row} refresh={SetShouldRefresh} />;
      },
    },
  ];


  const [filterTerm, setFilterTerm] = useState("second");
  const [page, setPage] = useState(1);
  const [recruiterList, setRecruiterList] = useState([]);
  const [recruiterData, setRecruiterData] = useState([]);
  const recruiterDataLength=(recruiterData.length>30?recruiterData.slice((page * 30) - 30, page * 30).length:recruiterData.length);
  const [shouldRefresh, setShouldRefresh] = useState(true);
  const [filterData, setFilterData] = useState([]);
  const [getIsAllRowSelected, setIsAllRowSelected] = useState(false);
  const [getIsRowSelected, setIsRowSelected] = useState(Array(recruiterDataLength).fill(false));
  const [deleteModal, setDeleteModal] = useState(false);
  const toastId=useRef(null)


  function selectSingleRow(value, i) {
    let arr = [...getIsRowSelected];
    arr[i] = value;
    setIsRowSelected(arr);
  }

  useEffect(()=>{
    if (recruiterDataLength){
      if(JSON.stringify(getIsRowSelected)===JSON.stringify(Array(recruiterDataLength).fill(true))){
        console.log(getIsRowSelected)
        setIsAllRowSelected(true);
      }
      else{
        setIsAllRowSelected(false);
      }
    }
  },[getIsRowSelected])

  function selectAllRow(value) {
    setIsRowSelected(Array(recruiterDataLength).fill(value));
    setIsAllRowSelected(value);
  }

  function handleDeleteClick(){
    const arr=[];
    getIsRowSelected.forEach((element, index)=>{
      if (element){
        arr.push(recruiterData.slice((page * 30) - 30, page * 30)[index].id);
      }
    });
    console.log(arr);
    console.log(recruiterData)
    let obj={
      recruiterIds: arr
    }
    bulkDelete.mutate(obj);
    toastId.current=toast.loading("Deleting...")
  }

  const { mutate, isLoading } = useMutation(fetchRecruiters, {
    onSuccess: ({ data }) => {
      setRecruiterData(data?.recruiters);
      setRecruiterList(data?.recruiters);
    }
  });

  const bulkDelete=useMutation(deleteBulkRecruiter,{
    onSuccess: (data)=>{
      console.log(data);
      if (data.data.status==1){
        toast.update(toastId.current, {
          render: "Recruiter deleted successfully!!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        })
        SetShouldRefresh(true)
      }
    },
    onError: (data)=>{
      console.log(data);
      toast.update(toastId.current, {
        render: "Something Happened!!",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      })
    }
  })

  useEffect(() => {
    if (ShouldRefresh) {
      SetShouldRefresh(false);
      const id = JSON.parse(localStorage.getItem('userdata')).id;
      const reqbody = {
        pageno: page,
        recruiterId: id
      }
      mutate(reqbody);
      setIsRowSelected(Array(recruiterDataLength).fill(false))
      setIsAllRowSelected(false)
    }
  }, [ShouldRefresh]);

  // useEffect(() => {
  //   if (ShouldRefresh) {
  //     setShouldRefresh(true);
  //     SetShouldRefresh(false);
  //   }
  // }, [ShouldRefresh])

  useEffect(()=>{
    setIsRowSelected(Array(recruiterDataLength).fill(false))
    setIsAllRowSelected(false)
  },[page])

  return (
    <div className="w-full">
      <div className="flex justify-between pb-4">
        <SearchFilter
          className=""
          value={filterTerm}
          onChange={(e) => {
            setFilterTerm(e)
            if (e.length) {
              setRecruiterData(recruiterList.filter((rec) => { return (rec.recruiter_name?.toLowerCase().startsWith(e) || rec.recruiter_email?.toLowerCase().startsWith(e)) }))
              setIsRowSelected(Array(recruiterDataLength).fill(false))
              setIsAllRowSelected(false)
            } else {
              setRecruiterData(recruiterList);
              setIsRowSelected(Array(recruiterDataLength).fill(false))
              setIsAllRowSelected(false)
            }
          }}
          placeholder="Filter by name..."
        />

        <AlertDialog open={deleteModal} onOpenChange={setDeleteModal}>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon" disabled={!getIsRowSelected.includes(true)}>
              <TrashIcon className="w-5 h-5 text-red-500" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                onClick={handleDeleteClick}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </div>
      <SimpleTable
        columns={columns}
        data={recruiterData.slice((page * 30) - 30, page * 30)}
        isLoading={isLoading}
        selectAllRows={selectAllRow}
        toggleRowSelection={selectSingleRow}
        getIsAllRowSelected={getIsAllRowSelected}
        getIsRowSelected={getIsRowSelected}
      />
      <Pagination page={page} setPage={setPage} totalPages={Math.ceil(recruiterData?.length / 30) || 1} />
    </div>
  );
};

export default RecruiterTable;
