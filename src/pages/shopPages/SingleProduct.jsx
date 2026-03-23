import { useParams } from "react-router-dom";
import { useState } from "react";
import ShimmerSingleProduct from "../../component/skeletons/ShimmerSingleProduct";
import ProductCard from "../../component/Product/ProductCard.jsx";
import {
  useGetAllProductsReviewsQuery,
  useGetProductQuery,
} from "../../features/products/productApi";
import PageHero from "../../component/Breadcrumb.jsx";
import ProductReviewSection from "../../component/Review/ProductReviewSection.jsx";

const SingleProduct = () => {
  const { id } = useParams();
  const { data: product, error, isLoading } = useGetProductQuery(id);
  const {
    data: productReview,
    isLoading: reviewLoading,
    error: reviewError,
  } = useGetAllProductsReviewsQuery(id);

  const [display, setDisplay] = useState(0);

  return (
    <section>
      <PageHero
        title={product?.product?.name || "Product"}
        product={product?.product}
      />
      <div className="mx-auto max-w-6xl px-6 md:px-14 py-2">
        {error && (
          <div className="text-center">
            <p className="font-medium text-red-500">
              {error?.data?.message || "Something went wrong"}
            </p>
          </div>
        )}

        {isLoading ? (
          <ShimmerSingleProduct />
        ) : (
          <>
            <ProductCard
              singleProductItem={product}
              setDisplay={setDisplay}
              display={display}
            />

            <ProductReviewSection
              reviews={productReview}
              isLoading={reviewLoading}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default SingleProduct;
