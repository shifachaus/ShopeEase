import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ShimmerSingleProduct from "../../component/skeletons/ShimmerSingleProduct";
import Product from "../../component/product/Product.jsx";
import {
  useGetAllProductsReviewsQuery,
  useGetProductQuery,
} from "../../features/products/productApi";
import PageHero from "../../component/PageHero";
import ProductReviewSection from "../../component/review/ProductReviewSection.jsx";

const SingleProduct = () => {
  const { id } = useParams();
  const { data: product, error, isLoading } = useGetProductQuery(id);
  const { data: productReview } = useGetAllProductsReviewsQuery(id);

  const [display, setDisplay] = useState(0);

  return (
    <section>
      <PageHero title={product?.product?.name} product={product?.product} />
      <div className="mx-auto max-w-7xl p-6 lg:px-8">
        <div className="text-center">
          <p className="font-medium">{error?.data.message}</p>
        </div>
        {!isLoading ? (
          <>
            <Product
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
