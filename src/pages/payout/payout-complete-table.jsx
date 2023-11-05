import Pagination from "@/components/organism/pagination";
import SearchFilter from "@/components/organism/search-filter";
import SimpleTable from "@/components/organism/simple-table";
import { getPayouts } from "@/services/Payouts";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const columns = [
  {
    id: "payout_to",
    header: "Payout to",
    cell: ({ getValue }) => (
      <div className="flex flex-col ">
        <span className="capitalize">{getValue("name")}</span>
        <span className="text-xs text-muted-foreground">
          {getValue("phoneNumber")}
        </span>
      </div>
    ),
  },
  {
    id: "candidate_name",
    header: () => <div>Candidate Name</div>,
    cell: ({ getValue, row }) => (
      <div className="flex flex-col ">
        <span className="capitalize">{getValue("candidateName")}</span>
        <span className="text-xs text-muted-foreground">
          {getValue("candidatePhoneNumber")}
        </span>
      </div>
    ),
  },
  {
    id: "job",
    header: "Job / Details",
    cell: ({ getValue }) => (
      <div className="flex flex-col">
        <span className="capitalize"> {getValue("roleName")}</span>
        <span className="text-xs text-muted-foreground">
          {getValue("companyName")}
        </span>
      </div>
    ),
  },
  {
    id: "amount",
    header: "Amount",
    cell: ({ getValue }) => {
      return (
        <div className="flex flex-col">
          <span className="capitalize">
            {getValue("referralDueAmount")}
          </span>
          <span className="text-xs text-muted-foreground">
            {getValue("processingStatusName")}
          </span>
        </div>
      );
    },
  },
  // {
  //   id: "action",
  //   header: "",
  //   cell: ({ row, getValue }) => {
  //     return (
  //       <div className="gap-2 flex_end">
  //         <Link
  //           // to={`/candidate/${row?.id}/details`}
  //           to=""
  //           className={cn(
  //             buttonVariants({ variant: "ghost", size: "icon" }),
  //             "hover:bg-muted "
  //           )}
  //           title="Detail View"
  //         >
  //           <EyeOpenIcon className="w-5 h-5 text-slate-500" />
  //         </Link>
  //       </div>
  //     );
  //   },
  // },
];

const PayoutCompletedTable = () => {
  const [filterTerm, setFilterTerm] = useState("");
  const [page, setPage] = useState(0);

  const { data, isLoading } = useQuery({
    queryFn: () => getPayouts(page, "comp"),
    queryKey: ["Payouts", "completed", page],
  });

  useEffect(() => {
    setPage(0);
  }, [filterTerm]);

  const totalPages = Math.ceil(data?.data?.data?.totalItems / 30) || 1;

  return (
    <div className="w-full">
      <div className="pb-4 flex_between">
        <SearchFilter
          className=""
          onChange={setFilterTerm}
          placeholder="Filter by name..."
        />
      </div>
      <SimpleTable
        columns={columns}
        data={data?.data?.data?.candidates}
        isLoading={isLoading}
      />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default PayoutCompletedTable;
