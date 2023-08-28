import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../utils/helper";
import { AiOutlineDelete } from "react-icons/ai";
import { addItems, removeItems } from "../utils/cartSlice";
import { useState } from "react";
import PageHero from "./PageHero";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const user = useSelector((store) => store.user);
  console.log(user?.success);
  const dispatch = useDispatch();
  const [qty] = useState(1);

  // console.log(cartItems);

  const total = cartItems?.reduce((acc, cur) => {
    return acc + cur.price * cur.qty;
  }, 0);

  // console.log(total, "to");

  const removeQty = (item) => {
    dispatch(removeItems(item));
  };

  const addQty = (item) => {
    dispatch(addItems({ ...item, qty }));
  };
  return (
    <section>
      <PageHero title={"cart"} />

      <div className="mx-auto max-w-6xl  p-6 lg:px-8 ">
        {cartItems?.length === 0 ? (
          <div className="max-w-sx flex flex-col items-center  p-3  w-full h-screen">
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
          <div
            className={`flex flex-col gap-10 ${
              cartItems?.length === 1 && "h-screen"
            }`}
          >
            <div>
              <div className="hidden sm:grid grid-cols-3 items-center gap-8 shadow-sm bg-purple-800 text-white  py-4 px-2">
                <p className="text-md font-medium capitalize">Product</p>
                <p className="text-md font-medium capitalize">Quantity</p>
                <p className="text-md font-medium capitalize">Price</p>
              </div>
              <div className="flex flex-col gap-4  ">
                {cartItems?.map((item) => {
                  console.log(item);
                  return (
                    <div
                      key={item?._id}
                      className="grid grid-cols-3 items-center gap-8 shadow-sm border-b py-4 px-2"
                    >
                      <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2 sm:items-center">
                        <img
                          src={item?.image}
                          alt="image"
                          className="w-24 h-16 object-cover object-center  cursor-pointer rounded "
                        />

                        <p className="text-sm capitalize">{item?.name}</p>
                      </div>
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
                      <div className="flex flex-col items-end sm:grid sm:grid-cols-2">
                        <p className="text-md font-bold">
                          {formatPrice(item.price)}
                        </p>
                        <p className="justify-self-end">
                          <AiOutlineDelete className="text-xl" />
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:items-end ">
              <div className=" sm:w-96 shadow-md">
                <div className=" flex flex-col  gap-4 rounded p-5 h-fit">
                  <h2 className="font-bold text-xl text-center">Cart Totals</h2>
                  <div className=" flex flex-col  gap-2 mb-4">
                    <div className="flex justify-between gap-2 items-center">
                      <p className="font-medium text-md">Subtotals</p>
                      <p className="font-medium text-sm text-slate-600">
                        {" "}
                        {formatPrice(total)}
                      </p>
                    </div>
                    <div className="flex justify-between gap-2 items-center">
                      <p className="font-medium text-md">Total</p>
                      <p className="font-medium text-slate-600 text-sm">
                        {formatPrice(total)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                to={
                  user?.success || user?.data?.success ? "/shipping" : "/login"
                }
                className="border border-purple-800 rounded-md text-center py-1 px-4 bg-purple-800 "
              >
                <p className="text-lg font-medium  text-white">Check Out</p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
