// Exporting dummy DataTable component for now. Replace with actual implementation.
export function DataTable({ columns, data, onEdit, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.accessorKey}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column.accessorKey}>{row[column.accessorKey]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
