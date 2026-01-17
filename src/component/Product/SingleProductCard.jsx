import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/helper";

const SingleProductCard = ({ item }) => {
  const { _id, name, images, price, tags } = item;

  return (
    <Link
      to={`/product/${_id}`}
      className="group flex flex-col gap-4 transition-all duration-300"
    >
      <div className="relative flex items-center justify-center bg-gray-70 rounded-sm overflow-hidden h-[248px]">
        {tags?.isNew && (
          <span
            className="absolute left-2 top-2 bg-[#5B6CA1] text-white text-[10px] font-semibold px-1 py-2 
                           writing-mode-vertical rotate-180 tracking-widest"
          >
            NEW
          </span>
        )}

        {tags?.isSale && (
          <span
            className="absolute left-2 top-2 bg-red-600 text-white text-[10px] font-semibold px-1 py-2 
                           writing-mode-vertical rotate-180 tracking-widest"
          >
            SALE
          </span>
        )}

        <img
          src={images[0]?.url}
          alt={name}
          className="w-32 sm:w-48 md:w-52 xl:w-64 p-4 mix-blend-darken transition-transform duration-500 ease-out group-hover:scale-110"
        />
      </div>

      <div className="flex flex-col items-center text-center">
        <p className="mb-1 font-semibold text-[.8rem] md:text-base capitalize">
          {name}
        </p>
        <p className="text-xs md:text-sm text-gray-500">{formatPrice(price)}</p>
      </div>
    </Link>
  );
};

export default SingleProductCard;
