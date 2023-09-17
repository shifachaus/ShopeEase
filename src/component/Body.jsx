import Shimmer from "./Shimmer";
import { useGetAllFeaturedProductsQuery } from "../utils/productApi";
import heroImage from "../assets/Cloudsofa.png";
import chair from "../assets/chair.png";
import planet from "../assets/planet.png";
import FeaturedProducts from "./FeaturedProducts";

const Body = () => {
  const { data: product, error, isLoading } = useGetAllFeaturedProductsQuery();
  // console.log(product?.products.length);

  return (
    <section>
      <div className=" bg-[#a99985] md:h-[30rem] overflow-hidden">
        <div className="relative  mx-auto max-w-7xl p-6 lg:px-8  flex flex-col md:grid  md:grid-flow-col">
          <div className="flex flex-col pt-14  md:col-span-8 md:w-[500px] lg:w-[800px] w-2/3 ">
            <h1 className="text-3xl leading-normal font-bold tracking-normal text-black sm:text-4xl md:text-5xl">
              Crafting Cozy Homes Where Relaxation Begins
            </h1>
            <p className="mt-6 border-b border-black py-1 text-[10px] font-medium uppercase tracking-wider w-16">
              Shop Now
            </p>
          </div>

          <div className="absolute -top-10  md:-right-[30rem] lg:-right-[44rem] w-full h-[500px] md:col-span-4">
            <img
              src={heroImage}
              alt={heroImage}
              className="hidden md:inline-block  h-full object-contain "
            />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl  p-6  lg:px-8  pt-12 pb-12    mt-10 px-5 py-5 md:mt-20  md:py-8 lg:py-10 xl:px-28 xl:py-16">
        <h2 className="text-2xl sm:text-3xl font-medium mb-6 mt-6  text-black text-center">
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
            {product?.products.slice(0, 4)?.map((item) => {
              return <FeaturedProducts key={item?._id} item={item} />;
            })}
          </div>
        )}
      </div>

      <section className="  mx-auto mt-10 bg-gray-100 px-5 py-5 md:mt-20 md:py-8 lg:py-10 xl:px-28 xl:py-16  ">
        <main className="mx-auto mt-20 max-w-7xl p-4 pb-10 max-auto mb-10 gap-5 columns-1 lg:columns-2 space-x-5">
          <div className="flex flex-col items-start gap-2 ">
            <img src={planet} alt=" chair" />
            <h2 className=" flex flex-col  font-light uppercase tracking-widest md:w-full md:text-2xl xl:text-4xl ">
              <span className="font-black "> The Minimal </span> Circus Wood
              Chair
            </h2>
            <span className=" text-left border-b border-black py-1 text-[10px] uppercase tracking-wider hover:border-b-primary hover:text-primary">
              View Now
            </span>
          </div>
          <div className="flex flex-col items-end gap-2 xsm:mt-5 ">
            <h2 className=" text-right flex flex-col font-light uppercase tracking-widest md:w-full md:text-2xl xl:text-4xl">
              <span className="font-black "> The Minimal </span> Planet Chair
            </h2>
            <span className=" text-right border-b  border-black py-1 text-[10px] uppercase tracking-wider hover:border-b-primary hover:text-primary ">
              View Now
            </span>
            <img src={chair} alt=" chair" />
          </div>
        </main>
      </section>

      <div className="h-64 md:h-80 md:bg-[url('./assets/footerimage.png')] bg-[url('./assets/mobile.png')] bg-cover bg-center">
        <div className="w-full h-full flex  justify-center items-center backdrop-brightness-75">
          <div className=" flex flex-col h-full items-center justify-center text-white">
            <h2 className="mb-4  text-4xl font-semibold  sm:text-4xl text-center">
              Our Instagram
            </h2>
            <h4 className="mb-6 text-xl font-semibold">
              {" "}
              Follow our store on Instagram
            </h4>
            <button
              type="button"
              className="rounded shadow-md border-2 border-neutral-100 px-7 pb-[8px] pt-[10px] text-sm font-medium uppercase leading-normal  transition duration-150 ease-in-out hover:border-white hover:bg-neutral-500 hover:bg-opacity-10  focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 "
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Follow Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Body;
