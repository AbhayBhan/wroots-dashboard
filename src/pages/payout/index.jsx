import React from "react";
import PayoutTable from "./payout-table";

const Payout = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight mb-5">Payout List</h2>
      <div className="rounded-md p-5 bg-background">
        <PayoutTable />
      </div>
    </div>
  );
};

export default Payout;
