import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import { products_url } from "../utils/constants";
import Shimmer from "./Shimmer";

const Body = () => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(products_url);
    const data = await response.json();
    // console.log(data);
    setProduct(data);
  };

  return (
    <div>
      {product?.length ? (
        <div className="mx-auto max-w-7xl  p-6 lg:px-8 grid sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {product?.map((item) => {
            return <ProductList key={item?.id} item={item} />;
          })}
        </div>
      ) : (
        <Shimmer />
      )}
    </div>
  );
};

export default Body;
