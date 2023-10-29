import { useNavigate } from "react-router-dom";
import { addItems } from "../../utils/cartSlice";
import { formatPrice } from "../../utils/helper";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Rating from "./Rating";
import Review from "./Review";

const Product = ({ displayImage, singleProductItem, setDisplay, display }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState(false);

  const {
    name,
    price,
    ratings,
    reviews,
    images,
    description,
    category,
    numOfReviews,
    Stock,
  } = singleProductItem?.product;

  const onAddToCart = () => {
    dispatch(
      addItems({
        _id: singleProductItem.product._id,
        product: singleProductItem.product._id,
        name: singleProductItem.product.name,
        price: singleProductItem.product.price,
        image: singleProductItem.product.images[0].url,
        stock: singleProductItem.product.Stock,
        qty,
      })
    );
    navigate("/cart");
  };

  const removeQty = () => {
    if (qty === 1) {
      setQty(1);
    } else {
      setQty((oldAmount) => {
        return oldAmount - 1;
      });
    }
  };

  const addQty = () => {
    if (qty >= Stock) return;
    setQty((oldAmount) => oldAmount + 1);
  };

  return (
    <section className="my-10">
      <div className="grid grid-cols-1 gap-6 md:gap-[6rem] md:grid-cols-2">
        <div className="flex flex-col gap-6 ">
          <div className="bg-gray-100   ">
            <img
              src={images?.[display]?.url}
              alt="product_image"
              className="h-full w-full border object-cover object-center p-8 mix-blend-darken xl:h-full "
            />
          </div>

          <div className="grid grid-cols-5 gap-2">
            {images?.map((img, index) => (
              <img
                src={img.url}
                alt="image"
                key={img._id}
                className={`${
                  display === index && "border-2 border-[#688272]"
                } object-cover object-center h-10 w-10 sm:h-20 sm:w-20 cursor-pointer rounded bg-gray-100`}
                onClick={() => setDisplay(index)}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 mt-10 md:mt-0">
          <div>
            {Stock > 0 ? (
              <span className="  rounded border border-green-500 px-4 py-2 text-center text-xs font-medium capitalize text-green-500 ">
                In stock
              </span>
            ) : (
              <span className="  rounded border  border-red-300 px-4 py-2 text-xs font-medium capitalize text-red-300 ">
                Out of stock
              </span>
            )}
          </div>
          <div className="flex flex-col gap-3 mt-6">
            <h2 className="capitalize  text-2xl md:text-3xl lg:text-4xl font-medium ">
              {name}
            </h2>

            <div className="flex gap-2   space-x-2  text-sm hover:cursor-pointer">
              <div className="flex border-r-2 border-black pr-2  font-semibold ">
                <Rating stars={ratings} />
              </div>

              <p className="text-gray-500">{reviews.length} Reviews</p>
            </div>
          </div>

          <p className="font-medium text-xl md:text-2xl ">
            {formatPrice(price)}
          </p>

          <p className="mb-4 text-md font-light text-gray-500">{description}</p>

          <div className="flex flex-col gap-4  mb-4 w-1/3">
            <div className="flex gap-4 justify-center mb-4">
              <button
                className="text-3xl font-medium cursor-pointer"
                onClick={() => removeQty()}
              >
                -
              </button>
              <p className="text-4xl font-bold">{qty}</p>
              <button
                className="text-3xl font-medium cursor-pointer"
                onClick={() => addQty()}
              >
                +
              </button>
            </div>
            <button
              onClick={() => onAddToCart()}
              disabled={Stock < 1 ? true : false}
              className="w-40 sm:w-60  bg-[#252323] hover:bg-[#688272]  p-2 px-4 cursor-pointer  text-white border border-[#252323] hover:border-[#828D91]  hover:shadow-md uppercase "
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <div>
        <Review setOpen={setOpen} open={open} />

        <div className="mt-10  mb-6 ">
          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-medium mb-4  text-gray-600">
              Reviews
            </h2>
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
      </div>
    </section>
  );
};

export default Product;
