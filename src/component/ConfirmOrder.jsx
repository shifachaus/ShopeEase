import React from "react";
import CheckoutStep from "./CheckoutStep";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { formatPrice } from "../utils/helper";

const ConfirmOrder = () => {
  const {
    shippingInfo: { shippingInfo },
    items,
  } = useSelector((state) => state.cart);

  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate("");

  const subTotal = items?.reduce((acc, item) => acc + item.qty * item.price, 0);
  const shippingCharges = subTotal > 1000 ? 0 : 200;
  const tax = subTotal * 0.18;
  const totalPrice = subTotal + tax + shippingCharges;

  // console.log(items);

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = { subTotal, shippingCharges, tax, totalPrice };
    // console.log(data);
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };

  return (
    <div className="mx-auto max-w-7xl  p-6 lg:px-8">
      <CheckoutStep activeStep={1} />

      <div className=" flex flex-col gap-6 md:grid md:grid-flow-col mt-6 ">
        <div className="flex flex-col gap-6 col-span-9 relative">
          <div>
            <h2 className="text-2xl font-medium mb-2  text-gray-600">
              Shipping Info
            </h2>
            <div className="flex flex-col gap-2 p-4">
              <p className="text-md font-medium">
                Name: <span className="text-sm font-normal">{user.name}</span>
              </p>
              <p className="text-md font-medium">
                Phone:{" "}
                <span className="text-sm font-normal">
                  {shippingInfo.phoneNo}
                </span>
              </p>
              <p className="text-md font-medium">
                Address: <span className="text-sm font-normal">{address}</span>
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-medium mb-2  text-gray-600">
              Your Cart Items:
            </h2>

            <div className="mt-6 p-2">
              {items?.map((item) => {
                console.log(item.product, "CONFIRM oRDER");
                return (
                  <div
                    key={item._id}
                    className="grid grid-cols-3 gap-2 items-center"
                  >
                    <img src={item?.image} alt={item.name} />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <p>
                      {item.qty} X {formatPrice(item.price)} ={" "}
                      <b>{formatPrice(item.price * item.qty)}</b>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="md:absolute md:border-r md:border-gray-200 md:w-10 md:h-full md:top-0 md:left-[90%]"></div>
        </div>

        <div className="mt-8 col-span-2">
          <p className="text-2xl font-medium mb-2  text-gray-600 text-center">
            Order Summery
          </p>
          <div className="flex flex-col gap-3 p-2 border-t ">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <span>{formatPrice(subTotal)}</span>
            </div>
            <div className="flex justify-between">
              <p>Shipping Charges</p>
              <span>{formatPrice(shippingCharges)}</span>
            </div>
            <div className="flex justify-between">
              <p>GST</p>
              <span>{formatPrice(tax)}</span>
            </div>
            <div className="flex justify-between  border-t border-black">
              <p>Total</p>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <button
              className=" bg-purple-800 mt-6 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={proceedToPayment}
            >
              Proceed To Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
