import mobileBg from "../../assets/mobile.webp";
import desktopBg from "../../assets/footerimage.webp";

const BrandBanner = () => {
  return (
    <section className="">
      <div className="relative h-56  overflow-hidden group mx-auto max-w-6xl md:px-14">
        {/* Image */}
        <picture>
          <source media="(min-width: 768px)" srcSet={desktopBg} />
          <img
            src={mobileBg}
            alt="ShopEase lifestyle"
            className="absolute inset-0 h-full w-full object-cover "
          />
        </picture>

        {/* Subtle overlay for readability */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center gap-3 px-4">
          <h3 className="text-3xl md:text-4xl font-semibold text-white">
            Comfort Meets Craft
          </h3>

          <span className="text-xs uppercase tracking-widest border-b border-white/70 text-white/90 pb-1">
            ShopEase Furniture
          </span>
        </div>
      </div>
    </section>
  );
};

export default BrandBanner;
