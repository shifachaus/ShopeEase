import {
  useAllOrdersQuery,
  useDeleteOrderMutation,
} from "../../features/orders/orderApi";
import { useMemo } from "react";
import { useTable } from "react-table";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import Table from "../../component/ui/Table";

const OrderList = () => {
  const { data: orderData, error, isLoading, refetch } = useAllOrdersQuery();
  console.log(orderData?.orders);
  const [deleteOrder] = useDeleteOrderMutation();

  const orders = orderData ? orderData?.orders : []; // Extract the data array

  const deleteOrderHandler = async (id) => {
    try {
      const data = await deleteOrder(id);
      refetch();
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
        return (
          <div className="flex gap-2">
            <Link to={`/admin/order/${row?.original?._id}`}>
              <FiEdit2 className="text-lg hover:text-[#688272]" />
            </Link>
            <button onClick={() => deleteOrderHandler(row?.original?._id)}>
              <AiOutlineDelete className="text-lg hover:text-[#688272]" />
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
      <div className="p-6 md:ml-20 lg:ml-64  ">
        <div className="mx-auto max-w-7xl p-6 lg:px-8 ">
          <div className=" p-2 ">
            <h2 className="text-xl font-medium mb-6 tracking-tight sm:text-2xl  text-black text-center ">
              ALL ORDERS
            </h2>
          </div>

          <Table
            getTableBodyProps={getTableBodyProps}
            getTableProps={getTableProps}
            rows={rows}
            headerGroups={headerGroups}
            prepareRow={prepareRow}
          />
        </div>
      </div>
    </section>
  );
};

export default OrderList;
