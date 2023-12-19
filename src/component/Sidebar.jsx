import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BsBox2Fill } from "react-icons/bs";
import { MdRateReview } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { FaShoppingBag } from "react-icons/fa";
import { BiSolidDashboard } from "react-icons/bi";
import { AiOutlineDown } from "react-icons/ai";
import { MdCreate } from "react-icons/md";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  return (
    <section>
      <button
        onClick={() => setShow(true)}
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className=" inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-900 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
      >
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          show ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto shadow-md bg-[#688272] ">
          <button
            onClick={() => setShow(false)}
            data-drawer-target="default-sidebar"
            data-drawer-toggle="default-sidebar"
            aria-controls="default-sidebar"
            type="button"
            className=" inline-flex items-center p-2   text-sm text-gray-900 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
          >
            <HiOutlineMenuAlt2 className="w-6 h-6" />
          </button>
          <Link
            to="/"
            className="flex lg:flex-1 items-center p-2 text-gray-900 rounded-lg  group mb-10"
          >
            <h1 className="font-black tracking-wider text-xl">
              <span className="text-white">Shop</span>
              <span className="text-[#252323]">Ease</span>
            </h1>
          </Link>

          <ul className="space-y-6 font-medium">
            <li>
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-100  flex items-center p-2  text-gray-900 rounded-lg   group"
                    : "flex items-center p-2 hover:text-gray-900 rounded-lg text-neutral-100  hover:bg-gray-100 group"
                }
              >
                <BiSolidDashboard className="flex-shrink-0 w-5 h-5 text-gray-900 transition duration-75   " />

                <span className="flex-1 ml-3 whitespace-nowrap">Dashboard</span>
              </NavLink>
            </li>

            <li onClick={() => setOpen(true)} className="cursor-pointer">
              <span className="flex items-center p-2 text-neutral-100 hover:text-gray-900 rounded-lg  hover:bg-gray-100  group">
                <AiOutlineDown className="flex-shrink-0 w-5 h-5 text-gray-900 transition duration-75   " />
                <span className="flex-1 ml-3 whitespace-nowrap">Products</span>
              </span>
            </li>

            <ul
              className={
                open
                  ? "ml-4  font-medium flex flex-col  text-neutral-100 "
                  : "hidden"
              }
            >
              <li>
                <NavLink
                  to="/admin/products"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-gray-100  flex items-center p-2  text-gray-900 rounded-lg   group"
                      : "flex items-center p-2 hover:text-gray-900 rounded-lg text-neutral-100  hover:bg-gray-100 group"
                  }
                >
                  <FaShoppingBag className="flex-shrink-0 w-5 h-5 text-gray-900 transition duration-75  " />
                  <span className="flex-1 ml-3 whitespace-nowrap">All</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/product"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-gray-100  flex items-center p-2  text-gray-900 rounded-lg   group"
                      : "flex items-center p-2 hover:text-gray-900 rounded-lg text-neutral-100  hover:bg-gray-100 group"
                  }
                >
                  <MdCreate className="flex-shrink-0 w-5 h-5 text-gray-900 transition duration-75  " />
                  <span className="flex-1 ml-3 whitespace-nowrap">Create</span>
                </NavLink>
              </li>
            </ul>

            <li>
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-100  flex items-center p-2  text-gray-900 rounded-lg   group"
                    : "flex items-center p-2 hover:text-gray-900 rounded-lg text-neutral-100  hover:bg-gray-100 group"
                }
              >
                <HiUsers className="flex-shrink-0 w-5 h-5 text-gray-900 transition duration-75  " />
                <span className="flex-1 ml-3 whitespace-nowrap">Users</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/orders"
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-100  flex items-center p-2  text-gray-900 rounded-lg   group"
                    : "flex items-center p-2 hover:text-gray-900 rounded-lg text-neutral-100  hover:bg-gray-100 group"
                }
              >
                <BsBox2Fill className="flex-shrink-0 w-5 h-5 text-gray-900 transition duration-75   " />
                <span className="flex-1 ml-3 whitespace-nowrap">Orders</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/admin/reviews"
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-100  flex items-center p-2  text-gray-900 rounded-lg   group"
                    : "flex items-center p-2 hover:text-gray-900 rounded-lg text-neutral-100  hover:bg-gray-100 group"
                }
              >
                <MdRateReview className="flex-shrink-0 w-5 h-5 transition duration-75  text-gray-900 " />
                <span className="flex-1 ml-3 whitespace-nowrap">Reviews</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </section>
  );
};

export default Sidebar;
