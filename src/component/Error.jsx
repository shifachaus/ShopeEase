import { Link } from "react-router-dom";
import blob from "../assets/blob.png";
import { RiArrowGoBackLine } from "react-icons/ri";

const Error = () => {
  return (
    <div className="flex flex-col items-center  mx-auto max-w-7xl lg:px-8 mt-10  lg:mt-5 px-5 ">
      <h4 className="mb-4 text-4xl md:text-5xl tracking-tight font-extrabold lg:text-6xl text-primary-600">
        404
      </h4>
      <p className="mb-4 text-lg font-light text-gray-500">You are lost</p>
      <img src={blob} alt="blob" />
      <Link
        to="/"
        className=" border-b-2 border-black inline-flex items-center gap-2 text-black bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium  text-sm px-1 py-1 text-center  my-4"
      >
        <RiArrowGoBackLine /> Go Home
      </Link>
    </div>
  );
};

export default Error;
