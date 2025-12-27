import Rating from "../product/Rating";

const ReviewContainer = ({ setOpen, reviews }) => {
  return (
    <div className="mt-10  mb-6 ">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-medium mb-4  text-gray-600">Reviews</h2>
        <div>
          <button
            onClick={() => setOpen(true)}
            className="border  cursor-pointer rounded-full  px-4 py-2 shadow"
          >
            Write a review
          </button>
        </div>
      </div>
      <div className="p-2 flex flex-col gap-4 sm:grid grid-cols-2 md:grid-cols-3 ">
        {reviews?.map((review) => {
          return (
            <div
              key={review._id}
              className="px-3 py-6 shadow flex flex-col gap-4"
            >
              <Rating stars={review?.rating} />
              <div>
                <p>{review?.comment}</p>

                <p className="text-md text-gray-600">{review?.name}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewContainer;
