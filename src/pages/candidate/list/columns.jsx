import { Badge } from "@/components/ui/badge";
import MyCandidateAction from "./actions/mycandidate-action";
import { Checkbox } from "@/components/ui/checkbox";

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
    header: "Name",
    cell: ({ row }) => (
      <div className="flex flex-col ">
        <span className="capitalize">{row.getValue("name")}</span>
        <span className="text-xs text-muted-foreground">
          {row.original["mobile"]}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "referrer_name",
    header: () => <div>Referred by</div>,
    cell: ({ row }) => (
      <div className="flex flex-col ">
        <span className="capitalize">{row.getValue("referrer_name")}</span>
        <span className="text-xs text-muted-foreground">
          {row.original["referrer_contact"]}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "job_role",
    header: () => <div>Category & Role</div>,
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="capitalize">{row.getValue("job_role")}</span>
        <span className="text-xs text-muted-foreground">
          {row.original["job_category"]}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div>Latest Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status");
      const status_ref = {
        Pending: "default",
        Rejected: "destructive",
        Accepted: "success",
      };
      return (
        <div className="capitalize ">
          <Badge variant={status_ref[status]}>{status}</Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return <MyCandidateAction />;
    },
  },
];
