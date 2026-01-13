import Shimmer from "../skeletons/Shimmer";
import FeaturedProducts from "./FeaturedProducts";
import { useGetAllFeaturedProductsQuery } from "../../features/products/productApi";
import { useState } from "react";
import { Link } from "react-router-dom";

const categories = ["All", "Tables and Chairs", "Sofas", "Lighting", "Decor"];

const Product = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const { data, error, isLoading } = useGetAllFeaturedProductsQuery({
    category: activeCategory,
  });

  const featuredProducts = data?.products?.slice(0, 8) || [];

  return (
    <section className="mx-auto max-w-6xl px-6 md:px-14 py-16 md:py-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-3 mb-6">
        <h2 className="text-3xl md:text-4xl font-semibold font-body text-gray-900">
          Featured Products
        </h2>

        <Link
          to={`/products?category=${encodeURIComponent(activeCategory)}`}
          className="text-sm md:text-base font-medium text-gray-900 transition"
        >
          Browse All Products{" "}
          <span aria-hidden="true" className="text-primary">
            →
          </span>
        </Link>
      </div>

      {/* States */}
      {error ? (
        <p className="text-center font-medium mt-10 capitalize">
          Oops! something went wrong...
        </p>
      ) : isLoading ? (
        <Shimmer box={4} />
      ) : (
        <>
          <ul className="flex gap-6 pt-4 flex-wrap">
            {categories.map((cat) => {
              return (
                <li
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`cursor-pointer text-xs md:text-sm uppercase tracking-wide font-medium transition
        ${
          activeCategory === cat
            ? "text-black"
            : "text-gray-500 hover:text-black"
        }`}
                >
                  {cat}
                </li>
              );
            })}
          </ul>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 pt-10">
            {featuredProducts.map((item) => (
              <FeaturedProducts key={item?._id} item={item} />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Product;
