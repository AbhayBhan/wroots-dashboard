import Pagination from "@/components/organism/pagination";
import SearchFilter from "@/components/organism/search-filter";
import SimpleTable from "@/components/organism/simple-table";
import Spinner from "@/components/organism/spinner";
import { Button } from "@/components/ui/button";
import { approveAPayout, getPayouts } from "@/services/Payouts";
import { useMutation, useQuery } from "@tanstack/react-query";
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
    cell: ({ getValue }) => (
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
          <span className="capitalize">{getValue("referralDueAmount")}</span>
          <span className="text-xs text-muted-foreground">
            {getValue("processingStatusName")}
          </span>
        </div>
      );
    },
  },
  {
    id: "action",
    header: "",
    cell: ({ getValue }) => {
      return (
        <div className="gap-2 flex_end">
          <IssuePayout
            cphId={getValue("cphId")}
            phoneNumber={getValue("phoneNumber")}
            email={getValue("email")}
            name={getValue("name")}
            amount={getValue("referralDueAmount")}
            candidateId={getValue("candidateId")}
          />
        </div>
      );
    },
  },
];

const PayoutDueTable = () => {
  const [filterTerm, setFilterTerm] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData]=useState([]);
  const [isLoading, setIsLoading]=useState(true);

  // const { data, isLoading } = useQuery({
  //   queryFn: () => getPayouts(page, "due"),
  //   queryKey: ["Payouts", "due", page],
  // });

  const {mutate}=useMutation(getPayouts,{
    onSuccess:({data})=>{
      console.log(data);
      setData(data);
      setIsLoading(false);
    },
    onError:(err)=>{
      console.log(err)
    }
  })

  useEffect(() => {
    setPage(1);
  }, [filterTerm]);

  useEffect(()=>{
    setIsLoading(true);
    mutate({page:page,paymentType:"due"});
  },[])

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
        data={data?.data?.candidates}
        isLoading={isLoading}
      />
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

const IssuePayout = (data) => {
  const { mutate, isLoading } = useMutation(approveAPayout);

  const handleClick = () => {
    mutate({
      cphId: data.cphId,
      phoneNumber: data.phoneNumber,
      email: data.email,
      name: data.name,
      amount: data.amount,
      candidateId: data.candidateId,
    });
  };

  return (
    <Button size="sm" disabled={isLoading} onClick={handleClick}>
      {isLoading ? <Spinner className="text-white" /> : "Issue Payout"}
    </Button>
  );
};

export default PayoutDueTable;
