import {
  useAllOrdersQuery,
  useDeleteOrderMutation,
} from "../../utils/orderApi";
import Sidebar from "./Sidebar";
import { useMemo } from "react";
import { useTable } from "react-table";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";

const OrderList = () => {
  const { data: orderData, error, isLoading, refetch } = useAllOrdersQuery();
  console.log(orderData?.orders);
  const [deleteOrder] = useDeleteOrderMutation();

  const orders = orderData ? orderData?.orders : []; // Extract the data array
  // console.log(orders, "DATA");

  const deleteOrderHandler = async (id) => {
    try {
      const data = await deleteOrder(id);
      refetch();
      console.log(data, "DELETE");
    } catch (err) {
      console.log(err);
    }
  };

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
        // console.log(row.original._id, "ROW");
        return (
          <div className="flex gap-2">
            <Link to={`/admin/order/${row?.original?._id}`}>
              <FiEdit2 className="text-lg hover:text-purple-800" />
            </Link>
            <button onClick={() => deleteOrderHandler(row?.original?._id)}>
              <AiOutlineDelete className="text-lg hover:text-purple-800" />
            </button>
          </div>
        );
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
    <section>
      <Sidebar />
      <main>
        <div className="p-4 sm:ml-64 bg-stone-50">
          <div className="mx-auto max-w-7xl p-6 lg:px-8 h-screen">
            <h2 className="text-xl font-medium text-gray-600 mb-6 text-center ">
              ALL ORDERS
            </h2>
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
          </div>
        </div>
      </main>
    </section>
  );
};

export default OrderList;
