import { Link, useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../utils/orderApi";
import { formatPrice } from "../utils/helper";
import { Fragment } from "react";

const OrderDetails = () => {
  const { id } = useParams();
  const { data: orderData, error, isLoading } = useGetOrderDetailsQuery(id);
  // console.log(orderData, "orderData");
  return (
    <Fragment>
      <div className="mx-auto max-w-7xl  my-10  p-6 lg:px-8">
        <div className=" flex flex-col gap-6  mt-6 ">
          <h2 className="text-xl font-medium mb-2  text-gray-500 sm:text-2xl md:text-3xl">
            Order ID #{orderData?.order?._id}
          </h2>
          <div>
            <h2 className="text-2xl font-medium mb-2  text-gray-600">
              Shipping Info
            </h2>
            <div className="flex flex-col gap-2 p-4">
              <p className="text-md font-medium">
                Name:{" "}
                <span className="text-sm font-normal">
                  {orderData?.order?.user?.name}
                </span>
              </p>
              <p className="text-md font-medium">
                Phone:{" "}
                <span className="text-sm font-normal">
                  {orderData?.order?.shippingInfo?.phoneNo}
                </span>
              </p>
              <p className="text-md font-medium">
                Address:{" "}
                <span className="text-sm font-normal">
                  {orderData?.order.shippingInfo &&
                    `${orderData?.order.shippingInfo.address}, ${orderData?.order.shippingInfo.city}, ${orderData?.order.shippingInfo.state}, ${orderData?.order.shippingInfo.pinCode}, ${orderData?.order.shippingInfo.country}`}
                </span>
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-medium mb-2  text-gray-600">
              Payment
            </h2>

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
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-medium mb-2  text-gray-600">
              Order Status
            </h2>

            <div className="pl-4 pb-4">
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
        <h2 className="text-2xl font-medium mb-2  text-gray-600">
          Your Cart Items:
        </h2>

        <div className="mt-6 p-2">
          {orderData?.order?.orderItems?.map((item) => {
            console.log(item, "CONFIRM oRDER");
            return (
              <div
                key={item._id}
                className="grid grid-cols-3 gap-2 items-center"
              >
                <img src={item?.image} alt={item.name} className="h-16 w-20" />
                <Link to={`/product/${item.product}`}>{item.name}</Link>
                <p>
                  {/* {item.qty} X {formatPrice(item.price)} ={" "} */}
                  <b>{formatPrice(item.price * item.qty)}</b>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default OrderDetails;
