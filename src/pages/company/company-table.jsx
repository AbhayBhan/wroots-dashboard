import * as React from "react";
import { useState, useRef } from "react";

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

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { TrashIcon } from "@radix-ui/react-icons";
import AdvanceTable from "@/components/organism/advance-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { deleteBulkCompany, getCompanies } from "@/services/companies";
import { useMutation, useQuery } from "@tanstack/react-query";
import CompanyTableActions from "./company-table-actions";
import { toast } from "react-toastify";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Company Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <CompanyTableActions row={row.original} />;
    },
  },
];

const CompanyTable = () => {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [shouldRefresh, setShouldRefresh]=useState(false);

  const companyQuery = useQuery({
    queryKey: ["All-Company"],
    queryFn: getCompanies,
  });

  const table = useReactTable({
    data: companyQuery?.data?.data?.companies || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const toastId=useRef(null)

  const {mutate}=useMutation(deleteBulkCompany,{
    onSuccess: (data)=>{
      console.log(data.data)
      if (data.data.status==1){
        toast.update(toastId.current, {
          render: "Company deleted successfully!!",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        })
        companyQuery.refetch();
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

  function handleDeleteClick(){
    let arr=Object.keys(rowSelection);
    console.log(arr)
    let ids=[]
    arr.forEach((element)=>{
      ids.push(companyQuery?.data?.data?.companies[element].id);
    })
    console.log(ids)
    let obj={
      companyIds: ids
    }
    mutate(obj);
    toastId.current=toast.loading("Deleting...")
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-4">
        <Input
          placeholder="Filter name..."
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <AlertDialog open={deleteModal} onOpenChange={setDeleteModal}>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon" disabled={JSON.stringify(rowSelection)==="{}"?true:false}>
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
      <AdvanceTable
        table={table}
        isLoading={companyQuery.isLoading}
        columnLength={columns.length}
      />
      <div className="flex items-center justify-end pt-4 space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyTable;
