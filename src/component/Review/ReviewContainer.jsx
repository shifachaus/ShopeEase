import Rating from "../product/Rating";

const ReviewContainer = ({ setOpen, reviews }) => {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-medium  text-gray-800">Review List</h2>

      <div className="p-2 flex flex-col gap-4 ">
        {reviews?.map((review) => {
          console.log(review);

          return (
            <div key={review._id} className="px-3 py-2  flex flex-col">
              <p className="text-sm text-gray-600 mb-4">{review?.name}</p>
              <Rating stars={review?.rating} />
              <p className="text-sm text-gray-800 mt-2">{review?.comment}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewContainer;
