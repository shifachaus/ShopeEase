import Shimmer from "./Shimmer";
import { useGetAllFeaturedProductsQuery } from "../utils/productApi";
import heroImage from "../assets/Cloudsofa.png";
import chair from "../assets/chair.png";
import planet from "../assets/planet.png";
import lamp from "../assets/lamp1.png";
import FeaturedProducts from "./FeaturedProducts";

const Body = () => {
  const { data: product, error, isLoading } = useGetAllFeaturedProductsQuery();
  // console.log(product?.products.length);

  return (
    <main className="bg-gray-100">
      <section className=" bg-[#828D91] h-80 md:h-[39rem] lg:h-[45rem]   overflow-hidden">
        <div className="relative max-w-7xl mx-auto flex flex-col ">
          <div className="max-w-7xl mx-auto z-10  h-80 md:h-72 p-4  flex flex-col items-start sm:items-center pt-10 md:pt-20   ">
            <div className="flex flex-col  gap-2  p-4  items-start md:items-center pt-10 md:pt-20 ">
              <h1 className="text-3xl font-bold tracking-normal text-white sm:text-4xl md:text-5xl">
                Elevate Your Home Comfort
              </h1>
              <p className=" text-md sm:text-lg font-medium text-white">
                Massive Discounts Arriving Shortly.
              </p>
              <p className="text-white mt-4 text-left border-b border-white py-1 text-[10px] uppercase font-medium tracking-wider hover:border-b-primary hover:text-primary">
                View Now
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-7xl  md:h-[385px] md:w-[1025px] lg:h-[510px] lg:w-[1200px]   md:bg-[url('./assets/Cloudsofa.png')] bg-cover bg-center"></div>
          <img
            src={lamp}
            alt={heroImage}
            className=" absolute -top-10  -right-[0] sm:-right-[0]   md:-left-[0] lg:-left-[0%] xl:-left-[0%]  w-[10.5rem] h-80  "
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl  p-6  lg:px-8  pt-12    pb-12  mt-10 md:mt-20 px-5 py-5   md:py-8 lg:py-10 xl:px-28 xl:py-16">
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
      </section>

      <section className="mx-auto  bg-gray-100 px-5 py-5 pt-12 mt-10 md:mt-20 md:py-8 lg:py-10 xl:px-28 xl:py-16  ">
        <main className="mx-auto mt-20 max-w-7xl  pb-10 max-auto mb-10 gap-5 columns-1 lg:columns-2 space-x-5">
          <div className="flex flex-col items-start gap-2 ">
            <img src={planet} alt=" chair" />
            <h2 className=" flex flex-col  font-light uppercase tracking-widest md:w-full md:text-2xl xl:text-4xl ">
              <span className="font-black "> The Minimal </span> Planet Chair
              Chair
            </h2>
            <span className=" text-left border-b border-black py-1 text-[10px] uppercase tracking-wider hover:border-b-primary hover:text-primary">
              View Now
            </span>
          </div>
          <div className="flex flex-col items-end gap-2 xsm:mt-5 ">
            <h2 className=" text-right flex flex-col font-light uppercase tracking-widest md:w-full md:text-2xl xl:text-4xl">
              <span className="font-black "> The Minimal </span>Circus Wood
            </h2>
            <span className=" text-right border-b  border-black py-1 text-[10px] uppercase tracking-wider hover:border-b-primary hover:text-primary ">
              View Now
            </span>
            <img src={chair} alt=" chair" />
          </div>
        </main>
      </section>

      <section className="mx-auto max-w-7xl mt-10 md:mt-20  h-64 md:h-80 md:bg-[url('./assets/footerimage.png')] bg-[url('./assets/mobile.png')] bg-cover bg-center">
        <div className="w-full   h-full flex  justify-center items-center backdrop-brightness-75">
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
      </section>
    </main>
  );
};

export default Body;
