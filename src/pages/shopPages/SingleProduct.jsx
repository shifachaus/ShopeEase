import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
  const [display, setDisplay] = useState(0);

  const {
    data: product,
    error,
    isLoading,
    isFetching,
  } = useGetProductQuery(id, {
    skip: !id,
  });

  const {
    data: productReview,
    isLoading: reviewLoading,
    error: reviewError,
  } = useGetAllProductsReviewsQuery(id, {
    skip: !id,
  });

  // Reset the selected gallery item when navigating to another product.
  useEffect(() => {
    setDisplay(0);
  }, [id]);

  const productData = product?.product;

  const productErrorMessage =
    error?.data?.message ||
    error?.error ||
    "Unable to load this product. Please try again.";

  return (
    <section>
      <PageHero title={productData?.name || "Product"} product={productData} />

      <div className="mx-auto max-w-6xl px-6 py-2 md:px-14">
        {!id ? (
          <div className="py-16 text-center">
            <h2 className="mb-3 text-2xl font-semibold">Invalid product</h2>
            <p className="text-gray-500">No product ID was provided.</p>
          </div>
        ) : isLoading || (isFetching && !product) ? (
          <ShimmerSingleProduct />
        ) : error ? (
          <div className="py-16 text-center" role="alert">
            <h2 className="mb-3 text-2xl font-semibold">
              Unable to load product
            </h2>
            <p className="text-red-500">{productErrorMessage}</p>
          </div>
        ) : !productData ? (
          <div className="py-16 text-center">
            <h2 className="mb-3 text-2xl font-semibold">Product not found</h2>
            <p className="text-gray-500">
              This product may have been removed or is no longer available.
            </p>
          </div>
        ) : (
          <>
            <ProductCard
              singleProductItem={product}
              setDisplay={setDisplay}
              display={display}
            />

            {reviewError && (
              <div className="mt-8 text-center" role="alert">
                <p className="text-sm text-gray-500">
                  Reviews could not be loaded. The product details are still
                  available.
                </p>
              </div>
            )}

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
