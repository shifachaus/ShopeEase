import ProductList from "./ProductList";
import Shimmer from "./Shimmer";
import { useGetAllProductsQuery } from "../utils/productApi";
import Search from "./Search";
import { useState } from "react";
import Pagination from "react-js-pagination";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const categories = [
  "All",
  "table",
  "footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = () => {
  const [inputKeyword, setInputKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("all");
  const [ratings, setRatings] = useState(0);

  const [price] = useState([0, 250000]);
  const [priceV, setPriceV] = useState(250000);

  console.log(category, "ca");

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

  console.log(product?.products, ratings);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e.targer.value);
  };

  const priceHandler = (e) => {
    setPriceV(e.target.value);
    console.log(priceV);
    // setPrice(newPrice);
  };

  if (error) {
    return (
      <p className="text-center font-medium mt-5 capitalize">
        oops! something went wrong...
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-7xl  p-6 lg:px-8 lg:grid lg:grid-flow-col">
      <div className="col-span-1 mb-4">
        <Search setInputKeyword={setInputKeyword} inputKeyword={inputKeyword} />
        <div className="filterbox">
          <div>
            <p>Price</p>
            <p>RS.{priceV}</p>
            <input
              type="range"
              min={price[0]}
              max={price[1]}
              value={priceV}
              step={10}
              onChange={(e) => priceHandler(e)}
              className=" h-1 mb-6 rounded-lg appearance-none cursor-pointer range-sm bg-gray-700"
            />
          </div>

          <div>
            <p>Category</p>
            <ul>
              {categories?.map((category) => {
                return (
                  <li
                    key={category}
                    onClick={() => setCategory(category.toLocaleLowerCase())}
                  >
                    {category}
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <p>Ratings</p>
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
        </div>
      </div>

      <div className="col-span-11">
        {isLoading ? (
          <Shimmer />
        ) : product?.products?.length ? (
          <>
            <div className=" grid sm:grid-cols-2 gap-4 md:grid-cols-3  ">
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
  );
};

export default Products;
