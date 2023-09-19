import ProductList from "./ProductList";
import Shimmer from "./Shimmer";
import { useGetAllProductsQuery } from "../utils/productApi";
import { useState } from "react";
import Pagination from "react-js-pagination";
import Filters from "./Filters";
import SidebarFilter from "./SidebarFilter";

const Products = () => {
  const [inputKeyword, setInputKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("all");
  const [ratings, setRatings] = useState(0);

  const [price] = useState([0, 2500000]);
  const [priceV, setPriceV] = useState(4000000);
  const [open, setOpen] = useState(false);

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

  const setCurrentPageNo = (page) => {
    console.log(page);
    setCurrentPage(page);
  };

  return (
    <section>
      <div className="mx-auto max-w-7xl  p-6 my-10  lg:px-8 md:grid md:grid-flow-col gap-4 ">
        {/* DESKTOP */}
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

        {/* MOBILE */}
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

        <div className="col-span-11 px-4">
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
                <div className="flex justify-center mt-12">
                  <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={product?.resultPerPage}
                    totalItemsCount={product?.productsCount}
                    onChange={setCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    // firstPageText="1st"
                    // lastPageText="Last"
                    itemClass="inline-block px-3 py-1 rounded-md border border-gray-300 mr-1 md:mr-6"
                    linkClass="text-gray-500 hover:text-gray-700 cursor-pointer"
                    activeClass="bg-[#565E60] !text-white"
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
