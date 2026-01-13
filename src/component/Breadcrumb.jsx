import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";

const Breadcrumb = ({ title, product, profile, order }) => {
  return (
    <nav className="mt-6">
      <div className="mx-auto max-w-6xl px-6 lg:px-14">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-black transition-colors">
            Home
          </Link>

          <FaChevronRight className="text-gray-400" size={10} />

          {profile && (
            <>
              <Link
                to="/account"
                className="hover:text-black transition-colors"
              >
                Profile
              </Link>

              <FaChevronRight className="text-gray-400" size={10} />
            </>
          )}

          {order && (
            <>
              <Link to="/orders" className="hover:text-black transition-colors">
                Order
              </Link>

              <FaChevronRight className="text-gray-400" size={10} />
            </>
          )}

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

export default Breadcrumb;
