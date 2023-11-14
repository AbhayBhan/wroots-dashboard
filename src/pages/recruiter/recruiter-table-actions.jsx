import { EyeOpenIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

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
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { EditRecruiterForm } from "./edit-recruiter-form";
import { deleteRecruiter } from "@/services/recruiter";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
const RecruiterTableActions = ({ rowData, refresh }) => {

  const {mutate}=useMutation(deleteRecruiter,{
    onSuccess:({data})=>{
      console.log(data);
    }
  })

  function handleDelete(){
    mutate({id:rowData.id});
    toast("Successfully Deleted",{autoClose:2000});
    refresh(true);
  }
  return (
    <div className="flex justify-end gap-2">
      <Link
        to={`/recruiter/${rowData?.id}/details`}
        state={{ recruiterDetails: rowData }}
        // className="hidden h-8 ml-auto lg:flex"
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "hover:bg-muted "
        )}
        title="Detail View"
      >
        <EyeOpenIcon className="w-5 h-5 text-slate-500" />
      </Link>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Pencil1Icon className="w-5 h-5 text-slate-500" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-3">Edit Recruiter</DialogTitle>
            <EditRecruiterForm rowData={rowData} refresh={refresh}/>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <AlertDialog>
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
            <AlertDialogAction variant="destructive" onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RecruiterTableActions;
