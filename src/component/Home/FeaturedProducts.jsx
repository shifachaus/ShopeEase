import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/helper";

const FeaturedProducts = ({ item }) => {
  const { _id, name, images, price } = item;

  return (
    <Link to={`/product/${_id}`} className="flex flex-col gap-4  ">
      <div
        className="p-3 flex items-center justify-center bg-gray-100 "
        style={{ height: 248 }}
      >
        <img
          src={images[0]?.url}
          alt={name}
          className="w-20 sm:w-40 md:w-56 xl:w-72  xl:p-8 mix-blend-darken transition-all delay-75 duration-300 ease-linear hover:scale-110 "
        />
      </div>
      <div className="flex flex-col  items-center ">
        <p className="mb-1 font-semibold capitalize transition-all duration-100 ease-linear ">
          {name}
        </p>
        <p className="font-light  text-sm">{formatPrice(price)}</p>
      </div>
    </Link>
  );
};

export default FeaturedProducts;
