import { Link } from "react-router-dom";
import { FaGreaterThan } from "react-icons/fa6";

const PageHero = ({ title, product }) => {
  return (
    <div className="mt-8 ">
      <div className="mx-auto max-w-7xl px-6 py-2 lg:px-8  ">
        <h3 className="text-sm cursor-pointer flex items-center gap-2  text-gray-600 ">
          <Link to="/">Home</Link>
          {product && (
            <>
              <FaGreaterThan className="text-black" size={12} />
              <Link to="/products">Products</Link>
            </>
          )}
          <FaGreaterThan className="text-black" size={12} />
          <span className="text-black">{title}</span>
        </h3>
      </div>
    </div>
  );
};

export default PageHero;
