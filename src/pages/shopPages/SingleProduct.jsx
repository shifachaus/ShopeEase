import { useParams } from "react-router-dom";
import { useState } from "react";
import ShimmerSingleProduct from "../../component/skeletons/ShimmerSingleProduct";
import ProductCard from "../../component/product/ProductCard.jsx";
import {
  useGetAllProductsReviewsQuery,
  useGetProductQuery,
} from "../../features/products/productApi";
import PageHero from "../../component/Breadcrumb.jsx";
import ProductReviewSection from "../../component/review/ProductReviewSection.jsx";

const SingleProduct = () => {
  const { id } = useParams();
  const { data: product, error, isLoading } = useGetProductQuery(id);
  const { data: productReview } = useGetAllProductsReviewsQuery(id);

  const [display, setDisplay] = useState(0);

  return (
    <section>
      <PageHero title={product?.product?.name} product={product?.product} />
      <div className="mx-auto max-w-6xl px-6 md:px-14 py-8">
        <div className="text-center">
          <p className="font-medium">{error?.data.message}</p>
        </div>
        {!isLoading ? (
          <>
            <ProductCard
              singleProductItem={product}
              setDisplay={setDisplay}
              display={display}
            />
            <ProductReviewSection reviews={productReview} />
          </>
        ) : (
          <ShimmerSingleProduct />
        )}
      </div>
    </section>
  );
};

export default SingleProduct;
