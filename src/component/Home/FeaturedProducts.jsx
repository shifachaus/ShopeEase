import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/helper";

const FeaturedProducts = ({ item }) => {
  const { _id, name, images, price } = item;

  return (
    <Link
      to={`/product/${_id}`}
      className="group flex flex-col gap-4 transition-all duration-300"
    >
      {/* Image Wrapper */}
      <div className="flex items-center justify-center bg-gray-100 rounded-sm overflow-hidden h-[248px] ">
        <img
          src={images[0]?.url}
          alt={name}
          className="w-28 sm:w-40 md:w-52 xl:w-64 p-4 mix-blend-darken transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </div>

      <div className="flex flex-col items-center text-center">
        <p className="mb-1 font-semibold text-[.95rem] capitalize">{name}</p>
        <p className="text-sm text-gray-500">{formatPrice(price)}</p>
      </div>
    </Link>
  );
};

export default FeaturedProducts;
