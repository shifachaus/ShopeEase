import CheckoutStep from "../component/CheckoutStep";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useRef } from "react";
import { formatPrice } from "../utils/helper";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useNewOrderMutation } from "../utils/orderApi";

const Payment = () => {
  const [newOrder] = useNewOrderMutation();

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const payBtn = useRef(null);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { items } = useSelector((state) => state.cart);
  const shippingInfo = useSelector((state) => state.cart.shippingInfo);
  const { user } = useSelector((store) => store.user);

  const paymentData = {
    amount: orderInfo?.totalPrice,
  };

  const order = {
    shippingInfo,
    orderItems: items,
    itemsPrice: orderInfo?.subTotal,
    taxPrice: orderInfo?.tax,
    shippingPrice: orderInfo?.shippingCharges,
    totalPrice: orderInfo?.totalPrice,
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };
      const { data } = await axios.post(
        "https://shopease-backend.onrender.com/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data?.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user?.name,
            email: user?.email,
            address: {
              line1: shippingInfo?.address,
              city: shippingInfo?.city,
              state: shippingInfo?.state,
              postal_code: shippingInfo?.pinCode,
              country: shippingInfo?.country,
            },
          },
        },
      });

      if (result?.error) {
        payBtn.current.disabled = false;
        alert(result?.error?.message);
      } else {
        if (result?.paymentIntent?.status === "succeeded") {
          order.paymentInfo = {
            id: result?.paymentIntent?.id,
            status: result?.paymentIntent?.status,
          };

          const data = await newOrder(order);
          navigate("/success");
        } else {
          alert("There's some issue while processing payment");
        }
      }
    } catch (err) {
      console.log(err);
      payBtn.current.disabled = false;
      alert(err.response.data.message);
    }
  };

  return (
    <div className="mx-auto max-w-7xl  p-6 lg:px-8">
      <CheckoutStep activeStep={2} />
      <div className="max-w-md mt-10 md:mt-20 mx-auto h-screen">
        <h2 className="text-xl font-medium mb-2 text-center   tracking-tight sm:text-2xl  text-black  ">
          Card Info
        </h2>
        <form
          className="px-5 pt-4 pb-8 flex flex-col gap-4"
          onSubmit={(e) => handlePayment(e)}
        >
          <div className="flex flex-col gap-2">
            <div>
              <CardNumberElement className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div>
              <CardExpiryElement className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div>
              <CardCvcElement className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
          </div>
          <input
            type="submit"
            value={`Pay - ${orderInfo && formatPrice(orderInfo?.totalPrice)}`}
            ref={payBtn}
            className="text-white bg-[#252323] mt-4  focus:outline-none  font-medium rounded text-sm px-5 py-2.5 text-center  "
          />
        </form>
      </div>
    </div>
  );
};

export default Payment;
