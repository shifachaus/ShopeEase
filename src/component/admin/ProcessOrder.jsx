import { Link, useNavigate, useParams } from "react-router-dom";
import { formatPrice } from "../../utils/helper";
import Sidebar from "./Sidebar";
import {
  useGetOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../../utils/orderApi";
import { useState } from "react";

const ProcessOrder = () => {
  const { id } = useParams();
  const {
    data: orderData,
    error,
    isLoading,
    refetch,
  } = useGetOrderDetailsQuery(id);
  const [updateOrder] = useUpdateOrderMutation();
  const [status, setStatus] = useState("");

  const navigate = useNavigate("");

  const address = `${orderData?.order?.shippingInfo.address}, ${orderData?.order?.shippingInfo.city}, ${orderData?.order?.shippingInfo.state}, ${orderData?.order?.shippingInfo.pinCode}, ${orderData?.order?.shippingInfo.country}`;

  const updateOrderStatus = async () => {
    try {
      const order = { id, status };
      const data = await updateOrder(order);
      refetch();
      console.log(data, "ORDER STATUS");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
      <Sidebar />
      <main>
        <div className="p-4 sm:ml-64 bg-stone-50">
          <div className="mx-auto max-w-7xl  p-6 lg:px-8">
            <div className=" flex flex-col gap-6 md:grid md:grid-flow-col mt-6 ">
              <div className="md:col-span-8 relative">
                <div className="">
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
                      <span className="text-sm font-normal">{address}</span>
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
                      {orderData?.order.orderStatus &&
                        orderData?.order.orderStatus}
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-medium mb-2  text-gray-600">
                    Your Cart Items:
                  </h2>

                  <div className="mt-6 p-2">
                    {orderData?.order?.orderItems?.map((item) => {
                      console.log(item.product, "CONFIRM oRDER");
                      return (
                        <div
                          key={item._id}
                          className="grid grid-cols-3 gap-2 items-center"
                        >
                          <img
                            src={item?.image}
                            alt={item.name}
                            className="h-16 w-20"
                          />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                          <p>
                            {item.qty} X {formatPrice(item.price)} ={" "}
                            <b>{formatPrice(item.price * item.qty)}</b>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {orderData?.order.orderStatus !== "Delivered" && (
                  <div className="md:absolute md:border-r md:border-gray-200 md:w-10 md:h-full md:top-0 md:left-[90%]"></div>
                )}
              </div>

              <div
                className={
                  orderData?.order.orderStatus === "Delivered"
                    ? "hidden"
                    : "mt-8 md:col-span-4 "
                }
              >
                <p className="text-2xl font-medium mb-6 border-b pb-3  text-gray-600 text-center">
                  Process Order
                </p>
                <div className="flex flex-col gap-4  p-2 ">
                  <select
                    onChange={(e) => setStatus(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Choose Category</option>
                    {orderData?.order.orderStatus === "Processing" && (
                      <option value="Shipped">Shipped</option>
                    )}

                    {orderData?.order.orderStatus === "Shipped" && (
                      <option value="Delivered">Delivered</option>
                    )}
                  </select>
                  <button
                    className=" bg-purple-800  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={updateOrderStatus}
                  >
                    Proceed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default ProcessOrder;
