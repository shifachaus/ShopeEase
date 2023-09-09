import { useParams } from "react-router-dom";
import { single_product_url } from "../utils/constants";
import { useEffect, useState } from "react";
import ShimmerSingleProduct from "./ShimmerSingleProduct";
import Product from "./Product";
import { useGetProductQuery } from "../utils/productApi";
import PageHero from "./PageHero";

const SingleProduct = () => {
  const { id } = useParams();
  const { data: product, error, isLoading } = useGetProductQuery(id);

  // console.log(product, "PRODUCT");
  const [display, setDisplay] = useState(0);

  // useEffect(() => {
  //   setDisplay(product?.product?.images[0]?._id);
  // }, [product]);

  return (
    <section>
      <PageHero title={product?.product?.name} product={product?.product} />
      <div className="mx-auto max-w-7xl p-6 lg:px-8 ">
        <p className="font-medium text-center">{error?.data.message}</p>
        {!isLoading ? (
          <Product
            singleProductItem={product}
            setDisplay={setDisplay}
            display={display}
          />
        ) : (
          <ShimmerSingleProduct />
        )}
      </div>
    </section>
  );
};

export default SingleProduct;
