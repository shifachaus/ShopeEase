import { useEffect, useRef, useState } from "react";
import Search from "./Search";
import { BsStarFill, BsStar } from "react-icons/bs";
import { clearFilter, debounce } from "../../utils/helper";

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
  const debouncedPriceHandler = useRef(null);

  if (!debouncedPriceHandler.current) {
    debouncedPriceHandler.current = debounce((value) => {
      setPriceV(value);
    }, 300);
  }

  const priceHandler = (e) => {
    debouncedPriceHandler.current(e.target.value);
  };

  useEffect(() => {
    return () => {
      debouncedPriceHandler.current?.cancel();
    };
  }, []);

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed right-0 top-0 z-40 h-full w-[260px] sm:w-5/12 bg-white transform transition-transform duration-300 ease-in-out md:hidden
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex h-full flex-col overflow-y-auto p-6">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between pb-4">
            <h2 className="text-lg font-semibold uppercase tracking-wide">
              Filters
            </h2>
            <button
              className="text-sm font-medium text-primary hover:underline"
              onClick={() =>
                clearFilter(setInputKeyword, setCategory, setRatings, setPriceV)
              }
            >
              Clear all
            </button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <Search
              setInputKeyword={setInputKeyword}
              inputKeyword={inputKeyword}
            />
          </div>

          {/* Category */}
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-700">
              Category
            </h3>
            <ul className="flex flex-col gap-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setCategory(cat)}
                    className={`w-full text-left capitalize transition ${
                      category === cat
                        ? "font-medium text-black"
                        : "text-gray-500 hover:text-black"
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Ratings */}
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-700">
              Ratings
            </h3>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setRatings(index + 1)}
                  className="transition hover:scale-110"
                  aria-label={`${index + 1} star rating`}
                >
                  {ratings > index ? (
                    <BsStarFill className="h-4 w-4 fill-yellow-400" />
                  ) : (
                    <BsStar className="h-4 w-4 fill-yellow-400" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-700">
              Price
            </h3>
            <input
              id="price"
              type="range"
              min={price[0]}
              max={price[1]}
              value={priceV}
              step={10}
              onChange={priceHandler}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-primary"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>₹{price[0] / 100}</span>
              <span className="font-medium text-gray-900">₹{priceV / 100}</span>
              <span>₹{price[1] / 100}</span>
            </div>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setOpen(!open)}
          className="absolute inset-y-1/2 -left-10 flex h-10 w-10 items-center justify-center bg-black text-white rounded-l-full"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 320 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 transition-transform  fill-white  ${
              open ? "rotate-180" : ""
            }`}
          >
            <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
          </svg>
        </button>
      </aside>
    </>
  );
};

export default SidebarFilter;
