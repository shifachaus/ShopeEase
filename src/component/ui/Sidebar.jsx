import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BsBox2Fill } from "react-icons/bs";
import { MdRateReview } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { FaShoppingBag } from "react-icons/fa";
import { BiSolidDashboard } from "react-icons/bi";
import { MdCreate } from "react-icons/md";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

const Sidebar = () => {
  const [show, setShow] = useState(false);

  return (
    <section>
      {/* Mobile toggle button */}
      <button
        onClick={() => setShow(true)}
        className="md:hidden inline-flex items-center p-2 m-6  text-gray-900 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <HiOutlineMenuAlt2 className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <aside
        className={`
    fixed top-0 left-0 z-40 h-screen bg-white text-black border border-l border-neutral-100
    transition-transform duration-300
    ${show ? "translate-x-0" : "-translate-x-full"}
    w-64 md:w-20 lg:w-64
    md:translate-x-0
  `}
      >
        <div className="h-full px-4 flex flex-col">
          <div className="flex items-center justify-between my-8 px-4">
            <Link to="/" className="flex items-center">
              <h1 className="font-heading text-lg font-bold tracking-tight text-primary md:hidden lg:inline">
                Shop
                <span className="font-body font-semibold text-gray-900">
                  Ease
                </span>
              </h1>
            </Link>
            <button
              onClick={() => setShow(false)}
              className="md:hidden rounded-full bg-white/20 text-black"
            >
              <IoMdClose className="w-6 h-6" />
            </button>
          </div>

          <ul className="space-y-4 font-medium">
            {[
              {
                to: "/admin/dashboard",
                label: "Dashboard",
                icon: <BiSolidDashboard className="w-5 h-5" />,
              },
              {
                to: "/admin/products",
                label: "All Products",
                icon: <FaShoppingBag className="w-4 h-4" />,
              },
              {
                to: "/admin/product",
                label: "Create Product",
                icon: <MdCreate className="w-4 h-4" />,
              },
              {
                to: "/admin/users",
                label: "Users",
                icon: <HiUsers className="w-5 h-5" />,
              },
              {
                to: "/admin/orders",
                label: "Orders",
                icon: <BsBox2Fill className="w-5 h-5" />,
              },
              {
                to: "/admin/reviews",
                label: "Reviews",
                icon: <MdRateReview className="w-5 h-5" />,
              },
            ].map(({ to, label, icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={() => setShow(false)}
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "bg-[#2E2E2E] text-white"
                        : "text-[#2E2E2E] hover:bg-neutral-100 hover:text-"
                    } flex items-center md:justify-center lg:justify-start gap-4 p-3.5 rounded-xl transition-colors duration-200`
                  }
                >
                  <span className="shrink-0">{icon}</span>

                  <span className="md:hidden lg:inline">{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </section>
  );
};

export default Sidebar;
