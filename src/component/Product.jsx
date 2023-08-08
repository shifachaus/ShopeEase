import { useNavigate } from "react-router-dom";
import { addItems } from "../utils/cartSlice";
import { formatPrice } from "../utils/helper";
import { useDispatch } from "react-redux";
import { useState } from "react";

const Product = ({ displayImage, singleProductItem, setDisplay, display }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const onAddToCart = () => {
    // console.log(qty, "qtyll");
    dispatch(addItems({ ...singleProductItem, qty }));
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
    setQty((oldAmount) => oldAmount + 1);
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2">
      <div className="flex flex-col gap-6 ">
        <img
          src={displayImage?.[0]?.url}
          alt="image"
          className="w-full h-[300px] object-cover object-center group-hover:opacity-75 "
        />
        <div className="grid grid-cols-5 gap-2">
          {singleProductItem?.images?.map((img) => (
            <img
              src={img.url}
              alt="image"
              key={img.id}
              className={`${
                display === img.id && "border-2 border-purple-600"
              } w-full object-cover object-center h-16 cursor-pointer rounded`}
              onClick={() => setDisplay(img.id)}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h2 className="font-bold capitalize text-slate-700 text-4xl ">
          {singleProductItem?.name}
        </h2>
        <p className="font-medium capitalize text-purple-900 text-sm ">
          {formatPrice(singleProductItem?.price)}
        </p>

        <p className="text-md text-slate-600 mb-4">
          {singleProductItem?.description}
        </p>

        <div className="flex flex-col max-w-xs gap-4">
          <div className="grid grid-cols-2 ">
            <p className="text-md text-slate-900 font-medium">Available : </p>
            <span className="text-md text-slate-900 ">
              {singleProductItem?.stock ? " In Stock" : "Out of Stock"}
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
