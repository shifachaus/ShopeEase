import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/helper";

const ProductList = ({ item }) => {
  const { _id, name, images, price } = item;

  return (
    <Link
      to={`/product/${_id}`}
      className="group flex flex-col rounded-lg transition"
    >
      {/* Image wrapper */}
      <div className="relative bg-gray-100 flex items-center justify-center h-48 sm:h-56  rounded-sm overflow-hidden">
        <img
          src={images?.[0]?.url}
          alt={name}
          className="w-full h-full md:w-52 lg:w-64 p-4 mix-blend-darken transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </div>

      {/* Text */}
      <div className="mt-4 flex flex-col gap-1">
        <p className="font-semibold text-[.95rem] capitalize">{name}</p>
        <p className="text-sm text-gray-500">{formatPrice(price)}</p>
      </div>
    </Link>
  );
};

export default ProductList;
