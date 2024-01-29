import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutUserMutation } from "../utils/userApi";
import { logout } from "../utils/userSlice";
import NavbarMobile from "./NavbarMobile";
import NavbarDesk from "./NavbarDesk";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [logoutUser] = useLogoutUserMutation();
  const cartItems = useSelector((store) => store.cart.items);
  const userData = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signOut = async () => {
    const data = await logoutUser();

    dispatch(logout());
    navigate("/");
  };

  return (
    <header className=" bg-[#688272]">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 md:pb-8 md:pt-8 lg:px-8"
        role="dialog"
        aria-modal="true"
        aria-label="Menu Navigation"
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
            aria-label="Open Menu"
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

        {/* Desktop */}
        <NavbarDesk
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          userData={userData}
          cartItems={cartItems}
          signOut={signOut}
        />
      </nav>

      {/*Mobile  Navbar */}
      <NavbarMobile
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        userData={userData}
        cartItems={cartItems}
        signOut={signOut}
      />
    </header>
  );
};

export default Header;
