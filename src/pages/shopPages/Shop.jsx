import { useState, useEffect, lazy, Suspense } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SidebarFilter, Filters } from "../../component/Product";
import Shimmer from "../../component/skeletons/Shimmer";
import { useGetAllProductsQuery } from "../../features/products/productApi";
import Pagination from "react-js-pagination";
import searchImage from "../../assets/search.png";

const SingleProductCard = lazy(
  () => import("../../component/Product/SingleProductCard"),
);

const PRICE_RANGE = [0, 2500000];
const SEARCH_DEBOUNCE_MS = 500;

const Shop = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getCategoryFromUrl = () => {
    const params = new URLSearchParams(location.search);
    return params.get("category") || "all";
  };

  const [inputKeyword, setInputKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState(getCategoryFromUrl);
  const [ratings, setRatings] = useState(0);
  const [priceV, setPriceV] = useState(PRICE_RANGE[1]);

  const {
    data: product,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetAllProductsQuery({
    keyword: debouncedKeyword.trim(),
    currentPage,
    price: [PRICE_RANGE[0], Number(priceV)],
    category,
    ratings,
  });

  // Debounced search with automatic timeout cleanup.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(inputKeyword.trim());
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [inputKeyword]);

  // Keep the selected category synchronized with browser navigation.
  useEffect(() => {
    const urlCategory = getCategoryFromUrl();
    setCategory((previous) =>
      previous === urlCategory ? previous : urlCategory,
    );
  }, [location.search]);

  // Update the URL whenever the category changes.
  const handleCategoryChange = (nextCategory) => {
    setCategory(nextCategory);

    const params = new URLSearchParams(location.search);

    if (nextCategory === "all") {
      params.delete("category");
    } else {
      params.set("category", nextCategory);
    }

    const query = params.toString();

    navigate(
      {
        pathname: location.pathname,
        search: query ? `?${query}` : "",
        hash: location.hash,
      },
      { replace: true },
    );
  };

  // Return to the first page when search or filters change.
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedKeyword, category, ratings, priceV]);

  const hasProducts = Boolean(product?.products?.length);
  const totalProducts = product?.filteredProductsCount ?? 0;
  const pageSize = product?.resultPerPage ?? 0;

  const startResult = totalProducts > 0 ? (currentPage - 1) * pageSize + 1 : 0;

  const endResult = Math.min(currentPage * pageSize, totalProducts);

  return (
    <main>
      <section>
        <div className="mx-auto my-10 grid max-w-6xl grid-cols-1 gap-6 px-6 md:grid-cols-12">
          {/* Desktop Filters */}
          <aside className="hidden md:col-span-4 md:block lg:col-span-3">
            <Filters
              setInputKeyword={setInputKeyword}
              inputKeyword={inputKeyword}
              setCategory={handleCategoryChange}
              setRatings={setRatings}
              ratings={ratings}
              price={PRICE_RANGE}
              setPriceV={setPriceV}
              priceV={priceV}
              category={category}
            />
          </aside>

          {/* Mobile Filters */}
          <SidebarFilter
            setInputKeyword={setInputKeyword}
            inputKeyword={inputKeyword}
            setCategory={handleCategoryChange}
            setRatings={setRatings}
            ratings={ratings}
            price={PRICE_RANGE}
            setPriceV={setPriceV}
            priceV={priceV}
            category={category}
          />

          {/* Products */}
          <div
            className="min-w-0 md:col-span-8 lg:col-span-9"
            aria-busy={isFetching}
          >
            {error ? (
              <div className="mt-20 flex flex-col items-center text-center">
                <h2 className="mb-4 text-2xl font-semibold">
                  Oops! Something went wrong
                </h2>

                <p className="mb-6 text-gray-500">
                  We couldn't load the products. Please try again.
                </p>

                <button
                  type="button"
                  onClick={() => refetch()}
                  className="rounded bg-black px-5 py-2 text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Try again
                </button>
              </div>
            ) : isLoading ? (
              <Shimmer box={8} />
            ) : !hasProducts ? (
              <div className="mt-20 flex flex-col items-center text-center">
                <h2 className="mb-4 text-2xl font-semibold">
                  No products found
                </h2>

                <p className="mb-6 text-gray-500">
                  Try a different keyword or adjust your filters.
                </p>

                <img
                  src={searchImage}
                  alt=""
                  aria-hidden="true"
                  className="w-48"
                />

                <button
                  type="button"
                  onClick={() => {
                    setInputKeyword("");
                    setDebouncedKeyword("");
                    setRatings(0);
                    setPriceV(PRICE_RANGE[1]);
                    handleCategoryChange("all");
                    setCurrentPage(1);
                  }}
                  className="mt-5 rounded border px-4 py-2 transition hover:bg-gray-100"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                {isFetching && (
                  <p role="status" className="mb-3 text-sm text-gray-500">
                    Updating products…
                  </p>
                )}

                <Suspense fallback={<Shimmer box={8} />}>
                  <div className="grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-3">
                    {product.products.map((item) => (
                      <SingleProductCard key={item._id} item={item} />
                    ))}
                  </div>
                </Suspense>

                {totalProducts > pageSize && (
                  <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <nav aria-label="Product pages">
                      <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={pageSize}
                        totalItemsCount={totalProducts}
                        onChange={setCurrentPage}
                        hideNavigation
                        hideFirstLastPages
                        itemClass="inline-block mx-1 sm:mx-2 px-3 py-1 rounded-sm border"
                        linkClass="text-gray-600 hover:text-primary"
                        activeClass="border-primary !text-black"
                        activeLinkClass="!text-gray-900"
                      />
                    </nav>

                    <p className="text-sm text-gray-500" aria-live="polite">
                      Showing{" "}
                      <span className="font-medium text-gray-900">
                        {startResult}–{endResult}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium text-gray-900">
                        {totalProducts}
                      </span>{" "}
                      products
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Shop;
