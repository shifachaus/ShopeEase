import React from "react";
import { formatPrice } from "../utils/helper";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CartTotals = ({ total }) => {
  const user = useSelector((store) => store.user);
  return (
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
        to={user?.success || user?.data?.success ? "/shipping" : "/login"}
        className="border border-[#252323] mt-2 mb-8 text-center py-1 px-4 bg-[#252323] "
      >
        <p className="text-lg font-medium  text-white">Check Out</p>
      </Link>
    </div>
  );
};

export default CartTotals;
