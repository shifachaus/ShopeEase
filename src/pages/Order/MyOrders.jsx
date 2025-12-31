import { useMemo } from "react";
import { useMyOrdersQuery } from "../../features/orders/orderApi";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import Table from "../../component/ui/Table";
import Breadcrumb from "../../component/Breadcrumb";

const MyOrders = () => {
  const { data: ordersData } = useMyOrdersQuery();

  const orders = ordersData ? ordersData?.orders : [];

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
        return <Link to={`/order/${row?.values?._id}`}>🔗</Link>;
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
      <Breadcrumb title={"Order"} profile={true} />
      <div className="mx-auto max-w-7xl p-6 lg:px-8 h-screen">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
          My Orders
        </h2>

        <Table
          getTableBodyProps={getTableBodyProps}
          getTableProps={getTableProps}
          rows={rows}
          headerGroups={headerGroups}
          prepareRow={prepareRow}
        />
      </div>
    </section>
  );
};

export default MyOrders;
