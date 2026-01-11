import { Link, NavLink } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";

const NavbarDesk = ({ userData, cartItems, signOut }) => {
  return (
    <>
      <div className="hidden md:flex md:gap-x-12">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:underline ${
              isActive
                ? " text-white text-sm font-medium leading-6 underline"
                : "text-sm font-medium leading-6 text-white"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `hover:underline ${
              isActive
                ? "text-white text-sm font-medium leading-6 underline"
                : "text-sm font-medium leading-6 text-white"
            }`
          }
        >
          Shop
        </NavLink>

        <NavLink
          to="/blog"
          className={({ isActive }) =>
            `hover:underline ${
              isActive
                ? "text-white text-sm font-medium leading-6 underline"
                : "text-sm font-medium leading-6 text-white"
            }`
          }
        >
          Blog
        </NavLink>
        {userData !== null && (
          <NavLink
            to="/account"
            className={({ isActive }) =>
              `hover:underline ${
                isActive
                  ? "text-white text-sm font-medium leading-6 underline"
                  : "text-sm font-medium leading-6 text-white"
              }`
            }
          >
            Profile
          </NavLink>
        )}
        {userData !== null && userData?.user?.role === "admin" && (
          <Link
            to={"/admin/dashboard"}
            className="text-sm font-medium leading-6 text-white"
          >
            Dashboard
          </Link>
        )}
      </div>

      <div className="hidden md:flex md:flex-1 md:justify-end md:items-center gap-4">
        {userData?.success || userData?.data?.success ? (
          <p
            onClick={signOut}
            className="cursor-pointer text-sm font-medium leading-6 text-white ml-8"
          >
            Logout
          </p>
        ) : (
          <Link
            to={"/login"}
            className="cursor-pointer text-sm font-medium leading-6 text-white ml-8"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        )}

        <Link to="/cart" className="relative ">
          <HiOutlineShoppingBag className="text-2xl text-white/90" />

          {cartItems.length > 0 && (
            <span className="absolute -bottom-3 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-semibold text-black">
              {cartItems.length}
            </span>
          )}
        </Link>
      </div>
    </>
  );
};

export default NavbarDesk;
