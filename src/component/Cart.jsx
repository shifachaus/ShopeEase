import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../utils/helper";
import { AiOutlineDelete } from "react-icons/ai";
import { addItems, removeItems } from "../utils/cartSlice";
import { useState } from "react";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const [qty] = useState(1);

  console.log(cartItems);

  const removeQty = (item) => {
    dispatch(removeItems(item));
  };

  const addQty = (item) => {
    dispatch(addItems({ ...item, qty }));
  };
  return (
    <div className="mx-auto max-w-7xl  p-6 lg:px-8 ">
      {cartItems?.length === 0 ? (
        <div className="max-w-sx flex flex-col items-center  p-3  w-full">
          <h2 className="font-medium text-2xl mb-6 text-slate-700">
            Your Cart is Empty
          </h2>
          <p className="text-sm text-slate-700 mb-4">
            Looks like you haven't added anything to your cart yet
          </p>
          <Link
            to="/"
            className="text-purple-800 font-medium text-md hover:shadow  px-4 py-2 rounded border border-purple-200"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="md:grid md:grid-flow-col flex flex-col gap-4">
          <div className="flex flex-col gap-4  col-span-9">
            {cartItems?.map((item) => {
              return (
                <div
                  key={item.id}
                  className="grid grid-cols-4 items-center gap-4"
                >
                  <img
                    src={item.images[0]?.url}
                    alt="image"
                    className="w-24 h-16 object-cover object-center  cursor-pointer rounded "
                  />
                  <div className="flex gap-4  items-center">
                    <button
                      className="text-lg font-medium cursor-pointer"
                      onClick={() => removeQty(item)}
                    >
                      -
                    </button>
                    <p className="text-md font-bold">{item?.qty}</p>
                    <button
                      className="text-lg font-medium cursor-pointer"
                      onClick={() => addQty(item)}
                    >
                      +
                    </button>
                  </div>
                  <p className="text-md font-bold">{formatPrice(item.price)}</p>
                  <p>
                    <AiOutlineDelete className="text-xl" />
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-4 bg-purple-200 p-5 items-center col-span-3 h-fit">
            <h2 className="font-bold text-xl">Cart Totals</h2>
            <div className="flex flex-col gap-2 mb-4">
              <p className="font-medium text-md">
                Subtotals :{" "}
                <span className="font-medium text-sm text-slate-600">₹00</span>
              </p>
              <p className="font-medium text-md">
                Total :{" "}
                <span className="font-medium text-slate-600 text-sm">₹00</span>
              </p>
            </div>

            <Link
              to={"/checkout"}
              className="border border-gray-700 rounded-md py-1 px-4"
            >
              <p className="text-lg font-medium text-slate-600">Check Out</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
