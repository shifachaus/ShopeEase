import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTable } from "react-table";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";

import {
  useDeleteProductMutation,
  useGetAdminProductsQuery,
} from "../../features/products/productApi";

import Table from "../../component/ui/Table";

const ProductList = () => {
  const { data: productData, isLoading, isError } = useGetAdminProductsQuery();

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const products = productData?.products ?? [];

  const deleteProductHandler = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) return;

    try {
      await deleteProduct(id).unwrap();
    } catch (err) {
      console.error("Failed to delete product:", err);
      window.alert(
        err?.data?.message || "Unable to delete product. Please try again.",
      );
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Product ID",
        accessor: "_id",
        Cell: ({ value }) => (
          <span className="font-mono text-xs text-gray-500">{value}</span>
        ),
      },
      {
        Header: "Product Name",
        accessor: "name",
        Cell: ({ value }) => (
          <span className="font-medium text-gray-800">{value}</span>
        ),
      },
      {
        Header: "Stock",
        accessor: "Stock",
        Cell: ({ value }) => {
          const stock = Number(value) || 0;

          return (
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                stock === 0
                  ? "bg-red-100 text-red-700"
                  : stock <= 5
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
              }`}
            >
              {stock === 0
                ? "Out of stock"
                : stock <= 5
                  ? `Low stock (${stock})`
                  : stock}
            </span>
          );
        },
      },
      {
        Header: "Price",
        accessor: "price",
        Cell: ({ value }) => (
          <span className="font-semibold text-gray-800">
            ₹{Number(value || 0).toLocaleString("en-IN")}
          </span>
        ),
      },
      {
        Header: "Actions",
        id: "actions",
        Cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Link
              to={`/admin/product/${row.original._id}`}
              aria-label={`Edit ${row.original.name}`}
              title="Edit product"
              className="rounded-lg p-2 text-gray-500 transition hover:bg-orange-50 hover:text-green-600"
            >
              <FiEdit2 size={18} />
            </Link>

            <button
              type="button"
              onClick={() => deleteProductHandler(row.original._id)}
              disabled={isDeleting}
              aria-label={`Delete ${row.original.name}`}
              title="Delete product"
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

  const tableData = useMemo(() => products, [products]);

  const { getTableBodyProps, getTableProps, rows, headerGroups, prepareRow } =
    useTable({
      columns,
      data: tableData,
    });

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 md:ml-20 lg:ml-64">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              All Products
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your store inventory and product pricing.
            </p>
          </div>

          <span className="text-sm font-medium text-gray-500">
            {products.length} {products.length === 1 ? "product" : "products"}
          </span>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {isLoading ? (
            <div className="p-10 text-center text-sm text-gray-500">
              Loading products...
            </div>
          ) : isError ? (
            <div className="p-10 text-center text-sm text-red-600">
              Failed to load products. Please try again.
            </div>
          ) : products.length === 0 ? (
            <div className="p-10 text-center">
              <p className="font-medium text-gray-800">No products found</p>
              <p className="mt-1 text-sm text-gray-500">
                Your products will appear here when available.
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
    </main>
  );
};

export default ProductList;
