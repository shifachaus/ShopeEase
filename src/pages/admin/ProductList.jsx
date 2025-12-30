import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetAdminProductsQuery,
} from "../../features/products/productApi";
import { useTable } from "react-table";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import Table from "../../component/ui/Table";

const ProductList = () => {
  const { data: productData } = useGetAdminProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const products = productData ? productData?.products : [];

  const deleteProductHandler = async (id) => {
    try {
      await deleteProduct(id).unwrap();
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
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Stock",
      accessor: "Stock",
    },
    {
      Header: "Price",
      accessor: "price",
    },

    {
      Header: "ACTION",
      accessor: "Action",
      Cell: ({ row }) => {
        return (
          <div className="flex gap-2 ">
            <Link to={`/admin/product/${row?.original?._id}`}>
              <FiEdit2 className="text-lg hover:text-[#688272]" />
            </Link>
            <button onClick={() => deleteProductHandler(row?.original?._id)}>
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
      data: products,
    });

  return (
    <section>
      <div className="p-6 md:ml-20 lg:ml-64  ">
        <div className="mx-auto max-w-7xl p-6 lg:px-8 ">
          <div className=" p-2 ">
            <h2 className="text-xl font-medium mb-6 tracking-tight sm:text-2xl  text-black text-center ">
              ALL PRODUCTS
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

export default ProductList;
