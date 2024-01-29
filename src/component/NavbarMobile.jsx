import { Link } from "react-router-dom";
import { PiShoppingCartSimple } from "react-icons/pi";

const NavbarMobile = ({
  showMenu,
  setShowMenu,
  userData,
  cartItems,
  signOut,
}) => {
  return (
    <nav
      className={`z-50 fixed inset-y-0 right-0 overflow-y-auto bg-white px-6 py-6  w-[240px]  h-screen transition-transform ${
        showMenu ? "translate-x-1" : "translate-x-full"
      } `}
      role="dialog"
      aria-modal="true"
      aria-label="Menu Navigation"
    >
      <div>
        <div className="flex items-center justify-between">
          <div className="flex lg:flex-1">
            <h1 className="font-black tracking-wider text-xl">
              <span className="text-[#688272]">Shop</span>
              <span className="text-[#252323]">Ease</span>
            </h1>
          </div>
          <button
            type="button"
            aria-label="Close Menu"
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
            onClick={() => setShowMenu(false)}
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

              {userData !== null && userData?.user?.role === "admin" && (
                <Link
                  to={"/admin/dashboard"}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Dashboard
                </Link>
              )}
              <div className="flex items-center gap-3">
                <Link
                  to={"/cart"}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  <p className="relative ">
                    <PiShoppingCartSimple className="text-xl " />
                    <span className="absolute text-sm text-white font-medium -top-1 left-4 bg-[#688272] rounded-[50%]  w-full text-center">
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
    </nav>
  );
};

export default NavbarMobile;
