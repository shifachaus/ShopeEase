import { useEffect, useState } from "react";
import Rating from "../Product/Rating";
import { useNewReviewMutation } from "../../features/products/productApi";
import { useParams } from "react-router-dom";

const ReviewPopup = ({ setOpen, open, userReview, productId }) => {
  const { id } = useParams();
  const [newReview] = useNewReviewMutation();

  const [comment, setComment] = useState(userReview?.comment || "");
  const [rating, setRating] = useState(userReview?.rating || 0);

  const submitReview = async () => {
    try {
      await newReview({ comment, rating, id, productId }).unwrap();
      setComment("");
      setRating(0);
      setOpen(false);
    } catch (err) {
      console.log(err, "REVIEW ERROR");
    }
  };

  useEffect(() => {
    setComment(userReview?.comment || "");
    setRating(userReview?.rating || 0);
  }, [userReview]);

  return (
    <div
      className={`fixed inset-0 z-50  flex items-center justify-center ${
        open ? "block" : "hidden"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm "
        onClick={() => setOpen(false)}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-2xl px-6 py-8  mx-4 md:mx-0">
        <h4 className="text-2xl font-semibold  mb-6 md:text-3xl">
          Write your Review
        </h4>

        <div className="flex flex-col gap-2 mb-2">
          <label className="text-gray-800 font-medium">Rate</label>
          <Rating setRate={setRating} stars={rating} />
        </div>

        <div className="flex flex-col mb-6">
          <label htmlFor="message" className="text-gray-800 font-medium mb-2">
            Review
          </label>
          <textarea
            id="message"
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your thoughts here..."
            className="w-full p-2.5 text-gray-900 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black"
          ></textarea>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setOpen(false)}
            className="px-4 py-2 border border-gray-600 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={submitReview}
            disabled={!comment || rating === 0}
            className={`px-4 py-2 rounded-lg text-white transition ${
              comment && rating > 0
                ? "bg-black hover:bg-gray-800"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPopup;
