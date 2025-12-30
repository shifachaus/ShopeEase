import { FiUser, FiPhone, FiMapPin } from "react-icons/fi";

const Address = ({ address, shippingInfo, orderData }) => {
  const name = orderData?.order?.user?.name;

  return (
    <div className=" p-5 space-y-4">
      {name && (
        <div className="flex items-start gap-3">
          <FiUser className="w-5 h-5 text-gray-500 mt-0.5" />
          <p className="text-sm text-gray-700">
            <span className="font-medium text-gray-900">Name:</span> {name}
          </p>
        </div>
      )}

      <div className="flex items-start gap-3">
        <FiPhone className="w-5 h-5 text-gray-500 mt-0.5" />
        <p className="text-sm text-gray-700">
          <span className="font-medium text-gray-900">Phone:</span>{" "}
          {shippingInfo?.phoneNo || "N/A"}
        </p>
      </div>

      <div className="flex items-start gap-3">
        <FiMapPin className="w-5 h-5 text-gray-500 mt-0.5" />
        <p className="text-sm text-gray-700 leading-relaxed">
          <span className="font-medium text-gray-900">Address:</span> {address}
        </p>
      </div>
    </div>
  );
};

export default Address;
