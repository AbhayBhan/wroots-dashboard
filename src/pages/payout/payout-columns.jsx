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
    accessorKey: "id",
    header: "Transaction Id",
    cell: ({ row }) => <span className="capitalize">{row.getValue("id")}</span>,
  },
  {
    accessorKey: "recipient",
    header: "Recipient",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("recipient")}</span>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => <span>${row.getValue("amount")}</span>,
  },
  {
    accessorKey: "status",
    header: "Latest Status",
    cell: ({ row }) => {
      const status = row.getValue("status");
      const status_ref = {
        Sent: "bg-emerald-500",
        Withdraw: "bg-red-500",
        "Sent & Expired": "bg-orange-500",
      };
      return (
        <Badge className={`${status_ref[status]} capitalize`}>{status}</Badge>
      );
    },
  },
];
