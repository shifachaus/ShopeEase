import { useDeleteProductReviewMutation } from "../../features/products/productApi";
import Rating from "../Product/Rating";

import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const ReviewContainer = ({ setOpen, reviews }) => {
  const [deleteReview, { isLoading }] = useDeleteProductReviewMutation();

  const handleDelete = async (reviewId) => {
    try {
      await deleteReview({
        id: reviewId,
        productId: reviews?.product?._id,
      }).unwrap();
    } catch (err) {}
  };

  const handleEdit = (review) => {
    setOpen(true);
  };

  return (
    <div className="mt-10 max-w-5xl m-auto">
      <h2 className="text-xl font-medium  text-gray-800 mb-6">Review List</h2>

      <div className="p-2 flex flex-col gap-4 ">
        {reviews?.product?.reviews.map((review) => {
          return (
            <div
              key={review._id}
              className="px-3 py-2 flex  justify-between items-end "
            >
              <div className="">
                <p className="text-sm text-gray-600 mb-4">{review?.name}</p>
                <Rating stars={review?.rating} />
                <p className="text-sm text-gray-800 mt-2">{review?.comment}</p>
              </div>
              <div className="flex gap-2 text-gray-700 cursor-pointer">
                <AiOutlineEdit size={20} onClick={() => handleEdit()} />
                <AiOutlineDelete
                  size={20}
                  onClick={() => handleDelete(review._id)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewContainer;
