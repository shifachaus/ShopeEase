import { Link, useParams } from "react-router-dom";
import { formatPrice } from "../../utils/helper";
import {
  useGetOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../../utils/orderApi";
import { useState } from "react";
import { Address, CartItems } from "../../component/order";
import FormButton from "../../component/FormButton";

const ProcessOrder = () => {
  const { id } = useParams();
  const {
    data: orderData,

    refetch,
  } = useGetOrderDetailsQuery(id);
  const [updateOrder, { isLoading }] = useUpdateOrderMutation();

  const [status, setStatus] = useState("");

  const address = `${orderData?.order?.shippingInfo?.address}, ${orderData?.order?.shippingInfo?.city}, ${orderData?.order?.shippingInfo?.state}, ${orderData?.order?.shippingInfo?.pinCode}, ${orderData?.order?.shippingInfo?.country}`;

  const updateOrderStatus = async () => {
    try {
      const order = { id, status };
      const data = await updateOrder(order);
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
      <div className="p-4 sm:ml-64 ">
        <div className="mx-auto max-w-7xl  p-6 lg:px-8">
          <div className=" flex flex-col gap-6 md:grid md:grid-flow-col mt-6 ">
            <div className="md:col-span-8 relative">
              <Address
                orderData={orderData}
                address={address}
                shippingInfo={orderData?.order?.shippingInfo}
              />

              <div className="mb-10">
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
                      {orderData?.order?.totalPrice &&
                        formatPrice(orderData?.order?.totalPrice)}
                    </span>
                    <span className="text-xs text-red-500">*tax included</span>
                  </div>
                </div>
              </div>

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
                    {orderData?.order?.orderStatus &&
                      orderData?.order?.orderStatus}
                  </p>
                </div>
              </div>

              <CartItems items={orderData?.order?.orderItems} />
              {orderData?.order?.orderStatus !== "Delivered" && (
                <div className="md:absolute md:border-r md:border-gray-200 md:w-10 md:h-full md:top-0 md:left-[90%]"></div>
              )}
            </div>

            <div
              className={
                orderData?.order?.orderStatus === "Delivered"
                  ? "hidden"
                  : "mt-8 md:col-span-4 "
              }
            >
              <p className="text-xl font-medium  text-[#252323] mb-6 border-b pb-3   text-center">
                Process Order
              </p>
              <div className="flex flex-col gap-4  p-2 ">
                <select
                  onChange={(e) => setStatus(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Choose Category</option>
                  {orderData?.order?.orderStatus === "Processing" && (
                    <option value="Shipped">Shipped</option>
                  )}

                  {orderData?.order?.orderStatus === "Shipped" && (
                    <option value="Delivered">Delivered</option>
                  )}
                </select>

                <FormButton
                  isLoading={isLoading}
                  name={"Proceed"}
                  onClick={updateOrderStatus}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessOrder;
