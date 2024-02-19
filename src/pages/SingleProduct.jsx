import { useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import ShimmerSingleProduct from "../component/ShimmerSingleProduct";
import Product from "../component/Product/Product";
import { useGetProductQuery } from "../utils/productApi";
import PageHero from "../component/PageHero";

const SingleProduct = () => {
  const { id } = useParams();
  const { data: product, error, isLoading } = useGetProductQuery(id);
  const [display, setDisplay] = useState(0);

  const renderedProduct = useMemo(() => {
    return (
      <Product
        singleProductItem={product}
        setDisplay={setDisplay}
        display={display}
      />
    );
  }, [product, display]);

  return (
    <section>
      <PageHero title={product?.product?.name} product={product?.product} />
      <div className="mx-auto max-w-7xl p-6 lg:px-8">
        <div className="text-center">
          <p className="font-medium">{error?.data.message}</p>
        </div>
        {!isLoading ? renderedProduct : <ShimmerSingleProduct />}
      </div>
    </section>
  );
};

export default SingleProduct;
