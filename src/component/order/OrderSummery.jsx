import { useSelector } from "react-redux";
import { formatPrice } from "../../utils/helper";
import { useNavigate } from "react-router-dom";

const OrderSummery = () => {
  const { items } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const subTotal = items?.reduce((acc, item) => acc + item.qty * item.price, 0);
  const shippingCharges = subTotal > 1000 ? 0 : 200;
  const tax = subTotal * 0.18;
  const totalPrice = subTotal + tax + shippingCharges;

  const proceedToPayment = () => {
    const data = { subTotal, shippingCharges, tax, totalPrice };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };

  return (
    <div className=" p-6  shadow-sm md:sticky md:top-20">
      <h4 className="text-xl font-semibold mb-6 text-gray-800 text-center">
        Order Summary
      </h4>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>{formatPrice(subTotal)}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>Shipping Charges</span>
          <span>{formatPrice(shippingCharges)}</span>
        </div>

        <div className="flex justify-between text-gray-600">
          <span>GST (18%)</span>
          <span>{formatPrice(tax)}</span>
        </div>

        <div className="flex justify-between mt-2 pt-2 border-t border-gray-300 font-semibold text-gray-800 text-lg">
          <span>Total</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>

        <button
          onClick={proceedToPayment}
          className="mt-6 w-full py-3 rounded-lg bg-black text-white font-semibold "
        >
          Proceed To Payment
        </button>
      </div>
    </div>
  );
};

export default OrderSummery;
