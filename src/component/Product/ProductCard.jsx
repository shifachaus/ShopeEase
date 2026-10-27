import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FiShoppingCart, FiMinus, FiPlus, FiCheck } from "react-icons/fi";

import { addItems } from "../../features/carts/cartSlice";
import { formatPrice } from "../../utils/helper";
import Rating from "./Rating";

const ProductCard = ({ singleProductItem, setDisplay, display = 0 }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = singleProductItem?.product || {};

  const {
    _id,
    name,
    price,
    ratings,
    images = [],
    description,
    numOfReviews = 0,
    Stock = 0,
  } = product;

  const stock = Math.max(0, Number(Stock) || 0);
  const unitPrice = Math.max(0, Number(price) || 0);

  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setQty(1);
    setAdded(false);
  }, [_id]);

  useEffect(() => {
    setQty((current) => (stock > 0 ? Math.min(current, stock) : 1));
  }, [stock]);

  const activeIndex = images[display]?.url
    ? display
    : images.findIndex((img) => img?.url);
  const activeImage = images[activeIndex]?.url;

  const optimizedImage = activeImage?.replace(
    "/upload/",
    "/upload/f_auto,q_auto,w_1000/",
  );

  const handleAddToCart = () => {
    if (!_id || stock < 1 || qty < 1 || qty > stock) return;

    dispatch(
      addItems({
        _id,
        product: _id,
        name,
        price: unitPrice,
        image: images?.[0]?.url || "",
        stock,
        qty,
      }),
    );

    setAdded(true);
    navigate("/cart");
  };

  const changeQty = (amount) => {
    setQty((current) => Math.min(stock, Math.max(1, current + amount)));
    setAdded(false);
  };

  return (
    <section className="mx-auto my-8 max-w-7xl sm:my-12">
      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
        {/* Product gallery */}
        <div className="min-w-0">
          <div className="group relative flex aspect-square max-h-[580px] items-center justify-center overflow-hidden rounded-2xl bg-gray-50">
            {optimizedImage ? (
              <img
                key={optimizedImage}
                src={optimizedImage}
                alt={name || "Product"}
                width={800}
                height={800}
                fetchPriority="high"
                className="h-full w-full object-contain p-6 transition-transform duration-500 ease-out group-hover:scale-105 sm:p-10"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <FiShoppingCart size={36} strokeWidth={1.3} />
                <span className="text-sm">Image unavailable</span>
              </div>
            )}

            <span
              className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-semibold ${
                stock > 0
                  ? "bg-white text-green-700 shadow-sm"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {stock > 0 ? "● In stock" : "Out of stock"}
            </span>

            {images.length > 1 && (
              <span className="absolute bottom-4 right-4 rounded-full bg-white/90 px-3 py-1.5 text-xs text-gray-600 shadow-sm">
                {Math.max(0, activeIndex) + 1} / {images.length}
              </span>
            )}
          </div>

          {/* Scrollable thumbnail gallery */}
          {images.filter((img) => img?.url).length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
              {images.map((img, index) => {
                if (!img?.url) return null;

                const thumbnail = img.url.replace(
                  "/upload/",
                  "/upload/f_auto,q_auto,w_180/",
                );

                return (
                  <button
                    key={img._id || img.url}
                    type="button"
                    onClick={() => setDisplay?.(index)}
                    aria-label={`View product image ${index + 1}`}
                    aria-pressed={activeIndex === index}
                    className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-gray-50 p-1.5 transition sm:h-24 sm:w-24 ${
                      activeIndex === index
                        ? "border-gray-900"
                        : "border-transparent hover:border-gray-300"
                    } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2`}
                  >
                    <img
                      src={thumbnail}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Product details */}
        <div className="flex min-w-0 flex-col pt-2 md:pt-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
            Product details
          </p>

          <h1 className="text-3xl font-semibold leading-tight tracking-tight text-gray-950 sm:text-4xl lg:text-[2.75rem]">
            {name || "Unnamed product"}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Rating stars={Number(ratings) || 0} />
            <span className="text-sm font-medium text-gray-700">
              {Number(ratings) > 0 ? Number(ratings).toFixed(1) : "New"}
            </span>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-gray-500">
              {Number(numOfReviews) || 0}{" "}
              {(Number(numOfReviews) || 0) === 1 ? "review" : "reviews"}
            </span>
          </div>

          <div className="mt-7 border-b border-gray-100 pb-6">
            <p className="text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
              {formatPrice(unitPrice)}
            </p>
            <p className="mt-1.5 text-sm text-gray-500">Price per item</p>
          </div>

          <div className="py-6">
            <p className="whitespace-pre-line text-sm leading-7 text-gray-600 sm:text-base">
              {description || "No description available for this product yet."}
            </p>
          </div>

          {stock > 0 && stock <= 5 && (
            <div className="mb-5 flex items-center gap-2 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
              <span className="h-2 w-2 shrink-0 rounded-full bg-amber-500" />
              <span>
                Only <strong>{stock}</strong> {stock === 1 ? "item" : "items"}{" "}
                left — order soon.
              </span>
            </div>
          )}

          {/* Quantity selector */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex h-12 items-center rounded-xl border border-gray-200 bg-white">
              <button
                type="button"
                disabled={qty <= 1 || stock < 1}
                onClick={() => changeQty(-1)}
                aria-label="Decrease quantity"
                className="flex h-full w-11 items-center justify-center rounded-l-xl text-gray-700 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-900 disabled:cursor-not-allowed disabled:text-gray-300"
              >
                <FiMinus size={16} />
              </button>

              <span
                aria-live="polite"
                className="min-w-10 text-center text-sm font-semibold tabular-nums"
              >
                {qty}
              </span>

              <button
                type="button"
                disabled={qty >= stock || stock < 1}
                onClick={() => changeQty(1)}
                aria-label="Increase quantity"
                className="flex h-full w-11 items-center justify-center rounded-r-xl text-gray-700 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gray-900 disabled:cursor-not-allowed disabled:text-gray-300"
              >
                <FiPlus size={16} />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!_id || stock < 1 || qty > stock}
              className="flex min-h-full w-full items-center justify-center gap-3 rounded-xl bg-gray-950 px-6 py-4 text-sm font-semibold text-white transition duration-200 hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
            >
              {added ? <FiCheck size={19} /> : <FiShoppingCart size={19} />}
              {stock < 1
                ? "Currently unavailable"
                : added
                  ? "Added to cart"
                  : "Add to cart"}
              {stock > 0 && (
                <span className="hidden lg:block ml-auto font-semibold">
                  {formatPrice(unitPrice * qty)}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
