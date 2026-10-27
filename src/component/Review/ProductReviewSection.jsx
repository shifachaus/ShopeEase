import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  FiMessageSquare,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";

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

const ProductReviewSection = ({ reviews, isLoading: reviewsLoading }) => {
  const { id } = useParams();
  const user = useSelector((store) => store.user);

  const [newReview, { isLoading: submitting }] = useNewReviewMutation();

  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const product = reviews?.product;
  const actualReviews = product?.reviews || [];

  const userReview = actualReviews.find(
    (review) => review.user === user?.user?._id,
  );

  const canSubmitReview = Boolean(user?.success || user?.data?.success);

  useEffect(() => {
    setComment(userReview?.comment || "");
    setRating(userReview?.rating || 0);
  }, [userReview?.comment, userReview?.rating]);

  const hasReviews = actualReviews.length > 0;

  const displayReviews = hasReviews ? product : DUMMY_REVIEWS;

  const handleSubmitReview = async (event) => {
    event.preventDefault();
    setFeedback(null);

    const trimmedComment = comment.trim();

    if (!trimmedComment) {
      setFeedback({
        type: "error",
        message: "Please write a comment before submitting.",
      });
      return;
    }

    if (rating < 1 || rating > 5) {
      setFeedback({
        type: "error",
        message: "Please select a rating between 1 and 5 stars.",
      });
      return;
    }

    try {
      await newReview({
        comment: trimmedComment,
        rating,
        id,
        productId: product?._id,
      }).unwrap();

      setFeedback({
        type: "success",
        message: userReview
          ? "Your review has been updated successfully."
          : "Thank you! Your review has been submitted.",
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error?.data?.message ||
          "Unable to submit your review. Please try again.",
      });
    }
  };

  return (
    <section className="mx-auto my-16 max-w-6xl px-4 sm:my-20">
      {/* Heading */}
      <div className="mb-8 border-b border-gray-200 pb-5 sm:mb-10">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-800">
            <FiMessageSquare size={21} />
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              Customer Reviews
            </h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-10">
        {/* Reviews list */}
        <div className="min-w-0">
          {reviewsLoading ? (
            <div
              className="animate-pulse space-y-4"
              aria-label="Loading reviews"
            >
              <div className="h-5 w-1/3 rounded bg-gray-200" />
              <div className="h-24 rounded-xl bg-gray-100" />
              <div className="h-24 rounded-xl bg-gray-100" />
            </div>
          ) : (
            <>
              <ReviewContainer
                reviews={displayReviews}
                setComment={setComment}
                setRating={setRating}
              />

              {!hasReviews && (
                <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
                  <p className="text-sm font-medium text-amber-900">
                    Preview reviews
                  </p>
                  <p className="mt-1 text-xs leading-5 text-amber-800">
                    These are sample reviews for demonstration only, not actual
                    customer feedback. Be the first to review this product.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Review form */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              {userReview ? "Edit your review" : "Share your experience"}
            </h3>
          </div>

          {canSubmitReview ? (
            <form onSubmit={handleSubmitReview}>
              {/* Rating */}
              <div className="mb-6">
                <label className="mb-3 block text-sm font-medium text-gray-800">
                  Your rating <span className="text-red-500">*</span>
                </label>

                <Rating stars={rating} setRate={setRating} />

                <p className="mt-2 text-xs text-gray-500">
                  {rating === 0
                    ? "Select a star rating."
                    : `You selected ${rating} out of 5 stars.`}
                </p>
              </div>

              {/* Comment */}
              <div className="mb-5">
                <label
                  htmlFor="review-comment"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Your review <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="review-comment"
                  rows={5}
                  maxLength={500}
                  value={comment}
                  onChange={(event) => {
                    setComment(event.target.value);
                    setFeedback(null);
                  }}
                  placeholder="What did you like or dislike? How was the quality?"
                  required
                  className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm leading-6 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/10"
                />

                <div className="mt-2 flex justify-end gap-3 text-xs text-gray-500">
                  <span className="shrink-0 tabular-nums">
                    {comment.length}/500
                  </span>
                </div>
              </div>

              {/* Feedback */}
              {feedback && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`mb-5 flex items-start gap-2 rounded-lg p-3 text-sm ${
                    feedback.type === "success"
                      ? "bg-green-50 text-green-800"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {feedback.type === "success" ? (
                    <FiCheckCircle className="mt-0.5 shrink-0" size={17} />
                  ) : (
                    <FiAlertCircle className="mt-0.5 shrink-0" size={17} />
                  )}
                  <span>{feedback.message}</span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={
                  submitting || !comment.trim() || rating < 1 || rating > 5
                }
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
              >
                {submitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Submitting review...
                  </>
                ) : (
                  <>
                    <FiSend size={17} />
                    {userReview ? "Update review" : "Submit review"}
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="rounded-xl bg-gray-50 p-5 text-center">
              <p className="text-sm leading-6 text-gray-600">
                Sign in to share your experience and help other shoppers.
              </p>

              <Link
                to="/login"
                className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
              >
                Login to write a review
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductReviewSection;
