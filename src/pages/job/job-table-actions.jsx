import DeleteAlert from "@/components/organism/delete-alert";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { archiveSingleJob, deleteJob } from "@/services/jobs";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { BiArchiveIn } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const JobTableActions = ({ rowData }) => {
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const toastArchive = useRef(null);
  const toastDelete = useRef(null);
  const queryClient = useQueryClient();

  const archiveJobMutation = useMutation({
    mutationFn: archiveSingleJob,
    onSuccess: ({ data }) => {
      toast.update(toastArchive.current, {
        render: "Job archived successfully!!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      queryClient.invalidateQueries({ queryKey: ["Jobs", "Active"] });
    },
    onError: () => {
      toast.update(toastArchive.current, {
        render: "Failed to archive job!!",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    },
  });
  const deleteJobMutation = useMutation({
    mutationFn: deleteJob,
    onSuccess: ({ data }) => {
      toast.update(toastDelete.current, {
        render: "Job deleted successfully!!",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      queryClient.invalidateQueries({ queryKey: ["Jobs", "Active"] });
    },
    onError: () => {
      toast.update(toastDelete.current, {
        render: "Failed to delete job!!",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    },
  });

  const handleArchiveClick = () => {
    archiveJobMutation.mutate({ roleId: rowData?.id });
    toastArchive.current = toast.loading("Archiving...");
  };

  const handleDeleteClick = () => {
    deleteJobMutation.mutate({ roleId: rowData?.id });
    toastDelete.current = toast.loading("Deleting...");
  };

  return (
    <div className="flex justify-end items-center gap-2">
      <Link
        to={`/job/${rowData.id}/details`}
        state={{ jobDetails: rowData }}
        // className="hidden h-8 ml-auto lg:flex"
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "hover:bg-muted "
        )}
        title="Detail View"
      >
        <EyeOpenIcon className="w-5 h-5 text-slate-500" />
      </Link>

      <Button
        size="icon"
        variant="ghost"
        title="Archive"
        onClick={handleArchiveClick}
      >
        <BiArchiveIn className="w-5 h-5 text-slate-500" />
      </Button>

      <DeleteAlert
        isModalOpen={isDeleteModal}
        setIsModalOpen={setIsDeleteModal}
        onDeleteClick={handleDeleteClick}
      />

      {/* <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Pencil1Icon className="w-5 h-5 text-slate-500" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-3">Edit Job</DialogTitle>
            Edit job form will be there.
          </DialogHeader>
        </DialogContent>
      </Dialog> */}

      {/* <AlertDialog>
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
            <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}
    </div>
  );
};

export default JobTableActions;
