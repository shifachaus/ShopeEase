import { useEffect, useRef } from "react";
import { BsStarFill, BsStar } from "react-icons/bs";
import { clearFilter, debounce } from "../../utils/helper";
import Search from "./Search";

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
      setPriceV(Number(value));
    }, 300);
  }

  useEffect(() => {
    return () => {
      debouncedPriceHandler.current?.cancel();
    };
  }, []);

  const priceHandler = (event) => {
    debouncedPriceHandler.current(Number(event.target.value));
  };

  const handleClearFilters = () => {
    // Cancel any pending price update before resetting filters.
    debouncedPriceHandler.current?.cancel();

    clearFilter(setInputKeyword, setCategory, setRatings, setPriceV);
  };

  const handleRatingChange = (rating) => {
    // Clicking the selected rating clears the rating filter.
    setRatings(ratings === rating ? 0 : rating);
  };

  return (
    <aside className="sticky top-4 hidden h-fit w-full max-w-xs flex-col gap-8 rounded-sm border bg-white p-6 md:flex">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-lg font-semibold uppercase tracking-wide">
          Filters
        </h2>

        <button
          type="button"
          onClick={handleClearFilters}
          className="text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Clear all
        </button>
      </div>

      {/* Search */}
      <div>
        <Search setInputKeyword={setInputKeyword} inputKeyword={inputKeyword} />
      </div>

      {/* Category */}
      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-700">
          Category
        </legend>

        <ul className="flex flex-col gap-2">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                type="button"
                aria-pressed={category === cat}
                onClick={() => setCategory(cat)}
                className={`w-full text-left capitalize transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  category === cat
                    ? "font-semibold text-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </fieldset>

      {/* Ratings */}
      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-700">
          Rating
        </legend>

        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }, (_, index) => {
            const rating = index + 1;
            const selected = ratings >= rating;

            return (
              <button
                key={rating}
                type="button"
                onClick={() => handleRatingChange(rating)}
                aria-label={`${rating} star${rating > 1 ? "s" : ""} and above`}
                aria-pressed={ratings === rating}
                className="rounded-sm transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {selected ? (
                  <BsStarFill
                    aria-hidden="true"
                    className="h-4 w-4 text-yellow-400"
                  />
                ) : (
                  <BsStar
                    aria-hidden="true"
                    className="h-4 w-4 text-yellow-400"
                  />
                )}
              </button>
            );
          })}
        </div>

        {ratings > 0 && (
          <button
            type="button"
            onClick={() => setRatings(0)}
            className="self-start text-xs text-gray-500 underline hover:text-black"
          >
            Clear rating
          </button>
        )}
      </fieldset>

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
          value={Math.min(price[1], Math.max(price[0], priceV))}
          step={10}
          onChange={priceHandler}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />

        <div className="flex justify-between gap-2 text-sm text-gray-600">
          <span>₹{(price[0] / 100).toLocaleString("en-IN")}</span>

          <output htmlFor="price" className="font-medium text-gray-900">
            ₹{(priceV / 100).toLocaleString("en-IN")}
          </output>

          <span>₹{(price[1] / 100).toLocaleString("en-IN")}</span>
        </div>
      </div>
    </aside>
  );
};

export default Filters;
