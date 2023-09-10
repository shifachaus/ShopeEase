import { useState } from "react";
import { useGetAllProductsReviewsQuery } from "../../utils/productApi";
import Sidebar from "./Sidebar";

const ProductReviews = () => {
  const [productId, setProductId] = useState("");
  const [searchInput, setSearchInput] = useState("");
  // const { data: reviews } = useGetAllProductsReviewsQuery(productId, {
  //   skip: true,
  // });

  // console.log(reviews, "REVIEWS");

  const handleSearch = () => {
    setProductId(searchInput);
  };

  return (
    <section>
      <Sidebar />
      <main>
        <div className="p-4 sm:ml-64 bg-stone-50">
          <div className="mx-auto max-w-7xl p-6 lg:px-8 h-screen">
            <h2 className="text-xl font-medium text-gray-600 mb-6 text-center ">
              PRODUCT REVIEWS
            </h2>

            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Enter search query"
            />

            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      </main>
    </section>
  );
};

export default ProductReviews;
