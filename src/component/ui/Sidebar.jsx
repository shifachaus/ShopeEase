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
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "bg-gray-200 text-gray-900 flex items-center p-2 rounded-lg transition"
      : "text-gray-100 hover:text-gray-900 hover:bg-gray-200 flex items-center p-2 rounded-lg transition";

  return (
    <section>
      {/* Mobile toggle button */}
      <button
        onClick={() => setShow(true)}
        className="md:hidden inline-flex items-center p-2 m-2 text-gray-900 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <HiOutlineMenuAlt2 className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <aside
        className={`
    fixed top-0 left-0 z-40 h-screen bg-white text-black  shadow-lg
    transition-transform duration-300
    ${show ? "translate-x-0" : "-translate-x-full"}
    w-64 md:w-20 lg:w-64
    md:translate-x-0
  `}
      >
        <div className="h-full px-3 py-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="flex items-center ">
              <h1 className="text-lg font-black tracking-wider text-primary md:hidden lg:inline">
                Shop<span className="text-gray-900">Ease</span>
              </h1>
            </Link>
            <button
              onClick={() => setShow(false)}
              className="md:hidden mb-2 p-2 rounded-full bg-white/20 text-black"
            >
              <IoMdClose className="w-6 h-6" />
            </button>
          </div>

          <ul className="space-y-2 font-medium">
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
                  className={({ isActive }) =>
                    `${navLinkClass} flex items-center md:justify-center justify-start lg:justify-start gap-3`
                  }
                >
                  <span className="text-black">{icon}</span>

                  {/* Hide text on md, show on lg */}
                  <span className="md:hidden lg:inline text-black">
                    {label}
                  </span>
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
