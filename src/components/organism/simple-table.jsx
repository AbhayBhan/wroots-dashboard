import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Spinner from "./spinner";

const getValueFromRow = (row, accessorKey) => {
  if (row && row[accessorKey]) {
    return row[accessorKey];
  }
  return null; // Return null if the key doesn't exist
};
function SimpleTable({
  data,
  columns,
  isLoading,
  selectAllRows,
  toggleRowSelection,
  getIsRowSelected,
  getIsAllRowSelected,
}) {
  // {data?
  //   data.map((row,i)=>{
  //     console.log(i,row)
  //   })
  // :""}
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index}>
                {typeof column.header === "function"
                  ? column.header({
                      table: {
                        data,
                        columns,
                      },
                      selectAllRows,
                      getIsAllRowSelected,
                    })
                  : column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24">
                <div className="flex items-center justify-center w-full">
                  <Spinner />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {data?.length ? (
              data.map((row, rowIndex) => (
                <TableRow key={rowIndex} className="hover:bg-muted-light">
                  {columns.map((column, colIndex) => (
                    <TableCell key={colIndex}>
                      {typeof column.cell === "function"
                        ? column.cell({
                            row,
                            rowIndex,
                            toggleRowSelection: toggleRowSelection,
                            getIsRowSelected: typeof getIsRowSelected==Array || Object?getIsRowSelected[rowIndex]:getIsRowSelected,
                            table: { data, columns },
                            getValue: (accessorKey) =>
                              getValueFromRow(row, accessorKey),
                          })
                        : row[column.accessorKey]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        )}
      </Table>
    </div>
  );
}
export default SimpleTable;
