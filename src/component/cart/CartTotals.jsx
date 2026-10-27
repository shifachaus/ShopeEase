import { FiTag, FiShoppingBag } from "react-icons/fi";
import { formatPrice } from "../../utils/helper";

const CartTotals = ({ total = 0 }) => {
  const subtotal = Number(total) || 0;

  return (
    <div className="w-full">
      <div className="mt-5 rounded-xl bg-gray-50 p-4 sm:p-5">
        {/* Subtotal */}
        <div className="flex items-center justify-between gap-4 border-b border-gray-200 pb-4">
          <span className="text-sm text-gray-600">Subtotal</span>
          <span className="text-sm font-medium text-gray-900">
            {formatPrice(subtotal)}
          </span>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between gap-4 pt-4">
          <span className="text-base font-semibold text-gray-900">Total</span>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            {formatPrice(subtotal)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;
