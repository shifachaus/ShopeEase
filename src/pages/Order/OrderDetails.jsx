import { useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../../features/orders/orderApi";
import { Address, CartItems } from "../../component/order";
import { Payment, OrderStatus } from "../../component/Payment";

const OrderDetails = () => {
  const { id } = useParams();
  const { data: orderData } = useGetOrderDetailsQuery(id);

  let address = `${orderData?.order.shippingInfo.address}, ${orderData?.order.shippingInfo.city}, ${orderData?.order.shippingInfo.state}, ${orderData?.order.shippingInfo.pinCode}, ${orderData?.order.shippingInfo.country}`;

  return (
    <section className="mt-10 md:mt-20 mb-10 ">
      <div className=" mx-auto max-w-7xl  my-10  p-6 lg:px-8">
        <div className=" flex flex-col gap-6  mt-6 ">
          <p className="text-xl font-medium mb-2  text-black sm:text-2xl md:text-3xl">
            Order ID #{orderData?.order?._id}
          </p>

          <Address
            orderData={orderData}
            address={address}
            shippingInfo={orderData?.order?.shippingInfo}
          />

          <Payment orderData={orderData} />

          <OrderStatus orderData={orderData} />
        </div>
      </div>

      <div className="border-t mx-auto max-w-7xl  p-6 lg:px-8">
        <CartItems items={orderData?.order?.orderItems} />
      </div>
    </section>
  );
};

export default OrderDetails;
