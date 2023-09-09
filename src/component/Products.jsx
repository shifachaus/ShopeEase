import ProductList from "./ProductList";
import Shimmer from "./Shimmer";
import { useGetAllProductsQuery } from "../utils/productApi";
import { useState } from "react";
import Pagination from "react-js-pagination";

import Filters from "./filters";

const Products = () => {
  const [inputKeyword, setInputKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("all");
  const [ratings, setRatings] = useState(0);

  const [price] = useState([0, 250000]);
  const [priceV, setPriceV] = useState(250000);
  const [open, setOpen] = useState(false);

  // console.log(category, "ca");

  const {
    data: product,
    error,
    isLoading,
  } = useGetAllProductsQuery({
    keyword: inputKeyword,
    currentPage: currentPage,
    price: [0, Number(priceV)],
    category: category,
    ratings: ratings,
  });

  // console.log(product?.products, ratings);

  const setCurrentPageNo = (page) => {
    console.log(page);
    setCurrentPage(page);
  };

  return (
    <section>
      <div className="sticky top-80 flex justify-end md:hidden">
        <span className="bg-black p-2" onClick={() => setOpen(true)}>
          <svg
            className="h-5 w-5 z-10 fill-white  "
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
      </div>
      <div className="mx-auto max-w-7xl  p-6 lg:px-8 md:grid md:grid-flow-col gap-4 ">
        {/* DESKTOP */}
        <div className="hidden md:block">
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

        {/* MOBILE */}
        {open && (
          <div
            className="relative z-40 md:hidden"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25"></div>

            <div className="fixed inset-0 z-40 flex">
              <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

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
            </div>
          </div>
        )}

        <div className="col-span-11 p-4">
          {error ? (
            <p className="text-center font-medium mt-5 capitalize h-screen">
              oops! something went wrong...
            </p>
          ) : isLoading ? (
            <Shimmer />
          ) : product?.products?.length ? (
            <>
              <div className=" grid grid-cols-2 gap-4 md:grid-cols-3  ">
                {product?.products?.map((item) => {
                  return <ProductList key={item?._id} item={item} />;
                })}
              </div>
              {product?.resultPerPage < product?.filteredProductsCount && (
                <div className="flex justify-center mt-6">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={product?.resultPerPage}
                    totalItemsCount={product?.productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    // firstPageText="1st"
                    // lastPageText="Last"
                    itemClass="inline-block px-3 py-1 rounded-md border border-gray-300 mr-2"
                    linkClass="text-gray-500 hover:text-gray-700 cursor-pointer"
                    activeClass="bg-purple-500 !text-white"
                    activeLinkClass="!text-white"
                  />
                </div>
              )}
            </>
          ) : (
            <p className="font-medium text-center text-md capitalize">
              Sorry, no products matched your search.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;
