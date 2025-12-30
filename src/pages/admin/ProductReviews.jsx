import { useState } from "react";
import {
  useDeleteProductReviewMutation,
  useLazyGetAllProductsReviewsQuery,
} from "../../features/products/productApi";
import { useMemo } from "react";
import { useTable } from "react-table";
import { AiOutlineDelete } from "react-icons/ai";
import Table from "../../component/ui/Table";

const ProductReviews = () => {
  const [productId, setProductId] = useState("");

  const [getReview, { data, isFetching, isError }] =
    useLazyGetAllProductsReviewsQuery();

  const [deleteProductReview, { isLoading: deleting }] =
    useDeleteProductReviewMutation();

  const handleSearch = async () => {
    if (productId.length === 24) {
      await getReview(productId);
    }
  };

  const deleteReviewHandler = async (productId, id) => {
    await deleteProductReview({ productId, id });
    await getReview(productId);
  };

  const reviews = data?.product ? [data.product] : [];

  const tableColumn = [
    {
      Header: "ID",
      accessor: (row) => row?.reviews?.map((r) => r._id).join(", ") || "",
    },
    {
      Header: "Name",
      accessor: (row) => row?.reviews?.map((r) => r.name).join(", ") || "",
    },
    {
      Header: "Comment",
      accessor: (row) => row?.reviews?.map((r) => r.comment).join(", ") || "",
    },
    {
      Header: "Rating",
      accessor: (row) => row?.reviews?.map((r) => r.rating).join(", ") || "",
    },
    {
      Header: "Action",
      Cell: ({ row }) => (
        <div className="flex gap-2 flex-wrap">
          {row.original.reviews?.map((review, i) => (
            <button
              key={i}
              disabled={deleting}
              onClick={() => deleteReviewHandler(row.original._id, review._id)}
              className="p-1 text-red-600 hover:text-red-700 disabled:opacity-50"
            >
              <AiOutlineDelete className="text-lg" />
            </button>
          ))}
        </div>
      ),
    },
  ];

  const columns = useMemo(() => tableColumn, []);
  const { getTableBodyProps, getTableProps, rows, headerGroups, prepareRow } =
    useTable({ columns, data: reviews });

  return (
    <section className="min-h-screen">
      <div className="p-6 md:ml-20 lg:ml-64">
        <div className="mx-auto max-w-7xl p-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Product Reviews
          </h2>

          {/* Search Box Card */}
          <div className="max-w-md mx-auto mb-10 bg-white border rounded-2xl shadow p-6">
            <label className="text-sm font-medium">Product ID</label>

            <input
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="Enter 24-character Product ID"
              className="w-full mt-2 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-black outline-none"
            />

            <button
              onClick={handleSearch}
              disabled={productId.length !== 24 || isFetching}
              className="mt-4 w-full bg-black text-white py-2.5 rounded-lg font-semibold disabled:opacity-50"
            >
              {isFetching ? "Searching…" : "Search Reviews"}
            </button>

            {productId && productId.length !== 24 && (
              <p className="text-xs text-red-500 mt-2">
                Product ID must be 24 characters
              </p>
            )}
          </div>

          {/* Results Card */}
          <div className="bg-white border rounded-2xl shadow overflow-hidden">
            {!data && !isFetching && (
              <p className="p-6 text-center text-gray-500">
                Enter a Product ID to view reviews
              </p>
            )}

            {isError && (
              <p className="p-6 text-center text-red-500">
                Failed to load reviews. Try again.
              </p>
            )}

            {data?.product?.reviews?.length === 0 && (
              <p className="p-6 text-center text-gray-600">
                No reviews found for this product
              </p>
            )}

            {data?.product?.reviews?.length > 0 && (
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
      </div>
    </section>
  );
};

export default ProductReviews;
