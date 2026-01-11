import mobileBg from "../../assets/mobile.webp";
import desktopBg from "../../assets/footerimage.webp";

const BrandBanner = () => {
  return (
    <section className="mx-auto max-w-6xl my-16 px-6 md:px-0">
      <div className="relative h-64 md:h-80 rounded-sm overflow-hidden">
        <picture>
          <source media="(min-width: 768px)" srcSet={desktopBg} />
          <img
            src={mobileBg}
            alt="ShopeEase lifestyle"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </picture>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center gap-3">
          <h3 className="text-3xl md:text-4xl font-semibold text-black">
            Comfort Meets Craft
          </h3>

          <span className="text-xs uppercase tracking-widest border-b border-black pb-1">
            ShopeEase Furniture
          </span>
        </div>
      </div>
    </section>
  );
};

export default BrandBanner;
