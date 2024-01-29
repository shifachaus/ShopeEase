import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import PageHero from "../component/PageHero";
import cartImage from "../assets/cart.png";
import { CartContent } from "../component/cart";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <section>
      <PageHero title={"cart"} />

      <div className="mx-auto max-w-6xl  my-10   p-6 lg:px-8 md:h-screen">
        {cartItems?.length === 0 ? (
          <div className="max-w-sx flex flex-col items-center  p-3  w-full h-screen">
            <h2 className="mb-4 text-2xl md:text-3xl tracking-tight font-medium ">
              Your Cart is Empty
            </h2>
            <p className="mb-4 text-lg font-light text-gray-500">
              Looks like you haven't added anything to your cart yet
            </p>
            <img src={cartImage} alt="cart image" />
            <Link
              to="/"
              className=" border-b-2 border-black inline-flex items-center gap-2 text-black bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium  text-sm px-1 py-1 text-center  my-4"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <CartContent />
        )}
      </div>
    </section>
  );
};

export default Cart;
