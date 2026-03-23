import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import Rating from "../Product/Rating";
import { useDeleteProductReviewMutation } from "../../features/products/productApi";

const ReviewContainer = ({ reviews, setComment, setRating }) => {
  const [deleteReview, { isLoading }] = useDeleteProductReviewMutation();
  const user = useSelector((store) => store.user);

  const handleDelete = async (reviewId) => {
    const confirmDelete = alert("Are you sure you want to delete this review?");
    if (!confirmDelete) return;

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
    <div>
      <h3 className="text-lg font-semibold text-black mb-4">Review List</h3>

      <div className="flex flex-col gap-4 max-h-[500px]  overflow-y-auto pr-2 scroll-smooth">
        {reviews?.reviews?.map((review) => {
          const isOwner = review.user === user?.user?._id;

          return (
            <div key={review._id} className="border rounded-sm p-5 bg-white ">
              <div className="flex items-center mb-2 justify-between">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-gray-800">
                    {review.name}
                  </p>
                  <Rating stars={review.rating} />
                </div>
                {isOwner && (
                  <div className="text-gray-500">
                    <AiOutlineDelete
                      aria-label="Delete review"
                      role="button"
                      size={18}
                      className={`cursor-pointer transition ${
                        isLoading
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:text-red-500"
                      }`}
                      onClick={() => !isLoading && handleDelete(review._id)}
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
