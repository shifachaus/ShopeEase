import lamp from "../../assets/lamp1.webp";
import sofa from "../../assets/Cloudsofa.webp";

const Hero = () => {
  return (
    <section>
      <div className="relative max-w-6xl mx-auto overflow-hidden min-h-[420px] lg:min-h-[520px] bg-primary">
        <div className="relative z-20 pt-16 md:pt-28 text-left md:text-center px-6">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            Elevate Your Home Comfort
          </h1>

          <p className="text-[#FFF6F6] mb-6 text-base md:text-lg">
            Massive discounts arriving shortly.
          </p>

          <button className="inline-block border border-white px-8 py-3 text-xs uppercase tracking-widest text-white  rounded-sm">
            Shop Now
          </button>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[260px] hidden lg:flex w-full justify-center overflow-hidden">
          <img
            src={sofa}
            alt="Modern sofa"
            className="h-full w-[85%] max-w-none object-cover object-top"
          />
        </div>
        <img
          src={lamp}
          alt="Decorative lamp"
          className="absolute top-0 left-10 hidden md:block w-[140px]"
        />
      </div>
    </section>
  );
};

export default Hero;
