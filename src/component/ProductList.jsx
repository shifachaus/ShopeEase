import { Link } from "react-router-dom";
import { formatPrice } from "../utils/helper";

const ProductList = ({ item }) => {
  const { _id, name, images, price } = item;

  // console.log(images);

  return (
    <Link to={`/product/${_id}`}>
      <div className="flex flex-col  gap-4  justify-center border border-gray-200/50  p-3 aspect-h-1 aspect-w-1 w-full hover:shadow-sm hover:bg-white">
        <img
          src={images[0]?.url}
          alt="image"
          height={200}
          width={300}
          className="h-40 md:h-56  xl:h-72 xl:p-8  object-cover object-center mix-blend-darken transition-all delay-75 duration-300 ease-linear group-hover:scale-110 "
        />
        <div className="flex flex-col justify-between">
          <p className="font-medium capitalize transition-all duration-100 ease-linear text-slate-700  ">
            {name}
          </p>
          <p className="font-light  text-sm">{formatPrice(price)}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductList;
