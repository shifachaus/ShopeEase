const Address = ({ address, shippingInfo, orderData }) => {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-medium mb-2    tracking-tight sm:text-2xl  text-black  ">
        Shipping Info
      </h2>
      <div className="flex flex-col gap-2 p-4 bg-gray-100 md:w-3/4">
        {orderData && (
          <p className="text-md font-medium">
            Name:{" "}
            <span className="text-sm font-normal">
              {orderData?.order?.user?.name}
            </span>
          </p>
        )}
        <p className="text-md font-medium">
          Phone:{" "}
          <span className="text-sm font-normal">{shippingInfo?.phoneNo}</span>
        </p>
        <p className="text-md font-medium">
          Address: <span className="text-sm font-normal">{address}</span>
        </p>
      </div>
    </div>
  );
};

export default Address;
