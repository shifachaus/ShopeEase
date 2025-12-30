import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/helper";

const CartItems = ({ items }) => {
  return (
    <div className="mt-4 divide-y">
      {items?.map((item) => (
        <div key={item._id} className="flex items-center gap-4 p-4">
          {/* Product Image */}
          <div className="h-16 w-16 rounded-lg overflow-hidden border bg-gray-50">
            <img
              src={item?.image}
              alt={item?.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1">
            <Link
              to={`/product/${item.product}`}
              className="text-sm font-medium text-gray-900 hover:underline"
            >
              {item.name}
            </Link>

            <p className="text-xs text-gray-500 mt-0.5">Qty: {item.qty}</p>
          </div>

          {/* Price */}
          <div className="text-right text-sm">
            <p className="text-gray-700">
              {formatPrice(item.price)} × {item.qty}
            </p>

            <p className="font-semibold text-gray-900">
              {formatPrice(item.price * item.qty)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItems;
