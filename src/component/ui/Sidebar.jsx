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
  const [open, setOpen] = useState(false); // Products dropdown
  const [show, setShow] = useState(false); // Mobile sidebar

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
    fixed top-0 left-0 z-40 h-screen bg-[#497c5c] shadow-lg
    transition-transform duration-300
    ${show ? "translate-x-0" : "-translate-x-full"}
    w-64 md:w-20 lg:w-64
    md:translate-x-0
  `}
      >
        <div className="h-full px-3 py-6 flex flex-col">
          {/* Mobile Close Button */}
          <div className="flex items-center justify-between mb-6">
            {/* Logo */}
            <Link to="/" className="flex items-center ">
              <h1 className="text-lg font-black tracking-wider text-white md:hidden lg:inline">
                Shop<span className="text-gray-900">Ease</span>
              </h1>
            </Link>
            <button
              onClick={() => setShow(false)}
              className="md:hidden mb-2 p-2 rounded-full bg-white/20 text-white"
            >
              <IoMdClose className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <ul className="flex-1 space-y-2 font-medium">
            <li className="md:flex md:items-center  md:justify-center lg:inline">
              <NavLink to="/admin/dashboard" className={navLinkClass}>
                <BiSolidDashboard className="w-5 h-5 mx-auto lg:mx-0 sm:mx-0" />
                {/* Text only on large */}
                <span className="md:hidden  lg:inline ml-3">Dashboard</span>
              </NavLink>
            </li>

            <li className="md:flex md:items-center  md:justify-center lg:inline">
              <NavLink to="/admin/products" className={navLinkClass}>
                <FaShoppingBag className="w-4 h-4" />
                <span className="md:hidden lg:inline ml-3">All Products</span>
              </NavLink>
            </li>
            <li className="md:flex md:items-center  md:justify-center lg:inline">
              <NavLink to="/admin/product" className={navLinkClass}>
                <MdCreate className="w-4 h-4" />
                <span className="md:hidden lg:inline ml-3">Create Product</span>
              </NavLink>
            </li>

            <li className="md:flex md:items-center  md:justify-center lg:inline">
              <NavLink to="/admin/users" className={navLinkClass}>
                <HiUsers className="w-5 h-5 mx-auto lg:mx-0 sm:mx-0" />
                <span className="md:hidden lg:inline ml-3">Users</span>
              </NavLink>
            </li>

            <li className="md:flex md:items-center  md:justify-center lg:inline">
              <NavLink to="/admin/orders" className={navLinkClass}>
                <BsBox2Fill className="w-5 h-5 mx-auto lg:mx-0 sm:mx-0" />
                <span className="md:hidden lg:inline ml-3">Orders</span>
              </NavLink>
            </li>

            <li className="md:flex md:items-center  md:justify-center lg:inline">
              <NavLink to="/admin/reviews" className={navLinkClass}>
                <MdRateReview className="w-5 h-5 mx-auto lg:mx-0 sm:mx-0" />
                <span className="md:hidden lg:inline ml-3">Reviews</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </section>
  );
};

export default Sidebar;
