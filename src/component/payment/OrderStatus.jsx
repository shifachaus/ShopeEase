const OrderStatus = ({ orderData }) => {
  return (
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
  );
};

export default OrderStatus;
