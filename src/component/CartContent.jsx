import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import CartColumns from "./CartColumns";
import CartTotals from "./CartTotals";

const CartContent = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const total = cartItems?.reduce((acc, cur) => {
    return acc + cur.price * cur.qty;
  }, 0);

  return (
    <div
      className={`flex flex-col gap-10 md:grid md:grid-flow-col ${
        cartItems?.length === 1 && "h-screen"
      }`}
    >
      <div className="col-span-8">
        <CartColumns />

        <div className="flex flex-col gap-4  ">
          {cartItems?.map((item) => {
            return <CartItem key={item._id} item={item} />;
          })}
        </div>
      </div>
      <CartTotals total={total} />
    </div>
  );
};

export default CartContent;
