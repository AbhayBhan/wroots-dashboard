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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteCompany } from "@/services/companies";
import CompanyForm from "./company-form";

const CompanyTableActions = ({ row }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const toastId = useRef(null);
  const queryClient = useQueryClient();

  const deleteCompanyMutation = useMutation({
    mutationFn: deleteCompany,
    onSuccess: ({ data }) => {
      toast.update(toastId.current, {
        render: "Category deleted successfully!!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      queryClient.invalidateQueries({ queryKey: ["All-Company"] });
    },
    onError: () => {
      toast.update(toastId.current, {
        render: "Failed to delete category!!",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    },
  });

  const handleDeleteClick = () => {
    deleteCompanyMutation.mutate({ id: row?.id });
    toastId.current = toast.loading("Deleting...");
  };

  return (
    <div className="flex justify-end gap-2">
      {/* <Link
        to={"/company/details"}
        // className="hidden h-8 ml-auto lg:flex"
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "hover:bg-muted "
        )}
        title="Detail View"
      >
        <EyeOpenIcon className="w-5 h-5 text-slate-500" />
      </Link> */}
      <Dialog open={editModal} onOpenChange={setEditModal}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Pencil1Icon className="w-5 h-5 text-slate-500" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-3">Edit Company</DialogTitle>
            <CompanyForm
              initialData={row}
              onSuccessAction={() => setEditModal(false)}
            />
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <AlertDialog open={deleteModal} onOpenChange={setDeleteModal}>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon">
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
  );
};

export default CompanyTableActions;
