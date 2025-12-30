import { useSelector } from "react-redux";
import Address from "./Address";
import CartItems from "./CartItems";

const ShoppingInfo = () => {
  const { items, shippingInfo } = useSelector((state) => state.cart);

  const address = `${shippingInfo?.address}, ${shippingInfo?.city}, ${
    shippingInfo?.state
  }, ${shippingInfo?.pinCode || shippingInfo?.pincode}, ${
    shippingInfo?.country
  }`;

  return (
    <div className="space-y-6">
      {/* Shipping Address */}
      <div className="bg-white p-6 ">
        <Address address={address} shippingInfo={shippingInfo} />
      </div>

      {/* Cart Items */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <CartItems items={items} />
      </div>
    </div>
  );
};

export default ShoppingInfo;
