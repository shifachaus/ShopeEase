import { Link } from "react-router-dom";

const PageHero = ({ title, product }) => {
  return (
    <div className="mt-8 ">
      <div className="mx-auto max-w-7xl px-6 py-2 lg:px-8  ">
        <h3 className="text-sm cursor-pointer   text-gray-600 ">
          <Link to="/">Home </Link>
          {product && <Link to="/products">/ Products </Link>}/ {title}
        </h3>
      </div>
    </div>
  );
};

export default PageHero;
