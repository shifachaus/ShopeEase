import { Link } from "react-router-dom";

const PageHero = ({ title, product }) => {
  return (
    <div className="h-24 bg-[#f5f1ed] ">
      <div className="mx-auto max-w-7xl p-6 lg:px-8  ">
        <h3 className="text-2xl font-medium   text-gray-600 ">
          <Link to="/">Home </Link>
          {product && <Link to="/products">/ Products</Link>}/ {title}
        </h3>
      </div>
    </div>
  );
};

export default PageHero;
