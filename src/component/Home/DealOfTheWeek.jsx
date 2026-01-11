import armchair from "../../assets/woodchair.webp";

const DealOfTheWeek = () => {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-6 md:px-14 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src={armchair}
              alt="Wooden Arm Chair"
              className="w-full h-[320px] sm:h-[420px] lg:h-[500px] object-contain rounded-lg"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-3 pointer-events-none">
              <span className="uppercase text-xs tracking-widest text-white">
                Great product from ShopeEase
              </span>

              <span className="text-3xl md:text-4xl font-semibold text-black">
                Deal of the Week
              </span>
            </div>
          </div>

          <div className="mb-8 flex  items-end justify-between md:flex-col md:items-start gap-6">
            <div>
              <div className="flex gap-4 ">
                <span className="text-2xl font-semibold text-primary">
                  ₹4,999
                </span>
                <span className="line-through text-gray-400 text-sm">
                  ₹7,999
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl font-semibold">
                Wooden Arm Chair
              </h3>
            </div>

            <button className="px-8 py-3 text-xs uppercase tracking-widest bg-gray-900 text-white rounded-sm">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealOfTheWeek;
