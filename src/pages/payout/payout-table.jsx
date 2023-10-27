import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { payouts } from "@/data/payout";
import { Badge } from "@/components/ui/badge";

const status_ref = {
  Sent: "bg-emerald-500",
  Withdraw: "bg-red-500",
  "Sent & Expired": "bg-orange-500",
};

const PayoutTable = () => {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Recipient</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Latest Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payouts?.slice(0,10).map((payout) => (
            <TableRow key={payout.id}>
              <TableCell className="font-medium">
                <p className="h-9 flex items-center">{payout.recipient}</p>
              </TableCell>
              <TableCell>${payout.amount}</TableCell>
              <TableCell>{payout.date}</TableCell>
              <TableCell>
                <Badge className={`${status_ref[payout.status]} capitalize`}>
                  {payout.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PayoutTable;
