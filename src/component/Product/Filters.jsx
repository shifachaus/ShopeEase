import { useState } from "react";
import Search from "./Search";
import { BsStarFill, BsStar } from "react-icons/bs";
import { clearFilter } from "../../utils/helper";

const categories = ["all", "Tables and Chairs", "Sofas", "Lighting", "Decor"];

const Filters = ({
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
    <aside className="border rounded  sticky top-0  hidden h-fit  flex-col space-y-8  p-8 font-light  md:flex ">
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
            <p className="text-end"> RS.{priceV / 100} </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Filters;
