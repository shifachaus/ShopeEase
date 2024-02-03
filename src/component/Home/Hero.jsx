import lamp from "../../assets/lamp1.webp";

const Hero = () => {
  return (
    <section className="bg-[#688272] h-80 md:min-h-[25rem] lg:min-h-[45rem] overflow-hidden">
      <div className="relative max-w-7xl mx-auto flex flex-col">
        <div className="z-10 p-4 flex flex-col items-start md:items-center pt-10 md:pt-40">
          <h1 className="text-primary-600 mb-2 font-bold tracking-normal text-dark text-3xl md:text-3xl lg:text-4xl">
            Elevate Your Home Comfort
          </h1>
          <p className="text-md md:text-lg mb-3 font-medium text-dark">
            Massive Discounts Arriving Shortly.
          </p>
          <p className="text-dark text-left border-b border-black py-1 text-xs uppercase font-medium tracking-wider hover:border-b-primary hover:text-primary">
            View Now
          </p>
        </div>

        <div
          className="mx-auto  bg-contain bg-center md:bg-[url('./assets/Cloudsofa.webp')]"
          style={{ height: 510, width: 1200 }}
        ></div>

        <img
          src={lamp}
          style={{ width: 171, height: 331 }}
          alt="hero Image"
          className="absolute -top-16 hidden md:inline-block -left-0 "
        />
      </div>
    </section>
  );
};

export default Hero;
