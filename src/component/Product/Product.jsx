import { Link, useNavigate } from "react-router-dom";
import { addItems } from "../../features/cart/cartSlice";
import { formatPrice } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Rating from "./Rating";
import ReviewPopup from "../review/ReviewPopup";
import ReviewContainer from "../review/ReviewContainer";

const Product = ({ displayImage, singleProductItem, setDisplay, display }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

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
        <div className="flex flex-col gap-5">
          <div className="bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
            <img
              src={images?.[display]?.url}
              alt={name}
              className="h-[300px] sm:h-[410px]  object-contain p-10 mix-blend-darken transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3">
            {images?.map((img, index) => (
              <button
                key={img._id}
                onClick={() => setDisplay(index)}
                className={`rounded-sm bg-gray-100 p-2 transition border
          ${
            display === index
              ? "border-primary ring-2 ring-primary/40"
              : "border-transparent hover:border-gray-300"
          }`}
              >
                <img
                  src={img.url}
                  alt={`thumb-${index}`}
                  className="h-16 w-16 object-contain mix-blend-darken"
                />
              </button>
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

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold capitalize leading-tight">
            {name}
          </h2>

          <div className="flex items-center gap-3 text-sm">
            <Rating stars={ratings} />
            <span className="text-gray-500">({numOfReviews} reviews)</span>
          </div>

          <p className="text-2xl font-semibold text-gray-900">
            {formatPrice(price)}
          </p>
          <p className="text-gray-500 leading-relaxed">{description}</p>

          <div className="flex gap-4  mb-4  items-center">
            <div className="flex gap-4 justify-center items-center rounded-sm border border-gray-900 py-2 px-4 ">
              <button
                className="font-medium cursor-pointer"
                onClick={() => removeQty()}
              >
                -
              </button>
              <p className="text-sm ">{qty}</p>
              <button
                className=" font-medium cursor-pointer"
                onClick={() => addQty()}
              >
                +
              </button>
            </div>

            <button
              onClick={() => onAddToCart()}
              disabled={Stock < 1 ? true : false}
              className="w-40 sm:w-60 p-2 px-4 cursor-pointer border border-gray-900 hover:shadow-md uppercase hover:bg-gray-900 hover:text-white hover:border-gray-900 transition rounded-sm "
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
