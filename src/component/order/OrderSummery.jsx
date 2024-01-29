import { useSelector } from "react-redux";
import { formatPrice } from "../../utils/helper";
import { useNavigate } from "react-router-dom";

const OrderSummery = () => {
  const { items } = useSelector((state) => state.cart);
  const navigate = useNavigate("");

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
    <div className="mt-8 md:col-span-3">
      <h4 className="text-lg font-medium mb-6 tracking-tight sm:text-xl   text-black text-center">
        Order Summery
      </h4>
      <div className="flex flex-col gap-4 p-2 border-t ">
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
          className="text-white bg-[#252323] mt-4  focus:outline-none  font-medium rounded text-sm px-5 py-2.5 text-center  "
          onClick={proceedToPayment}
        >
          Proceed To Payment
        </button>
      </div>
    </div>
  );
};

export default OrderSummery;
