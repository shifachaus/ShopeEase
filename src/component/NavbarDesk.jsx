import { Link } from "react-router-dom";
import { PiShoppingCartSimple } from "react-icons/pi";

const NavbarDesk = ({ userData, cartItems, signOut }) => {
  return (
    <>
      <div className="hidden md:flex md:gap-x-12">
        <Link to={"/"} className="text-sm font-medium leading-6 text-dark">
          Home
        </Link>
        <Link
          to={"/products"}
          className="text-sm font-medium leading-6 text-dark"
        >
          Shop
        </Link>
        {userData !== null && (
          <Link
            to={"/account"}
            className="text-sm font-medium leading-6 text-dark"
          >
            Profile
          </Link>
        )}
        {userData !== null && userData?.user?.role === "admin" && (
          <Link
            to={"/admin/dashboard"}
            className="text-sm font-medium leading-6 text-dark"
          >
            Dashboard
          </Link>
        )}
      </div>

      <div className="hidden md:flex md:flex-1 md:justify-end md:items-center gap-4">
        {userData?.success || userData?.data?.success ? (
          <p
            onClick={signOut}
            className="cursor-pointer text-sm font-medium leading-6 text-dark ml-8"
          >
            Logout
          </p>
        ) : (
          <Link
            to={"/login"}
            className="cursor-pointer text-sm font-medium leading-6 text-dark ml-8"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        )}

        <Link to={"/cart"} className="text-sm font-medium leading-6 text-dark">
          <p className="relative ">
            <PiShoppingCartSimple className="text-xl " />
            <span className="absolute text-sm text-dark font-medium -top-1 left-4 bg-white rounded-[50%]  w-full text-center">
              {cartItems.length}
            </span>
          </p>
        </Link>
      </div>
    </>
  );
};

export default NavbarDesk;
