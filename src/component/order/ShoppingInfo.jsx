import { useSelector } from "react-redux";
import { FiMapPin, FiShoppingBag } from "react-icons/fi";

import Address from "./Address";
import CartItems from "./CartItems";

const ShoppingInfo = () => {
  const { items = [], shippingInfo } = useSelector((state) => state.cart);

  const address = [
    shippingInfo?.address,
    shippingInfo?.city,
    shippingInfo?.state,
    shippingInfo?.pinCode || shippingInfo?.pincode,
    shippingInfo?.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="space-y-6">
      {/* Delivery address */}
      <section className="rounded-2xl border border-gray-100 bg-white p-5 sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-800">
            <FiMapPin size={19} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Delivery address
            </h2>
            <p className="text-sm text-gray-500">
              Where your order will be delivered
            </p>
          </div>
        </div>

        <Address address={address} shippingInfo={shippingInfo} />
      </section>

      <section className="rounded-2xl border border-gray-100 bg-white p-5 sm:p-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-800">
            <FiShoppingBag size={19} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900">Your items</h2>
            <p className="text-sm text-gray-500">
              {items.length} {items.length === 1 ? "item" : "items"} in your
              order
            </p>
          </div>
        </div>

        <CartItems items={items} />
      </section>
    </div>
  );
};

export default ShoppingInfo;
