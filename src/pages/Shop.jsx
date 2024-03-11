import { useState, useMemo, useEffect } from "react";
import { ProductList, SidebarFilter, Filters } from "../component/Product";
import Shimmer from "../component/Shimmer";
import { useGetAllProductsQuery } from "../utils/productApi";
import Pagination from "react-js-pagination";
import searchImage from "../assets/search.png";
import { debounce } from "../utils/helper";

const Shop = () => {
  const [inputKeyword, setInputKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("all");
  const [ratings, setRatings] = useState(0);
  const [price] = useState([0, 2500000]);
  const [priceV, setPriceV] = useState(3000000);

  const {
    data: product,
    error,
    isLoading,
  } = useGetAllProductsQuery({
    keyword: debouncedKeyword,
    currentPage: currentPage,
    price: [0, Number(priceV)],
    category: category,
    ratings: ratings,
  });

  useEffect(() => {
    const debouncedInputKeyword = debounce(setDebouncedKeyword, 1000);
    debouncedInputKeyword(inputKeyword);

    return () => {
      debouncedInputKeyword.cancel();
    };
  }, [inputKeyword]);

  const setCurrentPageNo = (page) => {
    setCurrentPage(page);
  };

  // Render products based on data, error, and loading state
  const renderProducts = useMemo(() => {
    // Error state
    if (error) {
      return (
        <div
          role="alert"
          className="mt-10 md:mt-20 max-w-sx flex flex-col items-center p-3 w-full h-screen"
        >
          <h2 className="mb-4 text-2xl md:text-3xl tracking-tight font-medium ">
            Oops! Something went wrong...
          </h2>
          <p className="mb-4 text-lg font-light text-gray-500">
            Please try again later.
          </p>
        </div>
      );
    }

    // Loading state
    if (isLoading) {
      return <Shimmer box={8} />;
    }

    // Empty product state
    if (product?.products?.length === 0) {
      return (
        <div
          role="alert"
          className="mt-10 md:mt-20 max-w-sx flex flex-col items-center p-3 w-full h-screen"
        >
          <h2 className="mb-4 text-2xl md:text-3xl tracking-tight font-medium ">
            No results found
          </h2>
          <p className="mb-4 text-lg font-light text-gray-500">
            Try another keyword!
          </p>
          <img src={searchImage} alt="search image" />
        </div>
      );
    }

    // Render products
    return (
      <>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {product?.products?.map((item) => (
            <ProductList key={item?._id} item={item} />
          ))}
        </div>
        {product?.resultPerPage < product?.filteredProductsCount && (
          <div className="flex justify-center mt-12">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={product?.resultPerPage}
              totalItemsCount={product?.productsCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              itemClass="inline-block px-3 py-1 rounded-md border border-gray-300 mr-1 md:mr-6"
              linkClass="text-gray-500 hover:text-gray-700 cursor-pointer"
              activeClass="bg-[#688272] !text-white"
              activeLinkClass="!text-white"
            />
          </div>
        )}
      </>
    );
  }, [error, isLoading, product, currentPage, setCurrentPageNo]);

  return (
    <main>
      <section aria-labelledby="shop-heading">
        <h1 id="shop-heading" className="sr-only">
          Shop
        </h1>
        <div className="mx-auto max-w-7xl p-6 my-10 lg:px-8 md:grid md:grid-flow-col gap-4">
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

          <div className="col-span-11 px-4">{renderProducts}</div>
        </div>
      </section>
    </main>
  );
};

export default Shop;
