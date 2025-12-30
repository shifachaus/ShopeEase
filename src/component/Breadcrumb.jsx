import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";

const Breadcrumbs = ({ title, product }) => {
  return (
    <nav className="mt-6">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-black transition-colors">
            Home
          </Link>

          <FaChevronRight className="text-gray-400" size={10} />

          {product && (
            <>
              <Link
                to="/products"
                className="hover:text-black transition-colors"
              >
                Products
              </Link>

              <FaChevronRight className="text-gray-400" size={10} />
            </>
          )}

          <span className="text-black font-medium">{title}</span>
        </div>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
