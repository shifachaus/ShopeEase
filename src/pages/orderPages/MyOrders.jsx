import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTable } from "react-table";
import {
  FiPackage,
  FiArrowUpRight,
  FiShoppingBag,
  FiAlertCircle,
  FiClock,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

import { useMyOrdersQuery } from "../../features/orders/orderApi";
import Breadcrumb from "../../component/Breadcrumb";
import Table from "../../component/ui/Table";
import { formatPrice } from "../../utils/helper";

const StatusBadge = ({ status }) => {
  const normalizedStatus = status?.toLowerCase();

  const styles = {
    delivered: "bg-green-50 text-green-700 ring-green-600/20",
    shipped: "bg-blue-50 text-blue-700 ring-blue-600/20",
    processing: "bg-amber-50 text-amber-700 ring-amber-600/20",
    pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
    cancelled: "bg-red-50 text-red-700 ring-red-600/20",
  };

  const icons = {
    delivered: FiCheckCircle,
    shipped: FiPackage,
    processing: FiClock,
    pending: FiClock,
    cancelled: FiXCircle,
  };

  const Icon = icons[normalizedStatus] || FiPackage;
  const style =
    styles[normalizedStatus] || "bg-gray-100 text-gray-600 ring-gray-500/20";

  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium capitalize ring-1 ring-inset ${style}`}
    >
      <Icon size={13} />
      {status || "Unknown"}
    </span>
  );
};

const MyOrders = () => {
  const { data: ordersData, isLoading, isError, refetch } = useMyOrdersQuery();

  const orders = ordersData?.orders || [];

  const columns = useMemo(
    () => [
      {
        Header: "Order ID",
        accessor: "_id",
        Cell: ({ value }) => (
          <span className="font-medium text-gray-700">
            #{value?.slice(-8).toUpperCase()}
          </span>
        ),
      },
      {
        Header: "Status",
        accessor: "orderStatus",
        Cell: ({ value }) => <StatusBadge status={value} />,
      },
      {
        Header: "Items",
        accessor: (row) =>
          row.orderItems?.reduce(
            (total, item) => total + Number(item.qty || 0),
            0,
          ) || 0,
        id: "items",
        Cell: ({ value }) => (
          <span className="text-gray-600">
            {value} {value === 1 ? "item" : "items"}
          </span>
        ),
      },
      {
        Header: "Total",
        accessor: "totalPrice",
        Cell: ({ value }) => (
          <span className="font-semibold text-gray-900">
            {formatPrice(value)}
          </span>
        ),
      },
      {
        Header: "Action",
        id: "action",
        Cell: ({ row }) => (
          <Link
            to={`/order/${row.original._id}`}
            aria-label={`View order ${row.original._id}`}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-900 hover:bg-gray-900 hover:text-white"
          >
            Details
            <FiArrowUpRight size={15} />
          </Link>
        ),
      },
    ],
    [],
  );

  const { getTableBodyProps, getTableProps, rows, headerGroups, prepareRow } =
    useTable({
      columns,
      data: orders,
    });

  return (
    <section>
      <Breadcrumb title="Orders" profile />

      <div className="mx-auto min-h-[60vh] max-w-6xl px-4 py-8 sm:px-6 md:px-10 lg:px-14">
        {/* Heading */}
        <div className="mb-8 flex items-center gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
              My Orders
            </h1>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
            <div
              className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900"
              role="status"
              aria-label="Loading orders"
            />
            <p className="mt-4 text-sm text-gray-500">Loading your orders...</p>
          </div>
        )}

        {/* Error */}
        {!isLoading && isError && (
          <div className="rounded-xl border border-red-100 bg-red-50 p-8 text-center">
            <FiAlertCircle className="mx-auto text-red-500" size={30} />
            <h2 className="mt-3 font-semibold text-gray-900">
              Unable to load orders
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please check your connection and try again.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="mt-5 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && orders.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-14 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-500">
              <FiPackage size={30} />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-gray-900">
              No orders yet
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
              Your orders will appear here once you've made your first purchase.
            </p>

            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              <FiShoppingBag size={17} />
              Start shopping
            </Link>
          </div>
        )}

        {/* Orders table */}
        {!isLoading && !isError && orders.length > 0 && (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <Table
                getTableBodyProps={getTableBodyProps}
                getTableProps={getTableProps}
                rows={rows}
                headerGroups={headerGroups}
                prepareRow={prepareRow}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyOrders;
