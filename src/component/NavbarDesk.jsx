import { Link } from "react-router-dom";
import { PiShoppingCartSimple } from "react-icons/pi";

const NavbarDesk = ({
  showMenu,
  setShowMenu,
  userData,
  cartItems,
  signOut,
}) => {
  return (
    <>
      <div className="hidden md:flex md:gap-x-12">
        <Link
          to={"/"}
          className="text-sm font-medium leading-6 text-neutral-100"
        >
          Home
        </Link>
        <Link
          to={"/products"}
          className="text-sm font-medium leading-6 text-neutral-100"
        >
          Shop
        </Link>
        {userData !== null && (
          <Link
            to={"/account"}
            className="text-sm font-medium leading-6 text-neutral-100"
          >
            Profile
          </Link>
        )}
        {userData !== null && userData?.user?.role === "admin" && (
          <Link
            to={"/admin/dashboard"}
            className="text-sm font-medium leading-6 text-neutral-100"
          >
            Dashboard
          </Link>
        )}
      </div>

      <div className="hidden md:flex md:flex-1 md:justify-end md:items-center gap-4">
        {userData?.success || userData?.data?.success ? (
          <p
            onClick={signOut}
            className="cursor-pointer text-sm font-medium leading-6 text-neutral-100 ml-8"
          >
            Logout
          </p>
        ) : (
          <Link
            to={"/login"}
            className="cursor-pointer text-sm font-medium leading-6 text-neutral-100 ml-8"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        )}

        <Link
          to={"/cart"}
          className="text-sm font-medium leading-6 text-neutral-100"
        >
          <p className="relative ">
            <PiShoppingCartSimple className="text-xl " />
            <span className="absolute text-sm text-white font-medium -top-1 left-4 bg-black rounded-[50%]  w-full text-center">
              {cartItems.length}
            </span>
          </p>
        </Link>
      </div>
    </>
  );
};

export default NavbarDesk;
