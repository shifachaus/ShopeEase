import Shimmer from "../skeletons/Shimmer";
import FeaturedProducts from "./FeaturedProducts";
import { useGetAllFeaturedProductsQuery } from "../../features/products/productApi";
import { useMemo } from "react";

const Product = () => {
  const { data: product, error, isLoading } = useGetAllFeaturedProductsQuery();

  const featuredProducts = useMemo(
    () => product?.products.slice(0, 4) || [],
    [product]
  );

  return (
    <section className="mx-auto max-w-7xl  p-6  lg:px-8  pt-12      mt-10 md:mt-20 px-5 py-5   md:py-8 lg:py-10 ">
      <h2 className="tracking-tight text-2xl  font-medium  text-black text-center ">
        Featured Product
      </h2>
      {error ? (
        <p className="text-center font-medium mt-5 capitalize  h-screen">
          oops! something went wrong...
        </p>
      ) : isLoading ? (
        <Shimmer box={4} />
      ) : (
        <div>
          <div
            className=" grid grid-cols-2 gap-4  lg:grid-cols-4 pt-12 pb-12"
            style={{ height: "auto" }}
          >
            {featuredProducts?.map((item) => {
              return <FeaturedProducts key={item?._id} item={item} />;
            })}
          </div>
          <div className="flex items-center justify-center">
            <p className=" border-b-2 py-1  border-black  text-[11px] uppercase tracking-wider hover:border-b-primary hover:text-primary hover:cursor-pointer ">
              View Now
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Product;
