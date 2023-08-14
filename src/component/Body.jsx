import ProductList from "./ProductList";
import Shimmer from "./Shimmer";
import { useGetAllFeaturedProductsQuery } from "../utils/productApi";

const Body = () => {
  const { data: product, error, isLoading } = useGetAllFeaturedProductsQuery();
  // console.log(product?.products.length);

  if (error) {
    return (
      <p className="text-center font-medium mt-5 capitalize">
        oops! something went wrong...
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-7xl  p-6 lg:px-8">
      {isLoading ? (
        <Shimmer />
      ) : (
        <div className=" grid sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {product?.products?.map((item) => {
            return <ProductList key={item?._id} item={item} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Body;
