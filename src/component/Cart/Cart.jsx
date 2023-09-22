import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../../utils/helper";
import { AiOutlineDelete } from "react-icons/ai";
import { addItems, removeItems } from "../../utils/cartSlice";
import { useState } from "react";
import PageHero from "../PageHero";
import cartImage from "../../assets/cart.png";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const user = useSelector((store) => store.user);
  // console.log(user?.success);
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

      <div className="mx-auto max-w-6xl  my-10   p-6 lg:px-8 md:h-screen">
        {cartItems?.length === 0 ? (
          <div className="max-w-sx flex flex-col items-center  p-3  w-full h-screen">
            <h2 className="mb-4 text-2xl md:text-3xl tracking-tight font-medium ">
              Your Cart is Empty
            </h2>
            <p className="mb-4 text-lg font-light text-gray-500">
              Looks like you haven't added anything to your cart yet
            </p>
            <img src={cartImage} alt="cart image" />
            <Link
              to="/"
              className=" border-b-2 border-black inline-flex items-center gap-2 text-black bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium  text-sm px-1 py-1 text-center  my-4"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div
            className={`flex flex-col gap-10 md:grid md:grid-flow-col ${
              cartItems?.length === 1 && "h-screen"
            }`}
          >
            <div className="col-span-8">
              <div className="hidden items-center gap-8  border-b  py-4 px-2 grid-cols-3  md:grid text-sm tracking-widest mt-10    text-gray-500 uppercase">
                <p className="text-md  uppercase">PRODUCT DETAILS</p>
                <p className="text-md  uppercase">Quantity</p>
                <p className="text-md  uppercase">Price</p>
              </div>
              <div className="flex flex-col gap-4  ">
                {cartItems?.map((item) => {
                  console.log(item);
                  return (
                    <div
                      key={item?._id}
                      className="flex items-center
                       md:grid md:grid-cols-3 md:items-center gap-4 py-4 px-2"
                    >
                      <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2 sm:items-center">
                        <img
                          src={item?.image}
                          alt="image"
                          className="w-40 h-40   cursor-pointer rounded "
                        />
                        <p className="hidden md:block text-gray-500">
                          {item?.name}
                        </p>
                      </div>

                      <div className="flex flex-col gap-3">
                        <p className="md:font-medium text-md md:hidden text-gray-500">
                          {item?.name}
                        </p>
                        <div className="flex gap-4  items-center">
                          <button
                            className="text-lg font-medium cursor-pointer"
                            onClick={() => removeQty(item)}
                          >
                            -
                          </button>
                          <p className="text-md font-medium bg-black text-white px-2 ">
                            {item?.qty}
                          </p>
                          <button
                            className="text-lg font-medium cursor-pointer"
                            onClick={() => addQty(item)}
                          >
                            +
                          </button>
                        </div>
                        <div className="md:hidden flex flex-col items-end sm:grid sm:grid-cols-2">
                          <p className="text-md font-bold">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                      </div>
                      <div className="hidden   md:flex md:flex-col">
                        <p className="text-md font-medium text-gray-500">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-4  md:mt-10 md:col-span-4">
              <h2 className=" text-xl ">Cart Totals</h2>

              <div className="md:w-80 bg-gray-100">
                <div className=" flex flex-col  gap-4 rounded p-5 h-fit">
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
                className="border border-[#252323] mt-2 mb-8 text-center py-1 px-4 bg-[#252323] "
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
