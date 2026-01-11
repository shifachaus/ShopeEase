import { useState, useMemo, useEffect } from "react";
import { ProductList, SidebarFilter, Filters } from "../../component/Product";
import Shimmer from "../../component/skeletons/Shimmer";
import { useGetAllProductsQuery } from "../../features/products/productApi";
import Pagination from "react-js-pagination";
import searchImage from "../../assets/search.png";
import { debounce } from "../../utils/helper";
import { useLocation } from "react-router-dom";

const Shop = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryFromUrl = searchParams.get("category");

  const [inputKeyword, setInputKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState(categoryFromUrl || "all");
  const [ratings, setRatings] = useState(0);
  const [price] = useState([0, 2500000]);
  const [priceV, setPriceV] = useState(3000000);

  const {
    data: product,
    error,
    isLoading,
  } = useGetAllProductsQuery({
    keyword: debouncedKeyword,
    currentPage,
    price: [0, Number(priceV)],
    category,
    ratings,
  });

  /* 🔹 Debounced search */
  useEffect(() => {
    const debouncedFn = debounce(setDebouncedKeyword, 800);
    debouncedFn(inputKeyword);

    return () => debouncedFn.cancel();
  }, [inputKeyword]);

  /* 🔹 Reset page when filters change */
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedKeyword, category, ratings, priceV]);

  const setCurrentPageNo = (page) => setCurrentPage(page);

  const renderProducts = useMemo(() => {
    if (error) {
      return (
        <div className="mt-20 flex flex-col items-center">
          <h2 className="text-3xl font-medium mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-500">Please try again later.</p>
        </div>
      );
    }

    if (isLoading) return <Shimmer box={8} />;

    if (!product?.products?.length) {
      return (
        <div className="mt-20 flex flex-col items-center">
          <h2 className="text-3xl font-medium mb-4">No results found</h2>
          <p className="text-gray-500 mb-6">Try another keyword</p>
          <img src={searchImage} alt="No results" className="w-48" />
        </div>
      );
    }

    return (
      <>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8">
          {product.products.map((item) => (
            <ProductList key={item._id} item={item} />
          ))}
        </div>

        {product.filteredProductsCount > product.resultPerPage && (
          <div className="flex justify-center mt-12">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={product.resultPerPage}
              totalItemsCount={product.filteredProductsCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              itemClass="inline-block mx-1 px-3 py-1 rounded-md border"
              linkClass="text-gray-600 hover:text-primary"
              activeClass="bg-primary !text-white"
              activeLinkClass="!text-white"
            />
          </div>
        )}
      </>
    );
  }, [error, isLoading, product, currentPage]);

  return (
    <main>
      <section>
        <div className="mx-auto max-w-6xl my-10 px-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Desktop Filters */}
          <div className="hidden md:block md:col-span-3">
            <Filters
              setInputKeyword={setInputKeyword}
              inputKeyword={inputKeyword}
              setCategory={setCategory}
              setRatings={setRatings}
              ratings={ratings}
              price={price}
              setPriceV={setPriceV}
              priceV={priceV}
              category={category}
            />
          </div>

          {/* Mobile Filters */}
          <SidebarFilter
            setInputKeyword={setInputKeyword}
            inputKeyword={inputKeyword}
            setCategory={setCategory}
            setRatings={setRatings}
            ratings={ratings}
            price={price}
            setPriceV={setPriceV}
            priceV={priceV}
            category={category}
          />

          {/* Products */}
          <div className="md:col-span-9">{renderProducts}</div>
        </div>
      </section>
    </main>
  );
};

export default Shop;
