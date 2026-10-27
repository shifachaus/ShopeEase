import {
  FiArrowRight,
  FiPackage,
  FiTruck,
  FiCheckCircle,
} from "react-icons/fi";
import FormButton from "../admin/form/FormButton";

const Proceed = ({ orderData, setStatus, isLoading, updateOrderStatus }) => {
  const currentStatus = orderData?.order?.orderStatus;

  const nextStatuses = {
    Processing: {
      value: "Shipped",
      label: "Mark as Shipped",
      icon: FiTruck,
    },
    Shipped: {
      value: "Delivered",
      label: "Mark as Delivered",
      icon: FiCheckCircle,
    },
  };

  const nextStatus = nextStatuses[currentStatus];
  const NextIcon = nextStatus?.icon;

  if (!nextStatus) {
    return (
      <div className="">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-green-100 p-3 text-green-600">
            <FiCheckCircle size={22} />
          </div>

          <div>
            <h2 className="font-heading text-lg font-semibold text-gray-900">
              Order Completed
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              This order has no further status updates available.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="mb-5 flex items-center gap-3 border-b border-gray-100 pb-4">
        <div className="rounded-lg bg-orange-100 p-3 text-primary">
          <FiPackage size={22} />
        </div>

        <div>
          <h2 className="font-heading text-lg font-semibold text-gray-900">
            Process Order
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Update the order's delivery status.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="order-status"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Current status
          </label>

          <div className="rounded-lg bg-gray-50 px-3 py-2.5 text-sm font-medium text-gray-700">
            {currentStatus}
          </div>
        </div>

        <div>
          <label
            htmlFor="order-status"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Next status
          </label>

          <select
            id="order-status"
            defaultValue=""
            onChange={(e) => setStatus(e.target.value)}
            disabled={isLoading}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm text-gray-700 outline-none transition focus:border-primary focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-gray-100"
          >
            <option value="">Choose next status</option>
            <option value={nextStatus.value}>{nextStatus.value}</option>
          </select>
        </div>

        <FormButton
          isLoading={isLoading}
          name={nextStatus.label}
          onClick={updateOrderStatus}
          disabled={isLoading}
        />

        <p className="flex items-center gap-2 text-xs text-gray-500">
          <FiArrowRight size={14} />
          The order will move to the next delivery stage.
        </p>
      </div>
    </div>
  );
};

export default Proceed;
