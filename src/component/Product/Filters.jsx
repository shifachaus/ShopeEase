import Search from "./Search";
import { BsStarFill, BsStar } from "react-icons/bs";
import { clearFilter, debounce } from "../../utils/helper";
import { useEffect, useRef } from "react";

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

  return (
    <aside className="sticky top-4 hidden h-fit w-full max-w-xs flex-col gap-8 rounded-md border bg-white p-6 md:flex">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
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
      <div>
        <Search setInputKeyword={setInputKeyword} inputKeyword={inputKeyword} />
      </div>

      {/* Category */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-700">
          Category
        </h3>
        <ul className="flex flex-col gap-2">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                type="button"
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
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-700">
          Ratings
        </h3>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setRatings(index + 1)}
              className="cursor-pointer transition hover:scale-110"
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
      <div className="flex flex-col gap-3">
        <label
          htmlFor="price"
          className="text-sm font-semibold uppercase tracking-wider text-gray-700"
        >
          Price
        </label>

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
    </aside>
  );
};

export default Filters;
