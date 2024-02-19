import { useNavigate } from "react-router-dom";
import { addItems } from "../../utils/cartSlice";
import { formatPrice } from "../../utils/helper";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Rating from "./Rating";
import ReviewPopup from "../Review/ReviewPopup";
import ReviewContainer from "../Review/ReviewContainer";

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
              style={{ width: "100%" }}
              src={images?.[display]?.url}
              alt={name}
              className="h-full w-full border object-cover object-center p-8 mix-blend-darken "
            />
          </div>

          <div className="grid grid-cols-5 gap-2">
            {images?.map((img, index) => (
              <img
                src={img.url}
                alt={`image-${index + 1}`}
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
              className="w-40 sm:w-60  bg-[#252323]  p-2 px-4 cursor-pointer  text-white border border-[#252323] hover:border-[#828D91]  hover:shadow-md uppercase "
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>

      <div>
        <ReviewPopup setOpen={setOpen} open={open} />

        <ReviewContainer setOpen={setOpen} reviews={reviews} />
      </div>
    </section>
  );
};

export default Product;
