import { Link } from "react-router-dom";
import {
  useDeleteProductMutation,
  useGetAdminProductsQuery,
} from "../../utils/productApi";
import Sidebar from "./Sidebar";
import { useMemo } from "react";
import { useTable } from "react-table";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";

const ProductList = () => {
  const {
    data: productData,
    error,
    isLoading,
    refetch,
  } = useGetAdminProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const products = productData ? productData?.products : []; // Extract the data array

  const deleteProductHandler = async (id) => {
    try {
      const data = await deleteProduct(id);
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
        // console.log(row.original._id, "ROW");
        return (
          <div className="flex gap-2 ">
            <Link to={`/admin/product/${row?.original?._id}`}>
              <FiEdit2 className="text-lg hover:text-[#828D91]" />
            </Link>
            <button onClick={() => deleteProductHandler(row?.original?._id)}>
              <AiOutlineDelete className="text-lg hover:text-[#828D91]" />
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
      <Sidebar />
      <main>
        <div className="p-4 sm:ml-64 ">
          <div className="mx-auto max-w-7xl p-6 lg:px-8 ">
            <div className=" p-2 ">
              <h2 className="text-xl font-medium text-[#252323] mb-6 text-center ">
                ALL PRODUCTS
              </h2>
            </div>
            {/* Render your table using the 'rows' and 'headerGroups' */}
            <div className=" shadow-md sm:rounded-lg overflow-x-scroll  no-scrollbar">
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

export default ProductList;
