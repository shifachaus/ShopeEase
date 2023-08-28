import ProductList from "./ProductList";
import Shimmer from "./Shimmer";
import { useGetAllFeaturedProductsQuery } from "../utils/productApi";
import heroImage from "../assets/RocketSingleSeater.png";

const Body = () => {
  const { data: product, error, isLoading } = useGetAllFeaturedProductsQuery();
  // console.log(product?.products.length);

  return (
    <section>
      <div className="h-80 bg-purple-50 md:h-[30rem]">
        <div className="mx-auto max-w-7xl p-6 lg:px-8 relative flex flex-col md:grid  md:grid-flow-col ">
          <div className="flex flex-col pt-14  md:pt-20 md:col-span-6">
            <h1 className=" text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl ">
              Crafting Comfort for You: ShopEase Furniture, Where Relaxation
              Meets Home.
            </h1>
            <p className="mt-6 border-b border-black py-1 text-[10px] font-medium uppercase tracking-wider  w-16">
              Shop Now
            </p>
          </div>

          <div className="md:col-span-6">
            <img
              src={heroImage}
              alt={heroImage}
              className="hidden md:inline-block "
            />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl  p-6  lg:px-8  pt-12 pb-12">
        <h2 className="text-3xl sm:text-4xl font-medium mb-6 mt-6  text-gray-600 text-center">
          Featured Product
        </h2>
        {error ? (
          <p className="text-center font-medium mt-5 capitalize  h-screen">
            oops! something went wrong...
          </p>
        ) : isLoading ? (
          <Shimmer />
        ) : (
          <div className=" grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 pt-12 pb-12">
            {product?.products?.map((item) => {
              return <ProductList key={item?._id} item={item} />;
            })}
          </div>
        )}
      </div>

      <div className="h-72 bg-purple-50 md:h-[20rem]">
        <div className="mx-auto max-w-7xl p-6 lg:px-8 relative flex flex-col gap-4">
          <div className="flex flex-col gap-2 pt-12">
            <h2 className=" text-3xl font-bold  text-gray-900 sm:text-4xl  text-center">
              Our Instagram
            </h2>
            <p className=" border-gray-600   text-center text-sm md:text-md">
              Follow our store on Instagram
            </p>
          </div>
          <div className="flex items-center justify-center">
            <button className="px-8 py-2 rounded-full shadow-md ">
              Follow Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Body;
