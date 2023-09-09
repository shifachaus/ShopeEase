import { useMemo } from "react";
import { useMyOrdersQuery } from "../utils/orderApi";
import { useTable } from "react-table";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const { data: ordersData, error, isLoading } = useMyOrdersQuery();
  console.log(ordersData);
  const orders = ordersData ? ordersData?.orders : []; // Extract the data array
  // console.log(orders, "DATA");

  const tableColumn = [
    {
      Header: "ID",
      accessor: "_id",
    },
    {
      Header: "Status",
      accessor: "orderStatus",
    },
    {
      Header: "Items Qty",
      accessor: "orderItems.length",
    },
    {
      Header: "Amount",
      accessor: "totalPrice",
    },
    {
      Header: "ACTION",
      accessor: "Action",
      Cell: ({ row }) => {
        console.log(row.values._id, "ROW");
        return <Link to={`/order/${row.values._id}`}>🔗</Link>;
      },
    },
  ];

  const columns = useMemo(() => tableColumn, []);

  const { getTableBodyProps, getTableProps, rows, headerGroups, prepareRow } =
    useTable({
      columns: columns,
      data: orders,
    });

  return (
    <div className="mx-auto max-w-7xl p-6 lg:px-8 h-screen">
      <h2 className="text-2xl font-medium text-gray-600 mb-6">My Orders</h2>
      {/* Render your table using the 'rows' and 'headerGroups' */}
      <div className=" overflow-x-auto shadow-md sm:rounded-lg">
        <table
          {...getTableProps()}
          className="w-full text-sm text-left text-gray-500 "
        >
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            {headerGroups.map((headerGroup, i) => (
              <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, i) => (
                  <th
                    key={i}
                    {...column.getHeaderProps()}
                    className="px-6 py-3"
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr key={i} {...row.getRowProps()} className="border-b">
                  {row.cells.map((cell, i) => {
                    return (
                      <td
                        key={i}
                        {...cell.getCellProps()}
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
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
    </div>
  );
};

export default MyOrders;
