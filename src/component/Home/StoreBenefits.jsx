import { FiLock } from "react-icons/fi";
import { PiSparkle } from "react-icons/pi";
import { FaRegPaperPlane } from "react-icons/fa";
import { LuPhone } from "react-icons/lu";

const benefits = [
  {
    icon: PiSparkle,
    title: "Creative & Unique",
    desc: "Great from shopeease",
  },
  {
    icon: FaRegPaperPlane,
    title: "Free Shipping",
    desc: "Fast delivery on orders",
  },
  {
    icon: LuPhone,
    title: "Support Customer",
    desc: "Support 24/7",
  },
  {
    icon: FiLock,
    title: "Secure Payments",
    desc: "100 % secure payment",
  },
];

const StoreBenefits = () => {
  return (
    <section className="">
      <div className="mx-auto max-w-6xl px-6 md:px-14 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {benefits.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="group flex gap-4 items-start">
                <Icon className="text-black text-xl md:text-3xl mt-1" />

                <div>
                  <h4 className="text-base font-semibold text-gray-900 mb-1">
                    {item.title}
                  </h4>
                  <p className="uppercase text-xs tracking-widest text-gray-500">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StoreBenefits;
