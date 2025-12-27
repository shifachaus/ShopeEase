import { useEffect, useState } from "react";
import {
  useDeleteProductReviewMutation,
  useLazyGetAllProductsReviewsQuery,
} from "../../features/products/productApi";
import { useMemo } from "react";
import { useTable } from "react-table";
import { AiOutlineDelete } from "react-icons/ai";
import Table from "../../component/ui/Table";

const ProductReviews = () => {
  const [arrayOfObjects, setArrayOfObjects] = useState([]);
  const [productId, setProductId] = useState("");
  const [getReview, results] = useLazyGetAllProductsReviewsQuery();
  const [deleteProductReview] = useDeleteProductReviewMutation();

  const handleSearch = async () => {
    if (productId.length === 24) await getReview(productId);
  };

  const reviews = results?.data && arrayOfObjects ? arrayOfObjects : [];

  useEffect(() => {
    if (results?.data?.product) {
      const newData = results?.data?.product;
      setArrayOfObjects([newData]);
    }
  }, [results]);

  const deleteReviewHandler = async (productId, id) => {
    try {
      const review = { productId, id };
      const data = await deleteProductReview(review);
      await getReview(productId);
    } catch (err) {
      console.log(err);
    }
  };

  const tableColumn = [
    {
      Header: "ID",
      accessor: (row) => {
        if (row?.reviews) {
          return row?.reviews
            .map((review) => {
              return review?._id;
            })
            .join(", ");
        }
        return "";
      },
    },
    {
      Header: "Name",
      accessor: (row) => {
        if (row.reviews) {
          return row.reviews
            .map((review) => {
              return review.name;
            })
            .join(", ");
        }
        return "";
      },
    },
    {
      Header: "Comment",
      accessor: (row) => {
        if (row?.reviews) {
          return row?.reviews
            .map((review) => {
              return review?.comment;
            })
            .join(", ");
        }
        return "";
      },
    },
    {
      Header: "Rating",
      accessor: (row) => {
        if (row?.reviews) {
          return row?.reviews
            .map((review) => {
              return review?.rating;
            })
            .join(", ");
        }
        return "";
      },
    },

    {
      Header: "ACTION",
      accessor: "Action",
      Cell: ({ row }) => {
        return (
          <div>
            {row.original.reviews.map((review, index) => (
              <div key={index}>
                <button
                  onClick={() =>
                    deleteReviewHandler(row?.original?._id, review._id)
                  }
                >
                  <AiOutlineDelete className="text-lg hover:text-[#688272]" />
                </button>
              </div>
            ))}
          </div>
        );
      },
    },
  ];

  const columns = useMemo(() => tableColumn, []);

  const { getTableBodyProps, getTableProps, rows, headerGroups, prepareRow } =
    useTable({
      columns: columns,
      data: reviews,
    });

  return (
    <section>
      <div className="p-4 sm:ml-64 ">
        <div className="mx-auto max-w-7xl p-6 lg:px-8 ">
          <div className=" p-2 ">
            <h2 className="text-xl font-medium mb-6 tracking-tight sm:text-2xl  text-black text-center ">
              PRODUCT REVIEWS
            </h2>
          </div>

          <div className="flex flex-col gap-4 mb-8  mx-auto max-w-md  p-6 lg:px-8 ">
            <input
              type="text"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              placeholder="Enter search query"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />

            <button
              className=" bg-[#252323]  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          {results?.data?.success ? (
            <div className="overflow-x-scroll  no-scrollbar shadow-md sm:rounded-lg">
              {results?.data?.product?.reviews.length > 0 ? (
                <Table
                  getTableBodyProps={getTableBodyProps}
                  getTableProps={getTableProps}
                  rows={rows}
                  headerGroups={headerGroups}
                  prepareRow={prepareRow}
                />
              ) : (
                <p className="text-SM font-medium text-[#252323]   p-4">
                  No Reviews{" "}
                </p>
              )}
            </div>
          ) : (
            <p className="text-lg font-medium mb-6 tracking-tight  text-black text-center">
              Search Results...
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductReviews;
