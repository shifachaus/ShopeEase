import { useNavigate } from "react-router-dom";
import { addItems } from "../../features/carts/cartSlice";
import { formatPrice } from "../../utils/helper";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Rating from "./Rating";

const ProductCard = ({ singleProductItem, setDisplay, display }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const product = singleProductItem?.product || {};

  const { name, price, ratings, images, description, numOfReviews, Stock } =
    product;

  const onAddToCart = () => {
    dispatch(
      addItems({
        _id: product._id,
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0]?.url,
        stock: product.Stock,
        qty,
      }),
    );
    navigate("/cart");
  };

  const removeQty = () => {
    setQty((prev) => Math.max(1, prev - 1));
  };

  const addQty = () => {
    if (qty >= Stock) return;
    setQty((oldAmount) => oldAmount + 1);
  };

  const optimizedImage = images?.[display]?.url?.replace(
    "/upload/",
    "/upload/f_auto,q_auto,w_800/",
  );

  return (
    <section className="my-10">
      <div className="grid grid-cols-1 gap-6 md:gap-[6rem] md:grid-cols-2">
        <div className="flex flex-col gap-5">
          <div className="bg-gray-70 rounded-sm overflow-hidden flex items-center justify-center h-[410px]">
            <img
              src={optimizedImage}
              alt={name}
              width={600}
              height={600}
              className="h-[300px] sm:h-[410px]  object-contain p-10  transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3">
            {images?.map((img, index) => {
              const thumb = img.url.replace(
                "/upload/",
                "/upload/f_auto,q_auto,w_150/",
              );
              return (
                <button
                  key={img._id || index}
                  onClick={() => setDisplay(index)}
                  className={`rounded-sm bg-gray-70 p-2 transition border
          ${
            display === index
              ? "border-primary ring-2 ring-primary/40"
              : "border-transparent hover:border-gray-300"
          }`}
                >
                  <img
                    src={thumb}
                    width={64}
                    height={64}
                    alt={`thumb-${index}`}
                    className="h-16 w-16 object-contain mix-blend-darken"
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-6 mt-10 md:mt-0">
          <div>
            {Stock > 0 ? (
              <span className="  rounded-sm border border-green-500 px-4 py-2 text-center text-xs font-medium capitalize text-green-500 ">
                In stock
              </span>
            ) : (
              <span className="  rounded-sm border  border-red-300 px-4 py-2 text-xs font-medium capitalize text-red-300 ">
                Out of stock
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold capitalize leading-tight">
              {name}
            </h2>

            <div className="flex items-center gap-3 text-sm">
              <Rating stars={ratings} />
              <span className="text-gray-500">({numOfReviews} reviews)</span>
            </div>
          </div>

          <p className="text-2xl font-semibold text-gray-900">
            {formatPrice(price)}
          </p>

          <p className="text-gray-500 leading-relaxed">{description}</p>

          {Stock > 0 && Stock <= 5 && (
            <p className="text-sm text-red-500">Only {Stock} items left!</p>
          )}
          <div className="flex gap-4  mb-4  items-center">
            <div className="flex gap-4 justify-center items-center rounded-sm border border-gray-900 py-2 px-4 ">
              <button
                disabled={qty === 1}
                className="font-medium cursor-pointer disabled:opacity-40"
                onClick={() => removeQty()}
              >
                -
              </button>
              <p className="text-sm ">{qty}</p>
              <button
                disabled={qty >= Stock}
                className="font-medium cursor-pointer disabled:opacity-40"
                onClick={() => addQty()}
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={() => onAddToCart()}
              disabled={Stock < 1}
              className="w-40 sm:w-60 p-2 px-4 cursor-pointer border border-gray-900 hover:shadow-md uppercase bg-gray-900 text-white transition rounded-sm disabled:opacity-40"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
