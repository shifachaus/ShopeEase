import { useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../../features/orders/orderApi";
import { Address, CartItems } from "../../component/order";
import { PaymentCard, OrderStatus } from "../../component/payment";
import Breadcrumb from "../../component/Breadcrumb";

const OrderDetails = () => {
  const { id } = useParams();
  const { data: orderData, isLoading, isError } = useGetOrderDetailsQuery(id);

  const order = orderData?.order;

  const address = order
    ? `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`
    : "";

  if (isLoading)
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading order…</p>
      </div>
    );

  if (isError || !order)
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-red-600 text-lg font-medium">
          Order not found or failed to load.
        </p>
      </div>
    );

  return (
    <section className="">
      <Breadcrumb title={"Order status"} profile={true} order={true} />
      <div className="max-w-6xl mx-auto p-6 space-y-6 mt-10 md:mt-12 mb-10">
        {/* Order Header */}
        <div className="bg-white border rounded-xl shadow-sm p-5">
          <p className="text-sm text-gray-500">Order ID</p>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            #{order._id}
          </h1>
        </div>

        {/* Order Status */}
        <div className="bg-white border rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Current Status
          </h2>
          <OrderStatus orderData={orderData} />
        </div>

        {/* Address */}
        <div className="bg-white border rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Delivery Address
          </h2>
          <Address
            orderData={orderData}
            address={address}
            shippingInfo={order?.shippingInfo}
          />
        </div>

        {/* Payment */}
        <div className="bg-white border rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Payment Summery
          </h2>
          <PaymentCard orderData={orderData} />
        </div>

        {/* Cart Items */}
        <div className="bg-white border rounded-xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Items in this Order
          </h2>
          <CartItems items={order?.orderItems} />
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
