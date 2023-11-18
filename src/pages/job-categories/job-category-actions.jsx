import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
import { JobCategoryForm } from "./job-category-form";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { deleteCategory } from "@/services/JobCategories";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
import Spinner from "@/components/organism/spinner";

const JobCategoryActions = ({ row }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const toastId = useRef(null);

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: ({ data }) => {
      // toast.success("Category deleted successfully!!");
      toast.update(toastId.current, {
        render: "Category deleted successfully!!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      setDeleteModal(false);
    },
    onError: () => {
      // toast.error("Failed to delete category!!");
      toast.update(toastId.current, {
        render: "Failed to delete category!!",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    },
  });

  const handleDeleteClick = () => {
    deleteCategoryMutation.mutate({ id: row?.id });
    toastId.current = toast.loading("Deleting...");
  };

  return (
    <div className="flex justify-end gap-2">
      <Dialog open={editModal} onOpenChange={setEditModal}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Pencil1Icon className="w-5 h-5 text-slate-500" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-3">Edit Job Categories</DialogTitle>
            <JobCategoryForm
              initialData={row}
              onSuccessAction={() => {
                setEditModal(false);
                window.location.reload();
              }}
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

export default JobCategoryActions;
