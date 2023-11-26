import Pagination from "@/components/organism/pagination";
import SearchFilter from "@/components/organism/search-filter";
import SimpleTable from "@/components/organism/simple-table";
import { getPayouts } from "@/services/Payouts";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

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
    id: "candidateName",
    header: () => <div>Candidate Name</div>,
    cell: ({ getValue, row }) => (
      <div className="flex flex-col ">
        <span className="capitalize">{getValue("candidate")[0].name}</span>
        <span className="text-xs text-muted-foreground">
          {getValue("candidate")[0].phoneNumber}
        </span>
      </div>
    ),
  },
  {
    id: "job",
    header: "Job / Details",
    cell: ({ getValue }) => (
      <div className="flex flex-col">
        <span className="capitalize"> {getValue("candidate")[0].roleName}</span>
        <span className="text-xs text-muted-foreground">
          {getValue("candidate")[0].companyName}
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
            {getValue("candidate")[0].processingStatus[0].referralDueAmount}
          </span>
          {/* <span className="text-xs text-muted-foreground">
            {getValue("processingStatusName")}
          </span> */}
        </div>
      );
    },
  },
  {
    id: "action",
    header: "Status",
    cell: ({ row, getValue }) => {
      return (
        <div className="gap-2 flex_end">
          {getValue("candidate")[0].processingStatus[0].event=='INITIATED'?
          <span
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              `w-full hover:bg-muted bg-green-500`
            )}
            title="Detail View"
          >
            {"SENT"}
          </span>
          :""}
          {getValue("candidate")[0].processingStatus[0].event=='CASHGRAM_REDEEMED'?
          <span
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              `w-full hover:bg-muted bg-yellow-500`
            )}
            title="Detail View"
          >
            {"WITHDRWAN"}
          </span>
          :""}
          {getValue("candidate")[0].processingStatus[0].event=='EXPIRED'?
          <span
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              `w-full hover:bg-muted bg-red-500`
            )}
            title="Detail View"
          >
            {"EXPIRED"}
          </span>
          :""}
        </div>
      );
    },
  },
];

const PayoutCompletedTable = () => {
  const [filterTerm, setFilterTerm] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData]=useState({});
  const [isLoading, setIsLoading]=useState(true);

  // const { data, isLoading } = useQuery({
  //   queryFn: () => getPayouts(page, "comp"),
  //   queryKey: ["Payouts", "completed", page],
  // });

  const {mutate}=useMutation(getPayouts,{
    onSuccess:({data})=>{
      console.log(data);
      setData(data);
      setIsLoading(false);
    }
  })

  useEffect(()=>{
    setIsLoading(true);
    mutate({page:page, paymentType:"comp"})
  },[])

  useEffect(() => {
    setPage(1);
  }, [filterTerm]);

  const totalPages = Math.ceil(data?.data?.totalItems / 30) || 1;

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
        data={data?.data?.candidates}
        isLoading={isLoading}
      />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default PayoutCompletedTable;
