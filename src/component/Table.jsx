const Table = ({
  getTableBodyProps,
  getTableProps,
  rows,
  headerGroups,
  prepareRow,
}) => {
  return (
    <div className="overflow-x-scroll  no-scrollbar shadow-md sm:rounded-lg">
      <table
        {...getTableProps()}
        className="w-full text-sm text-left text-gray-500 "
      >
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          {headerGroups?.map((headerGroup, i) => (
            <tr key={i} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup?.headers?.map((column, i) => (
                <th key={i} {...column.getHeaderProps()} className="px-6 py-3">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows?.map((row, i) => {
            prepareRow(row);
            return (
              <tr key={i} {...row.getRowProps()} className="border-b">
                {row?.cells.map((cell, i) => {
                  return (
                    <td
                      key={i}
                      {...cell.getCellProps()}
                      className="px-6 py-4  text-gray-900 whitespace-nowrap"
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
