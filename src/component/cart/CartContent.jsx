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

        <div className="flex flex-col gap-4 overflow-y-auto max-h-[70vh] pr-2 no-scrollbar cursor-grab active:cursor-grabbing border-b pb-2">
          {cartItems?.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4  md:mt-1 md:col-span-4">
        <CartTotals total={total} />
        <Link
          to={user?.success || user?.data?.success ? "/shipping" : "/login"}
          className="p-2 px-4 cursor-pointer border border-gray-900 hover:shadow-md uppercase hover:bg-gray-900 hover:text-white hover:border-gray-900 transition rounded-sm "
        >
          <p className="text-base font-medium text-center">Check Out</p>
        </Link>
      </div>
    </div>
  );
};

export default CartContent;
