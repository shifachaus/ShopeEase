import { useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../..//utils/orderApi";
import { formatPrice } from "../../utils/helper";
import { Address, CartItems } from "../../component/order";

const OrderDetails = () => {
  const { id } = useParams();
  const { data: orderData, error, isLoading } = useGetOrderDetailsQuery(id);

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

          <div className="mb-4">
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
                  {orderData?.order.totalPrice &&
                    formatPrice(orderData?.order.totalPrice)}
                </span>
                <span className="text-xs text-red-500">*tax included</span>
              </div>
            </div>
          </div>

          <div className="mb-1">
            <h3 className="text-lg font-medium mb-6 tracking-tight sm:text-xl   text-black ">
              Order Status
            </h3>

            <div className="pl-4 ">
              <p
                className={
                  orderData?.order.orderStatus &&
                  orderData?.order.orderStatus === "Delivered"
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {orderData?.order.orderStatus && orderData?.order.orderStatus}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t mx-auto max-w-7xl  p-6 lg:px-8">
        <CartItems items={orderData?.order?.orderItems} />
      </div>
    </section>
  );
};

export default OrderDetails;
