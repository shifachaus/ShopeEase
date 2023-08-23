import { useNavigate } from "react-router-dom";
import { addItems } from "../utils/cartSlice";
import { formatPrice } from "../utils/helper";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Rating from "./Rating";

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
    dispatch(addItems({ ...singleProductItem?.product, qty }));
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

  console.log(singleProductItem?.product, "IMAGE");

  return (
    <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2">
      <div className="flex flex-col gap-6 ">
        <img
          src={images?.[0]?.url}
          alt="image"
          className="w-full h-[300px] object-cover object-center group-hover:opacity-75 bg-gray-100"
        />
        <div className="grid grid-cols-5 gap-2">
          {images?.map((img) => (
            <img
              src={img.url}
              alt="image"
              key={img._id}
              className={`${
                display === img._id && "border-2 border-purple-600"
              } w-full object-cover object-center h-16 cursor-pointer rounded bg-gray-100`}
              onClick={() => setDisplay(img._id)}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="font-bold capitalize text-slate-700 text-4xl ">
          {name}
        </h2>

        <div className="flex gap-2">
          <Rating stars={ratings} />
          <p className="font-normal text-sm">
            {" "}
            ({numOfReviews} customer reviews)
          </p>
        </div>

        <p className="font-medium capitalize text-purple-900 text-sm ">
          {formatPrice(price)}
        </p>

        <p className="text-md text-slate-600 mb-4">{description}</p>

        <div className="flex flex-col max-w-xs gap-4">
          <div className="grid grid-cols-2 ">
            <p className="text-md text-slate-900 font-medium">Available : </p>
            <span className="text-md text-slate-900 ">
              {Stock > 1 ? " In Stock" : "Out of Stock"}
            </span>
          </div>
          <div className="grid grid-cols-2">
            <p className="text-md text-slate-900 font-medium">Brand :</p>
            <span className="text-md text-slate-900 ">
              {singleProductItem?.company}
            </span>
          </div>
        </div>

        <div className="border border-slate-200"></div>
        <div className="flex flex-col gap-4  mb-4 max-w-[150px]">
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
            className="bg-purple-800 p-2 px-4 cursor-pointer rounded text-white border border-purple-800 hover:shadow-md "
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
