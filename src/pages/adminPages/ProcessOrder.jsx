import { useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  useGetOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../../features/orders/orderApi";

import { Address, CartItems } from "../../component/order";
import { PaymentCard, Proceed, OrderStatus } from "../../component/payment";

const ProcessOrder = () => {
  const { id } = useParams();
  const [status, setStatus] = useState("");

  const {
    data: orderData,
    isLoading,
    isError,
    refetch,
  } = useGetOrderDetailsQuery(id);

  const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();

  const order = orderData?.order;
  const shippingInfo = order?.shippingInfo;

  const address = [
    shippingInfo?.address,
    shippingInfo?.city,
    shippingInfo?.state,
    shippingInfo?.pinCode,
    shippingInfo?.country,
  ]
    .filter(Boolean)
    .join(", ");

  const updateOrderStatus = async () => {
    if (!id || !status || isUpdating) return;

    try {
      await updateOrder({ id, status }).unwrap();
      setStatus("");
      await refetch();
    } catch (err) {
      console.error("Failed to update order status:", err);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 p-6 md:ml-20 lg:ml-64">
        <div className="mx-auto max-w-7xl animate-pulse space-y-4">
          <div className="h-8 w-48 rounded bg-gray-200" />
          <div className="h-48 rounded-xl bg-white shadow-sm" />
          <div className="h-64 rounded-xl bg-white shadow-sm" />
        </div>
      </main>
    );
  }

  if (isError || !order) {
    return (
      <main className="min-h-screen bg-gray-50 p-6 md:ml-20 lg:ml-64">
        <div className="mx-auto max-w-7xl rounded-xl border border-gray-200 bg-white p-8 text-center">
          <h1 className="text-xl font-semibold text-gray-900">
            Unable to load order
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            The order could not be found or something went wrong.
          </p>
          <Link
            to="/admin/orders"
            className="mt-5 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            Back to Orders
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 md:ml-20 lg:ml-64">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <Link
            to="/admin/orders"
            className="text-sm font-medium text-gray-500 transition hover:text-primary"
          >
            ← Back to Orders
          </Link>

          <h1 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Process Order
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Order ID: <span className="font-mono">{id}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="min-w-0 space-y-6 lg:col-span-8">
            <Address
              orderData={orderData}
              address={address}
              shippingInfo={shippingInfo}
            />

            <PaymentCard orderData={orderData} />

            <OrderStatus orderData={orderData} />

            <CartItems items={order.orderItems ?? []} />
          </div>

          <aside className="min-w-0 lg:col-span-4">
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
              <h2 className="mb-4 text-lg font-semibold text-gray-900">
                Update Order
              </h2>

              <Proceed
                orderData={orderData}
                setStatus={setStatus}
                isLoading={isUpdating}
                updateOrderStatus={updateOrderStatus}
              />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default ProcessOrder;
