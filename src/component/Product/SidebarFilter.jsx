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
  const [open, setOpen] = useState(false);
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

  // Prevent background scrolling while the drawer is open.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const priceHandler = (event) => {
    debouncedPriceHandler.current(Number(event.target.value));
  };

  const handleClearFilters = () => {
    debouncedPriceHandler.current?.cancel();

    clearFilter(setInputKeyword, setCategory, setRatings, setPriceV);

    setOpen(false);
  };

  const handleRatingChange = (rating) => {
    setRatings(ratings === rating ? 0 : rating);
  };

  const handleCategoryChange = (nextCategory) => {
    setCategory(nextCategory);
    setOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      {open && (
        <button
          type="button"
          aria-label="Close product filters"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 cursor-default bg-black/40 md:hidden"
        />
      )}

      {/* Mobile filter drawer */}
      <aside
        id="mobile-product-filters"
        role="dialog"
        aria-modal={open ? "true" : undefined}
        aria-label="Product filters"
        aria-hidden={!open}
        inert={!open}
        className={`fixed right-0 top-0 z-50 h-dvh w-[260px] overflow-y-auto bg-white shadow-xl transition-transform duration-300 ease-in-out sm:w-5/12 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex min-h-full flex-col p-6">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between border-b pb-4">
            <h2 className="text-lg font-semibold uppercase tracking-wide">
              Filters
            </h2>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Clear all
              </button>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close filters"
                className="rounded p-1 text-xl text-gray-600 hover:bg-gray-100 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                &times;
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="mb-6">
            <Search
              setInputKeyword={setInputKeyword}
              inputKeyword={inputKeyword}
            />
          </div>

          {/* Category */}
          <fieldset className="mb-6">
            <legend className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-700">
              Category
            </legend>

            <ul className="flex flex-col gap-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    type="button"
                    aria-pressed={category === cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`w-full rounded-sm py-1 text-left capitalize transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
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
          <fieldset className="mb-6">
            <legend className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-700">
              Rating
            </legend>

            <div className="flex items-center gap-2">
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
                        className="h-5 w-5 text-yellow-400"
                      />
                    ) : (
                      <BsStar
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-400"
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
                className="mt-2 text-xs text-gray-500 underline hover:text-black"
              >
                Clear rating
              </button>
            )}
          </fieldset>

          {/* Price */}
          <div className="mb-6">
            <label
              htmlFor="mobile-price"
              className="mb-3 block text-sm font-semibold uppercase tracking-wider text-gray-700"
            >
              Price
            </label>

            <input
              id="mobile-price"
              type="range"
              min={price[0]}
              max={price[1]}
              step={10}
              value={Math.min(price[1], Math.max(price[0], priceV))}
              onChange={priceHandler}
              aria-valuetext={`₹${(priceV / 100).toLocaleString("en-IN")}`}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />

            <div className="mt-2 flex justify-between gap-2 text-sm text-gray-600">
              <span>₹{(price[0] / 100).toLocaleString("en-IN")}</span>

              <output
                htmlFor="mobile-price"
                className="font-medium text-gray-900"
              >
                ₹{(priceV / 100).toLocaleString("en-IN")}
              </output>

              <span>₹{(price[1] / 100).toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Drawer toggle: stays visible even when the drawer is closed */}
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-label={open ? "Close product filters" : "Open product filters"}
        aria-expanded={open}
        aria-controls="mobile-product-filters"
        className={`fixed top-1/2 z-[60] flex h-11 w-10 -translate-y-1/2 items-center justify-center rounded-l-full bg-black text-white shadow-lg transition-all duration-300 md:hidden ${
          open ? "right-[260px] sm:right-[41.666667%]" : "right-0"
        }`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 320 512"
          className={`h-4 w-4 fill-current transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
        </svg>
      </button>
    </>
  );
};

export default SidebarFilter;
