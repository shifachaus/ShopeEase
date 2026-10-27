import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import CartItem from "./CartItem";
import CartColumns from "./CartColumns";
import CartTotals from "./CartTotals";

const CartContent = () => {
  const user = useSelector((store) => store.user);
  const cartItems = useSelector((store) => store.cart.items) || [];

  const isLoggedIn = Boolean(user?.success || user?.data?.success);

  const total = cartItems.reduce((acc, item) => {
    const price = Number(item.price) || 0;
    const qty = Math.max(0, Number(item.qty) || 0);

    return acc + price * qty;
  }, 0);

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
      {/* Cart items */}
      <div className="min-w-0 lg:col-span-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              Shopping Cart
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
              your cart
            </p>
          </div>
        </div>

        <div className="hidden border-b border-gray-200 pb-3 md:block">
          <CartColumns />
        </div>

        <div className="divide-y divide-gray-100">
          {cartItems.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
        </div>
      </div>

      {/* Order summary */}
      <aside className="min-w-0 lg:sticky lg:top-6 lg:col-span-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>

          <p className="mt-1 text-sm text-gray-500">
            Review your items before checkout.
          </p>

          <div className="mt-5">
            <CartTotals total={total} />
          </div>

          <Link
            to={isLoggedIn ? "/shipping" : "/login"}
            className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gray-950 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
          >
            Proceed to checkout
            <FiArrowRight size={17} />
          </Link>

          {!isLoggedIn && (
            <p className="mt-3 text-center text-xs leading-5 text-gray-500">
              Sign in to continue with your purchase.
            </p>
          )}
        </div>
      </aside>
    </div>
  );
};

export default CartContent;
