import { formatPrice } from "../../utils/helper";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";

const Payment = ({ orderData }) => {
  const status = orderData?.order?.paymentInfo?.status;
  const isPaid = status === "succeeded";

  return (
    <div className=" p-5 space-y-4">
      {/* Payment Status */}
      <div className="flex items-center gap-2">
        {isPaid ? (
          <FiCheckCircle className="text-green-600 w-5 h-5" />
        ) : (
          <FiAlertCircle className="text-red-600 w-5 h-5" />
        )}

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            isPaid ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {isPaid ? "Paid" : "Not Paid"}
        </span>
      </div>

      {/* Amount Section */}
      <div className="flex items-center gap-2 text-sm text-gray-800">
        <p className="font-medium">Amount:</p>
        <span className="font-semibold">
          {orderData?.order?.totalPrice &&
            formatPrice(orderData?.order?.totalPrice)}
        </span>
        <span className="text-xs text-gray-500">(tax included)</span>
      </div>
    </div>
  );
};

export default Payment;
