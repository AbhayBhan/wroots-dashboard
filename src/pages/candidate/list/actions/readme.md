https://github.com/shadcn-ui/ui/tree/main/apps/www/app/examples/tasks/components


- Create table component rather then using tanstack table create out own

```javascript
import React from "react";

function Table({ data, columns }) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>
              {typeof column.header === "function"
                ? column.header({ table: { data, columns } })
                : column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td key={colIndex}>
                {typeof column.cell === "function"
                  ? column.cell({ row, table: { data, columns } })
                  : row[column.accessorKey]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Example usage of the Table component
const columns = [
  // ... (your column definitions)
];

const data = [
  // ... (your data array)
];

function App() {
  return (
    <div>
      <h1>Table Component</h1>
      <Table data={data} columns={columns} />
    </div>
  );
}

export default App;

```