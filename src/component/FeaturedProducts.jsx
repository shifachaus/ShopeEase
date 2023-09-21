import { Link } from "react-router-dom";
import { formatPrice } from "../utils/helper";

const FeaturedProducts = ({ item }) => {
  const { _id, name, images, price } = item;

  return (
    <Link to={`/product/${_id}`} className="flex flex-col gap-4  ">
      <div className="p-3 flex items-center justify-center bg-gray-200 ">
        <img
          src={images[0]?.url}
          alt="image"
          height={200}
          width={200}
          className="h-20 sm:h-40 md:h-56  xl:h-72 xl:p-8  mix-blend-darken transition-all delay-75 duration-300 ease-linear group-hover:scale-110 "
        />
      </div>
      <div className="flex flex-col gap-1 items-center ">
        <p className=" font-semibold capitalize transition-all duration-100 ease-linear ">
          {name}
        </p>
        <p className="font-light  text-sm">{formatPrice(price)}</p>
      </div>
    </Link>
  );
};

export default FeaturedProducts;
