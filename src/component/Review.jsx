import { useState } from "react";
import Rating from "./Rating";
import { useNewReviewMutation } from "../utils/productApi";
import { useParams } from "react-router-dom";

const Review = ({ setOpen, open }) => {
  const { id } = useParams();
  const [newReview] = useNewReviewMutation();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const submitReview = async () => {
    try {
      const review = { comment, rating, id };
      const data = await newReview(review);
      console.log(data, "SUCCESS");
      setOpen(false);
    } catch (err) {
      console.log(err, "REVIEW ERROR");
    }
  };
  return (
    <div
      className={
        open
          ? "flex flex-col gap-3 m-auto fixed top-0 left-0 right-0 z-50 h-screen w-screen  p-4 overflow-x-hidden overflow-y-auto  max-h-full backdrop-blur-sm"
          : //   "flex flex-col gap-3 m-auto  rounded fixed h-screen w-screen place-items-center bg-opacity-60  backdrop-blur-sm  z-[999] transition-opacity duration-300"
            "hidden opacity-0 "
      }
    >
      <div className="bg-[#f5f1ed]  px-4 py-8 fixed top-0 left-0 right-0 z-50 h-screen w-screen  p-4 overflow-x-hidden">
        <div className="p-3 w-6/12 md:w-[400px] m-auto flex flex-col gap-4">
          <h2 className="text-xl font-medium text-[#252323] mb-6 text-center">
            Rate and Review
          </h2>
          <div className="flex flex-col gap-2">
            <h2 className="text-md font-medium text-gray-500 ">Rate</h2>
            <Rating setRate={setRating} stars={rating} />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-500"
            >
              Review
            </label>
            <textarea
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              id="message"
              rows="4"
              className="block p-2.5 w-full  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-900 outline-0 "
              placeholder="Write your thoughts here..."
            ></textarea>
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={() => setOpen(false)}
              className="block mb-2 text-sm font-medium text-gray-600  border border-black px-3 py-1"
            >
              Cancel
            </button>
            <button
              onClick={() => submitReview()}
              className="block mb-2 text-sm font-medium text-white bg-black px-3 py-1 "
            >
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
