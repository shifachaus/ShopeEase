import { useParams } from "react-router-dom";
import { single_product_url } from "../utils/constants";
import { useEffect, useState } from "react";
import ShimmerSingleProduct from "./ShimmerSingleProduct";
import Product from "./Product";
const SingleProduct = () => {
  const { id } = useParams();
  const [singleProductItem, setSingleProductItem] = useState(null);
  const [display, setDisplay] = useState(null);

  useEffect(() => {
    fetchSingleProduct();
  }, [id]);

  const fetchSingleProduct = async () => {
    const response = await fetch(single_product_url + id);
    const data = await response.json();
    // console.log(data);
    setDisplay(data?.images?.[0]?.id);
    setSingleProductItem(data);
  };

  const displayImage = singleProductItem?.images?.filter(
    (img) => img.id === display
  );

  // console.log(displayImage?.[0], "hello", display);

  return (
    <div className="mx-auto max-w-7xl p-6 lg:px-8 ">
      {singleProductItem !== null ? (
        <Product
          displayImage={displayImage}
          singleProductItem={singleProductItem}
          setDisplay={setDisplay}
          display={display}
        />
      ) : (
        <ShimmerSingleProduct />
      )}
    </div>
  );
};

export default SingleProduct;
