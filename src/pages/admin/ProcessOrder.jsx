import { Link, useParams } from "react-router-dom";
import { formatPrice } from "../../utils/helper";
import {
  useGetOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../../utils/orderApi";
import { useState } from "react";

const ProcessOrder = () => {
  const { id } = useParams();
  const {
    data: orderData,

    refetch,
  } = useGetOrderDetailsQuery(id);
  const [updateOrder, { isLoading, isError, error }] = useUpdateOrderMutation();
  const [status, setStatus] = useState("");

  const address = `${orderData?.order?.shippingInfo?.address}, ${orderData?.order?.shippingInfo?.city}, ${orderData?.order?.shippingInfo?.state}, ${orderData?.order?.shippingInfo?.pinCode}, ${orderData?.order?.shippingInfo?.country}`;
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
      <div className="p-4 sm:ml-64 ">
        <div className="mx-auto max-w-7xl  p-6 lg:px-8">
          <div className=" flex flex-col gap-6 md:grid md:grid-flow-col mt-6 ">
            <div className="md:col-span-8 relative">
              <div className="mb-10">
                <h2 className="text-xl font-medium mb-2 tracking-tight sm:text-2xl  text-black">
                  Shipping Info
                </h2>

                <div className="flex flex-col gap-2 p-4 bg-gray-100 md:w-3/4">
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

              <div>
                <h3 className="text-lg font-medium mb-2 tracking-tight sm:text-xl  text-black ">
                  Your Cart Items:
                </h3>

                <div className="mt-6 p-2">
                  {orderData?.order?.orderItems?.map((item) => {
                    // console.log(item.product, "CONFIRM oRDER");
                    return (
                      <div
                        key={item?._id}
                        className="grid grid-cols-3 gap-2 items-center"
                      >
                        <img
                          src={item?.image}
                          alt={item?.name}
                          className="h-16 w-20"
                        />
                        <Link to={`/product/${item?.product}`}>
                          {item.name}
                        </Link>
                        <p>
                          {item.qty} X {formatPrice(item?.price)} ={" "}
                          <b>{formatPrice(item?.price * item?.qty)}</b>
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
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

                <div className="flex flex-col">
                  <button
                    disabled=""
                    type="submit"
                    onClick={updateOrderStatus}
                    className="text-white bg-[#252323]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center "
                  >
                    {isLoading ? (
                      <span>
                        <svg
                          aria-hidden="true"
                          role="status"
                          className="inline mr-3 w-4 h-4 text-white animate-spin"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="#E5E7EB"
                          ></path>
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                        Loading...
                      </span>
                    ) : (
                      <span>Proceed</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessOrder;
