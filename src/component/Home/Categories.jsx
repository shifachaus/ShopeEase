import furniture from "../../assets/furniture.jpg";
import lighting from "../../assets/lighting.jpg";
import accessories from "../../assets/accessories.jpg";

const Categories = () => {
  return (
    <section className="relative">
      <div className="relative mx-auto max-w-6xl px-6 md:px-14 py-16 ">
        <div className="absolute inset-x-0 top-0 h-[55%] bg-gray-50 z-0" />

        <div className="relative z-10">
          <div className="flex items-end justify-between mb-12 ">
            <div className="hidden md:block w-24 h-[2px] bg-gray-900" />
            <div>
              <span className="uppercase text-xs tracking-widest text-gray-500">
                ShopeEase Furniture Store
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 font-body">
                Categories
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            {/* Text */}
            <p className="md:col-span-3 text-sm md:text-base text-gray-600">
              Discover thoughtfully curated furniture, lighting, and accessories
              designed to elevate modern living spaces with comfort and style.
            </p>

            {/* Images */}
            <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { img: furniture, title: "Furniture" },
                { img: lighting, title: "Lighting" },
                { img: accessories, title: "Accessories" },
              ].map((item, index) => (
                <div key={index} className="group">
                  <div className="relative h-[400px] md:h-[400px] overflow-hidden rounded-md -mt-1 transition-all duration-500 group-hover:shadow-xl">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="mt-4">
                    <h3 className="text-lg md:text-xl font-body font-semibold text-gray-900 group-hover:text-primary transition">
                      #{item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
