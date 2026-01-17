import armchair from "../../assets/woodchair.webp";

const DealOfTheWeek = () => {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-6 md:px-14 bg-gray-70">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12 items-center">
          <div className="relative">
            <img
              src={armchair}
              alt="Wooden Arm Chair"
              className="w-full h-[320px] sm:h-[420px] lg:h-[500px] object-contain"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-3 pointer-events-none">
              <div className="bg-white/10 px-6 py-4 rounded-sm space-y-2">
                <span className="uppercase text-xs tracking-widest text-black block">
                  Great product from ShopEase
                </span>

                <span className="text-3xl md:text-4xl font-semibold text-black block">
                  Deal of the Week
                </span>
              </div>
            </div>
          </div>

          <div className="mb-8 flex justify-between flex-col sm:flex-row sm:items-end md:flex-col md:items-start gap-6">
            <div>
              <div className="flex gap-4  items-center ">
                <span className="text-xl md:text-2xl font-semibold text-primary">
                  ₹4,999
                </span>
                <span className="line-through text-gray-400 text-xs md:text-sm">
                  ₹7,999
                </span>
              </div>

              <h3 className="text-2xl md:text-4xl font-semibold">
                Wooden Armchair
              </h3>
            </div>

            <button className="px-4 md:px-8 py-3 text-xs uppercase tracking-widest bg-gray-900 text-white rounded-sm">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealOfTheWeek;
