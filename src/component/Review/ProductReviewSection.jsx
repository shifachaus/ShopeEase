import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Rating from "../Product/Rating";
import ReviewContainer from "./ReviewContainer";
import { useNewReviewMutation } from "../../features/products/productApi";

const DUMMY_REVIEWS = {
  reviews: [
    {
      _id: "demo-1",
      name: "John Doe",
      rating: 4,
      comment: "Amazing product! The product feels well-made.",
      isDummy: true,
    },
    {
      _id: "demo-2",
      name: "Jane Brown",
      rating: 3.5,
      comment: "Very good value for money. Delivery was fast.",
      isDummy: true,
    },

    {
      _id: "demo-3",
      name: "Emily Carter",
      rating: 3,
      comment: "Decent product for the price.",
      isDummy: true,
    },
  ],
};

const ProductReviewSection = ({ reviews, isLoading }) => {
  const { id } = useParams();
  const user = useSelector((store) => store.user);

  const [newReview] = useNewReviewMutation();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const userReview = reviews?.product?.reviews?.find(
    (review) => review.user === user?.user?._id,
  );

  useEffect(() => {
    if (userReview) {
      setComment(userReview.comment);
      setRating(userReview.rating);
    }
  }, [userReview]);

  const submitReview = async () => {
    try {
      await newReview({
        comment,
        rating,
        id,
        productId: reviews?.product?._id,
      }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  const hasReviews =
    Array.isArray(reviews?.product?.reviews) &&
    reviews.product.reviews.length > 0;
  const displayReviews = hasReviews ? reviews?.product : DUMMY_REVIEWS;
  const canSubmitReview = user?.success || user?.data?.success;

  return (
    <div className="my-20 max-w-6xl mx-auto px-4">
      <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 font-body mb-8 md:mb-10">
        Customer Reviews
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <ReviewContainer
            reviews={displayReviews}
            setComment={setComment}
            setRating={setRating}
          />
          {!hasReviews && (
            <p className="text-xs text-gray-800 my-4 ">
              Sample reviews shown for preview. Be the first to review this
              product.
            </p>
          )}
        </div>

        <div className="bg-white border rounded-sm p-6 shadow-sm h-fit">
          <h3 className="text-lg font-semibold mb-6 text-center">
            {userReview ? "Edit Your Review" : "Write a Review"}
          </h3>

          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Rating
            </label>
            <Rating stars={rating} setRate={setRating} />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Comment
            </label>
            <textarea
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 border rounded-sm text-sm outline-none focus:ring-2 focus:ring-gray-900 resize-none"
              placeholder="Share your experience..."
            />
          </div>

          {canSubmitReview && (
            <button
              onClick={submitReview}
              disabled={!!comment.trim() || rating === 0 || isLoading}
              className={`w-full py-2.5 rounded-sm text-sm font-medium text-white transition ${
                comment && rating > 0
                  ? "bg-gray-900 hover:bg-black"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {isLoading ? "Submitting..." : "Submit Review"}
            </button>
          )}

          {!canSubmitReview && (
            <Link
              to="/login"
              className="block text-center w-full py-2.5 rounded-sm text-sm font-medium text-white bg-gray-900 hover:bg-black transition"
            >
              Login to Submit Review
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReviewSection;
