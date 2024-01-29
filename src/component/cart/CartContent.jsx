import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import CartColumns from "./CartColumns";
import CartTotals from "./CartTotals";
import { Link } from "react-router-dom";

const CartContent = () => {
  const user = useSelector((store) => store.user);
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

      <div className="flex flex-col gap-4  md:mt-1 md:col-span-4">
        <CartTotals total={total} />
        <Link
          to={user?.success || user?.data?.success ? "/shipping" : "/login"}
          className="border border-[#252323] mt-2 mb-8 text-center py-1 px-4 bg-[#252323] "
        >
          <p className="text-lg font-medium  text-white">Check Out</p>
        </Link>
      </div>
    </div>
  );
};

export default CartContent;
