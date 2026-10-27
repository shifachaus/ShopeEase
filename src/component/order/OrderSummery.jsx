import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiLock, FiTruck } from "react-icons/fi";

import { formatPrice } from "../../utils/helper";

const OrderSummery = () => {
  const { items = [] } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const subTotal = items.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (Number(item.qty) || 0),
    0,
  );

  const shippingCharges = subTotal > 1000 ? 0 : 200;
  const tax = subTotal * 0.18;
  const totalPrice = subTotal + tax + shippingCharges;

  const proceedToPayment = () => {
    if (!items.length) return;

    const data = {
      subTotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };

  return (
    <aside className="rounded-2xl border border-gray-100 bg-white p-5 sm:p-6 lg:sticky lg:top-6">
      <h2 className="text-lg font-semibold text-gray-900">Order summary</h2>

      <p className="mt-1 text-sm text-gray-500">Review your order total.</p>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">
            {formatPrice(subTotal)}
          </span>
        </div>

        <div className="flex items-start justify-between gap-3 text-sm">
          <span className="flex items-center gap-2 text-gray-600">
            <FiTruck size={16} />
            Shipping
          </span>

          <span className="text-right font-medium text-gray-900">
            {shippingCharges === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              formatPrice(shippingCharges)
            )}
          </span>
        </div>

        {shippingCharges > 0 && (
          <p className="rounded-lg bg-gray-50 px-3 py-2 text-xs leading-5 text-gray-500">
            Add more items to reach the free shipping threshold of 1000.
          </p>
        )}

        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="text-gray-600">GST (18%)</span>
          <span className="font-medium text-gray-900">{formatPrice(tax)}</span>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between gap-3">
            <span className="font-semibold text-gray-900">Total</span>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              {formatPrice(totalPrice)}
            </span>
          </div>
          <p className="mt-1 text-right text-xs text-gray-500">
            Including shipping and GST
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={proceedToPayment}
        disabled={!items.length}
        className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        Proceed to payment
        <FiArrowRight size={17} />
      </button>

      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
        <FiLock size={14} />
        Secure checkout
      </div>
    </aside>
  );
};

export default OrderSummery;
