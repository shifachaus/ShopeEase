const OrderStatus = ({ orderData }) => {
  return (
    <div className="mb-10">
      <h3 className="text-lg font-medium mb-2 tracking-tight sm:text-xl  text-black ">
        Order Status
      </h3>

      <div className="pl-4 pb-4">
        <p
          className={
            orderData?.order?.orderStatus &&
            orderData?.order?.orderStatus === "Delivered"
              ? "text-green-500"
              : "text-red-500"
          }
        >
          {orderData?.order?.orderStatus && orderData?.order?.orderStatus}
        </p>
      </div>
    </div>
  );
};

export default OrderStatus;
