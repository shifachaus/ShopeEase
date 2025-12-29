import { Link } from "react-router-dom";
import ReviewPopup from "./ReviewPopup";
import ReviewContainer from "./ReviewContainer";
import { useState } from "react";
import { useSelector } from "react-redux";

const ProductReviewSection = ({ reviews }) => {
  const [open, setOpen] = useState(false);
  const user = useSelector((store) => store.user);

  const userReview = reviews?.product?.reviews?.find((review) => {
    return review.user === user.user?._id;
  });

  return (
    <div className="mt-20 ">
      <div className="flex flex-col items-center ">
        <h2 className="text-xl font-medium mb-4 text-black">
          Review this product
        </h2>
        <p className="text-base mb-2 text-gray-800">
          Share your thoughts with other customers
        </p>

        {!userReview && (
          <>
            {user?.success || user?.data?.success ? (
              <button
                onClick={() => setOpen(true)}
                className="border  cursor-pointer rounded-xl  px-4 py-2 shadow"
              >
                Write a product review
              </button>
            ) : (
              <Link
                to={"/login"}
                className="border cursor-pointer rounded-xl  px-4 py-2 shadow "
              >
                <p className="text-lg font-medium"> Write a product review</p>
              </Link>
            )}
          </>
        )}
      </div>

      <ReviewPopup
        setOpen={setOpen}
        open={open}
        editReview={reviews?.product?.reviews}
        productId={reviews?.product._id}
        userReview={userReview}
      />
      <ReviewContainer setOpen={setOpen} reviews={reviews} />
    </div>
  );
};

export default ProductReviewSection;
