import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import Rating from "../Product/Rating";
import { useDeleteProductReviewMutation } from "../../features/products/productApi";

const ReviewContainer = ({ reviews, setComment, setRating }) => {
  const [deleteReview] = useDeleteProductReviewMutation();
  const user = useSelector((store) => store.user);

  const handleDelete = async (reviewId) => {
    try {
      await deleteReview({
        id: reviewId,
        productId: reviews?._id,
      }).unwrap();
      setComment("");
      setRating(0);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-10 md:mt-0">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Review List</h3>

      <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2">
        {reviews?.reviews?.map((review) => {
          const isOwner = review.user === user?.user?._id;

          return (
            <div key={review._id} className="border rounded-sm p-5 bg-white ">
              <div className="flex items-center mb-2 justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {review.name}
                  </p>
                  <div className="mt-1 ">
                    <Rating stars={review.rating} />
                  </div>
                </div>

                {isOwner && (
                  <div className="text-gray-500">
                    <AiOutlineDelete
                      size={18}
                      className="cursor-pointer hover:text-red-500 transition"
                      onClick={() => handleDelete(review._id)}
                    />
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-700 leading-relaxed">
                {review.comment}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewContainer;
