import lamp from "../../assets/lamp1.png";

const Hero = () => {
  return (
    <section className=" bg-[#688272] h-80 md:h-[39rem] lg:h-[45rem]   overflow-hidden">
      <div className="relative max-w-7xl mx-auto flex flex-col ">
        <div className="max-w-7xl mx-auto z-10  h-80 md:h-72 p-4  flex flex-col items-start sm:items-center pt-10 md:pt-20   ">
          <div className="flex flex-col  gap-2  p-4  items-start md:items-center pt-10 md:pt-20 ">
            <h1 className="text-primary-600 text-3xl font-bold tracking-normal text-white sm:text-4xl md:text-5xl">
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
          alt="hero Image"
          className=" absolute -top-10  -right-[0] sm:-right-[0]   md:-left-[0] lg:-left-[0%] xl:-left-[0%]  w-[10.5rem] h-80  "
        />
      </div>
    </section>
  );
};

export default Hero;
