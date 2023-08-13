import ProductList from "./ProductList";
import Shimmer from "./Shimmer";
import { useGetAllProductsQuery } from "../utils/productApi";
import Search from "./Search";
import { useState } from "react";

const Body = () => {
  const [inputKeyword, setInputKeyword] = useState("");
  const {
    data: product,
    error,
    isLoading,
  } = useGetAllProductsQuery({
    keyword: inputKeyword,
    // currentPage: "",
    // price: "", // example price range
    // category: "",
    // ratings: "",
  });
  console.log(product?.products);
  if (error) {
    return (
      <p className="text-center font-medium mt-5 capitalize">
        oops! something went wrong...
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-7xl  p-6 lg:px-8">
      <Search setInputKeyword={setInputKeyword} inputKeyword={inputKeyword} />
      {isLoading ? (
        <Shimmer />
      ) : !inputKeyword ? (
        <div className=" grid sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {product?.products?.map((item) => {
            return <ProductList key={item?._id} item={item} />;
          })}
        </div>
      ) : (
        <p className="font-medium text-center text-md capitalize">
          Results Not Found
        </p>
      )}
    </div>
  );
};

export default Body;
