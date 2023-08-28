import { Link } from "react-router-dom";
import { formatPrice } from "../utils/helper";

const ProductList = ({ item }) => {
  const { _id, name, image, price } = item;

  return (
    <Link to={`/product/${_id}`}>
      <div className="flex flex-col gap-3   hover:shadow cursor-pointer p-3 aspect-h-1 aspect-w-1 w-full ">
        <img
          src={image}
          alt="image"
          height={200}
          width={300}
          // className="w-full object-cover object-center group-hover:opacity-75 h-72 cursor-pointer bg-gray-100"
          className="h-40 p-4 md:h-56 md:p-4 xl:h-72 xl:p-8  object-cover object-center mix-blend-darken transition-all delay-75 duration-300 ease-linear group-hover:scale-110 "
        />
        <div className="flex justify-between">
          <p className="font-medium text-slate-700 text-sm capitalize ">
            {name}
          </p>
          <p className="font-medium text-purple-900 text-sm">
            {formatPrice(price)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductList;
