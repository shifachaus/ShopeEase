import { useState } from "react";
import Search from "./Search";
import { BsStarFill, BsStar } from "react-icons/bs";
import { clearFilter } from "../../utils/helper";

const categories = ["all", "Tables and Chairs", "Sofas", "Lighting", "Decor"];

const SidebarFilter = ({
  setInputKeyword,
  inputKeyword,
  setPriceV,
  price,
  priceV,
  setCategory,
  setRatings,
  ratings,
  category,
}) => {
  const priceHandler = (e) => {
    setPriceV(e.target.value);
  };

  const [open, setOpen] = useState(false);
  return (
    <aside
      className={
        open
          ? "md:hidden bg-white p-4 z-40  md:p-8 h-full font-light md:border xsm:translate-x-full transform transition-all delay-150 duration-300 ease-out fixed top-0 right-0 w-[240px] sm:w-5/12"
          : "md:hidden bg-white z-40 md:p-8 translate-x-full transform transition-all delay-150 duration-300 ease-out h-full fixed top-0 right-0 w-[240px] sm:w-5/12"
      }
    >
      <div className="flex justify-between mb-6">
        <h2 className="text-xl uppercase ">Filter by</h2>
        <button
          className="text-sm capitalize text-primary text-[#565E60]"
          onClick={() => {
            clearFilter(setInputKeyword, setCategory, setRatings, setPriceV);
          }}
        >
          Clear all
        </button>
      </div>

      <div className="col-span-1 mb-4">
        <Search setInputKeyword={setInputKeyword} inputKeyword={inputKeyword} />
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-3 mb-5 ">
            <h2 className=" font-medium capitalize tracking-wider">Category</h2>
            <ul className="flex flex-col gap-2">
              {categories?.map((cat) => {
                return (
                  <li
                    className={
                      category == cat
                        ? "text-[#565E60]  text-lg font-normal capitalize cursor-pointer"
                        : `text-md capitalize cursor-pointer font-normal`
                    }
                    key={cat}
                    onClick={() => setCategory(cat)}
                  >
                    {cat}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex flex-col gap-3 mb-5 ">
            <h2 className=" font-medium capitalize tracking-wider">Ratings</h2>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => {
                return (
                  <span
                    key={index}
                    className="cursor-pointer"
                    onClick={() => setRatings(index + 1)}
                  >
                    {ratings > index ? (
                      <BsStarFill className="fill-yellow-400" />
                    ) : (
                      <BsStar className="fill-yellow-400" />
                    )}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="price"
              className=" font-medium capitalize tracking-wider"
            >
              price
            </label>
            <input
              type="range"
              min={price[0]}
              max={price[1]}
              value={priceV}
              step={10}
              onChange={(e) => priceHandler(e)}
              className=" h-2 mb-6 rounded-lg  cursor-pointer range-sm bg-gray-700"
            />
            <p className="text-end"> RS.{priceV} </p>
          </div>

          <div
            className="md:hidden absolute inset-y-1/2 -left-10"
            onClick={() => setOpen(!open)}
          >
            <button className=" bg-black px-3 py-3 hover:bg-primary">
              {" "}
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 320 512"
                className=" fill-white "
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarFilter;
