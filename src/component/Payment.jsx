import { formatPrice } from "../utils/helper";

const Payment = ({ orderData }) => {
  return (
    <div className="mb-10">
      <h3 className="text-lg font-medium mb-2 tracking-tight sm:text-xl  text-black ">
        Payment
      </h3>

      <div className="p-4 ">
        <p
          className={
            orderData?.order.paymentInfo &&
            orderData?.order.paymentInfo.status === "succeeded"
              ? "greenColor"
              : "redColor"
          }
        >
          {orderData?.order.paymentInfo &&
          orderData?.order.paymentInfo.status === "succeeded"
            ? "PAID"
            : "NOT PAID"}
        </p>

        <div className="flex gap-2">
          <p>Amount:</p>
          <span>
            {orderData?.order?.totalPrice &&
              formatPrice(orderData?.order?.totalPrice)}
          </span>
          <span className="text-xs text-red-500">*tax included</span>
        </div>
      </div>
    </div>
  );
};

export default Payment;
