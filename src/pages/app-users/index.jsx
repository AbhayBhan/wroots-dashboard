import { AddForm } from "@/components/organism/add-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import UsersTable from "./users-table";

const AppUsers = () => {
  return (
    <div>
      <div className="flex mb-5">
        <h2 className="text-2xl font-bold tracking-tight">App User List</h2>
        
      </div>
      <div className="p-4 mt-4 rounded-md bg-background">
        <UsersTable />``
      </div>
    </div>
  );
};

export default AppUsers;
