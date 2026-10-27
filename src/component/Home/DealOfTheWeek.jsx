import armchair from "../../assets/woodchair.webp";

const DealOfTheWeek = () => {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-6 md:px-14 mt-14 mb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-gray-50 overflow-hidden shadow-sm">
          {/* Image Section */}
          <div className="relative group">
            <img
              src={armchair}
              alt="Wooden Arm Chair"
              className="w-full h-[320px] sm:h-[420px] lg:h-[500px] object-contain"
            />

            {/* Text box only */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-sm text-center shadow-sm">
                <span className="uppercase text-xs tracking-widest text-white/80 block">
                  Limited Time Offer
                </span>

                <h2 className="text-2xl md:text-3xl font-semibold text-black mt-1">
                  Deal of the Week
                </h2>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-10 flex flex-col gap-6">
            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-2xl md:text-3xl font-bold text-primary">
                ₹4,999
              </span>
              <span className="line-through text-gray-400 text-sm">₹7,999</span>
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                37% OFF
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-4xl font-semibold text-gray-900 leading-tight">
              Wooden Armchair
            </h3>

            {/* Description */}
            <p className="text-gray-400 text-sm md:text-base max-w-md">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Assumenda doloribus iusto eligendi ut labore quam esse neque
            </p>

            {/* CTA */}
            <button className="w-fit px-6 md:px-8 py-3.5 text-xs uppercase tracking-widest bg-gray-950 text-white rounded-xl transition hover:shadow-md">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealOfTheWeek;
