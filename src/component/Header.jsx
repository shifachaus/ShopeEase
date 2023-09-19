import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsCart4 } from "react-icons/bs";
import { useGetUserQuery, useLogoutUserMutation } from "../utils/userApi";
import { logout } from "../utils/userSlice";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [logoutUser] = useLogoutUserMutation();
  const getUserQuery = useGetUserQuery();
  const cartItems = useSelector((store) => store.cart.items);
  const userData = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signOut = async () => {
    const data = await logoutUser();
    console.log(data);
    dispatch(logout());
    navigate("/");
  };

  // console.log(userData, "HEASE", getUserQuery);
  return (
    <header className=" bg-[#828D91]">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 md:pb-8 md:pt-8 lg:px-8"
        aria-label="Global"
      >
        <Link to={"/"} className="flex md:flex-1">
          <h1 className="font-black tracking-wider text-xl">
            <span className="text-white">Shop</span>
            <span>Ease</span>
          </h1>
        </Link>

        {/* hamburger menu */}
        <div className="flex md:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-neutral-100"
            onClick={() => setShowMenu(true)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        {/*Desktop  Navbar */}
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
              <BsCart4 className="text-xl " />
              <span className="absolute text-sm text-white font-medium -top-1 left-4 bg-black rounded-[50%]  w-full text-center">
                {cartItems.length}
              </span>
            </p>
          </Link>
        </div>
      </nav>

      {/*MObile  Navbar */}
      <div
        className={`z-50 fixed inset-y-0 right-0 overflow-y-auto bg-white px-6 py-6  w-1/2  h-screen transition-transform ${
          showMenu ? "translate-x-1" : "translate-x-full"
        } `}
        role="dialog"
        aria-modal="true"
      >
        <div className="">
          <div className="flex items-center justify-between">
            <div className="flex lg:flex-1">
              <h1 className="font-black tracking-wider text-xl">
                <span className="text-[#828D91]">Shop</span>
                <span className="text-[#252323]">Ease</span>
              </h1>
            </div>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setShowMenu(false)}
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root ">
            <div className="-my-6 divide-y divide-gray-500/10 ">
              <div className="flex flex-col space-y-2 py-6 h-[500px]">
                <Link
                  to={"/"}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Home
                </Link>
                <Link
                  to={"/products"}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Shop
                </Link>
                {userData !== null && (
                  <Link
                    to={"/account"}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Profile
                  </Link>
                )}
                <div className="flex items-center gap-3">
                  <Link
                    to={"/cart"}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    <p className="relative ">
                      <BsCart4 className="text-xl " />
                      <span className="absolute text-sm text-white font-medium -top-1 left-4 bg-[#828D91] rounded-[50%]  w-full text-center">
                        {cartItems.length}
                      </span>
                    </p>
                  </Link>
                </div>
              </div>
              <div className="py-6">
                {userData?.success || userData?.data?.success ? (
                  <p
                    onClick={signOut}
                    className="cursor-pointer text-sm font-semibold leading-6 text-gray-900 "
                  >
                    Logout
                  </p>
                ) : (
                  <Link
                    to={"/login"}
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in <span aria-hidden="true">&rarr;</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
