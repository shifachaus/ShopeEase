import { useSelector } from "react-redux";
import Address from "./Address";
import CartItems from "./CartItems";

const ShoppingInfo = () => {
  const { items } = useSelector((state) => state.cart);
  const shippingInfo = useSelector((state) => state.cart.shippingInfo);
  const address = `${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.state}, ${shippingInfo?.pincode}, ${shippingInfo?.country}`;

  return (
    <div className="md:col-span-9 relative">
      <Address address={address} shippingInfo={shippingInfo} />
      <CartItems items={items} />
      <div className="md:absolute md:border-r md:border-gray-200 md:w-10 md:h-full md:top-0 md:left-[90%]"></div>
    </div>
  );
};

export default ShoppingInfo;
