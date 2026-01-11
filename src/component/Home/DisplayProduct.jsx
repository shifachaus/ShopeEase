import chair from "../../assets/chair.webp";
import planet from "../../assets/planet.webp";

const DisplayProduct = () => {
  return (
    <section className="mx-auto  bg-gray-100 px-5 py-5  mt-10 md:m-20 md:py-8 lg:py-10 p-6 lg:px-12  ">
      <div className="mx-auto max-w-7xl  py-10 max-auto my-10 gap-5 columns-1 lg:columns-2 space-x-5">
        <div className="flex flex-col items-start gap-2 ">
          <img
            src={planet}
            alt="planet chair"
            className=" h-auto"
            style={{ width: 630, height: 640 }}
          />
          <h2 className=" flex flex-col  font-light uppercase tracking-widest md:w-full md:text-2xl xl:text-4xl ">
            <span className="font-black "> The Minimal </span> Planet Chair
            Chair
          </h2>
          <span className=" text-left border-b border-black py-1 text-[10px] uppercase tracking-wider hover:border-b-primary hover:text-primary">
            View Now
          </span>
        </div>
        <div className="flex flex-col items-end gap-2 xsm:mt-5 ">
          <h2 className=" text-right flex flex-col font-light uppercase tracking-widest md:w-full md:text-2xl xl:text-4xl">
            <span className="font-black "> The Minimal </span>Circus Wood
          </h2>
          <span className=" text-right border-b  border-black py-1 text-[10px] uppercase tracking-wider hover:border-b-primary hover:text-primary ">
            View Now
          </span>
          <img
            src={chair}
            alt="the minimal chair"
            className=" h-auto"
            style={{ width: 549, height: 640 }}
          />
        </div>
      </div>
    </section>
  );
};

export default DisplayProduct;
