import { Link } from "react-router-dom";
import { formatPrice } from "../utils/helper";

const ProductList = ({ item }) => {
  const { id, name, image, price } = item;
  return (
    <Link to={`/product/${id}`}>
      <div className="flex flex-col gap-3  hover:bg-slate-100 cursor-pointer p-3 aspect-h-1 aspect-w-1 w-full">
        <img
          src={image}
          alt="image"
          className="w-full object-cover object-center group-hover:opacity-75 h-72 cursor-pointer"
        />
        <div className="flex justify-between">
          <p className="font-medium text-slate-700 text-sm capitalize">
            {name}
          </p>
          <p className="font-medium text-purple-800 text-sm">
            {formatPrice(price)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductList;
