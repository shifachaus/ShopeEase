import { useMemo } from "react";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";

import {
  useAllOrdersQuery,
  useDeleteOrderMutation,
} from "../../features/orders/orderApi";
import Table from "../../component/ui/Table";

const OrderList = () => {
  const { data: orderData, error, isLoading } = useAllOrdersQuery();

  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();

  const orders = orderData?.orders ?? [];

  const deleteOrderHandler = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order?",
    );

    if (!confirmed) return;

    try {
      await deleteOrder(id).unwrap();
    } catch (err) {
      console.error("Failed to delete order:", err);
      window.alert(
        err?.data?.message || "Failed to delete order. Please try again.",
      );
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Order ID",
        accessor: "_id",
        Cell: ({ value }) => (
          <span className="font-mono text-xs text-gray-600">{value}</span>
        ),
      },
      {
        Header: "Status",
        accessor: "orderStatus",
        Cell: ({ value }) => {
          const status = value?.toLowerCase();

          const statusStyles =
            status === "delivered"
              ? "bg-green-100 text-green-700"
              : status === "shipped"
                ? "bg-blue-100 text-blue-700"
                : status === "cancelled"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700";

          return (
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${statusStyles}`}
            >
              {value || "Pending"}
            </span>
          );
        },
      },
      {
        Header: "Items",
        accessor: (row) => row.orderItems?.length ?? 0,
      },
      {
        Header: "Amount",
        accessor: "totalPrice",
        Cell: ({ value }) => (
          <span className="font-semibold text-gray-800">
            ₹{(Number(value || 0) / 100).toLocaleString("en-IN")}
          </span>
        ),
      },
      {
        Header: "Actions",
        id: "actions",
        Cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Link
              to={`/admin/order/${row.original._id}`}
              aria-label={`Edit order ${row.original._id}`}
              title="View or edit order"
              className="rounded-lg p-2 text-gray-500 transition hover:bg-green-50 hover:text-green-700"
            >
              <FiEdit2 size={18} />
            </Link>

            <button
              type="button"
              onClick={() => deleteOrderHandler(row.original._id)}
              disabled={isDeleting}
              aria-label={`Delete order ${row.original._id}`}
              title="Delete order"
              className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <AiOutlineDelete size={19} />
            </button>
          </div>
        ),
      },
    ],
    [isDeleting],
  );

  const tableData = useMemo(() => orders, [orders]);

  const { getTableBodyProps, getTableProps, rows, headerGroups, prepareRow } =
    useTable({
      columns,
      data: tableData,
    });

  return (
    <section className="min-h-screen bg-gray-50 p-4 sm:p-6 md:ml-20 lg:ml-64">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-semibold text-gray-900 sm:text-3xl">
              All Orders
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage and track customer orders.
            </p>
          </div>

          <span className="text-sm font-medium text-gray-500">
            {orders.length} {orders.length === 1 ? "order" : "orders"}
          </span>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {isLoading ? (
            <div className="p-10 text-center text-sm text-gray-500">
              Loading orders...
            </div>
          ) : error ? (
            <div className="p-10 text-center text-sm text-red-600">
              Failed to load orders. Please try again.
            </div>
          ) : orders.length === 0 ? (
            <div className="p-10 text-center">
              <p className="font-medium text-gray-800">No orders found</p>
              <p className="mt-1 text-sm text-gray-500">
                Customer orders will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table
                getTableBodyProps={getTableBodyProps}
                getTableProps={getTableProps}
                rows={rows}
                headerGroups={headerGroups}
                prepareRow={prepareRow}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OrderList;
