import {
  useGetOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../../utils/orderApi";
import { useState } from "react";
import { Address, CartItems } from "../../component/order";
import FormButton from "../../component/FormButton";
import OrderStatus from "../../component/OrderStatus";
import Payment from "../../component/Payment";
import { useParams } from "react-router-dom";
import Proceed from "../../component/Proceed";

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

              <Payment orderData={orderData} />

              <OrderStatus orderData={orderData} />

              <CartItems items={orderData?.order?.orderItems} />

              {orderData?.order?.orderStatus !== "Delivered" && (
                <div className="md:absolute md:border-r md:border-gray-200 md:w-10 md:h-full md:top-0 md:left-[90%]"></div>
              )}
            </div>

            <Proceed
              orderData={orderData}
              setStatus={setStatus}
              isLoading={isLoading}
              updateOrderStatus={updateOrderStatus}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessOrder;
