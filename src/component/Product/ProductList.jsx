import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/helper";

const ProductList = ({ item }) => {
  const { _id, name, images, price } = item;

  return (
    <Link to={`/product/${_id}`} className="flex flex-col gap-4">
      <div className=" bg-gray-100 p-3 flex items-center justify-center">
        <img
          src={images?.[0]?.url}
          alt="image"
          height={200}
          width={200}
          style={{ width: "100%" }}
          className="h-20 sm:h-40 md:h-56  xl:h-72 xl:p-8  mix-blend-darken transition-all delay-75 duration-300 ease-linear  "
        />
      </div>
      <div className="flex flex-col justify-between">
        <p className="font-medium capitalize transition-all duration-100 ease-linear  ">
          {name}
        </p>
        <p className="font-light  text-sm">{formatPrice(price)}</p>
      </div>
    </Link>
  );
};

export default ProductList;
