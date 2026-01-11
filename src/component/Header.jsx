import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutUserMutation } from "../features/users/userApi";
import { logout } from "../features/users/userSlice";
import NavbarMobile from "./ui/NavbarMobile";
import NavbarDesk from "./ui/NavbarDesk";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [logoutUser] = useLogoutUserMutation();
  const cartItems = useSelector((store) => store.cart.items);
  const userData = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signOut = async () => {
    await logoutUser().unwrap();
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="">
      <nav
        className="mx-auto bg-primary max-w-6xl  flex  gap-8 lg:gap-36 items-center justify-between p-6  md:px-14"
        role="navigation"
        aria-label="Menu Navigation"
      >
        <Link to={"/"} className="flex ">
          <h1 className="font-black tracking-wider text-xl">
            <span className="text-white">Shop</span>
            <span className="text-gray-900">Ease</span>
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
