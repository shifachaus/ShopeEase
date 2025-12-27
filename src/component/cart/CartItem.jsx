import { formatPrice } from "../../utils/helper";
import { addItems, removeItems } from "../../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

const CartItem = ({ item }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const removeQty = (item) => {
    dispatch(removeItems(item));
  };

  const addQty = (item) => {
    if (item?.qty === item?.stock) return;
    dispatch(addItems({ ...item, qty }));
  };

  return (
    <div
      className="flex items-center
	 md:grid md:grid-cols-3 md:items-center gap-4 py-4 px-2"
    >
      <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2 sm:items-center">
        <img
          src={item?.image}
          alt="image"
          className="w-40 h-40   cursor-pointer rounded "
        />
        <p className="hidden md:block text-gray-500">{item?.name}</p>
      </div>

      <div className="flex flex-col gap-3">
        <p className="md:font-medium text-md md:hidden text-gray-500">
          {item?.name}
        </p>
        <div className="flex gap-4  items-center">
          <button
            className="text-lg font-medium cursor-pointer"
            onClick={() => removeQty(item)}
          >
            -
          </button>
          <p className="text-md font-medium bg-black text-white px-2 ">
            {item?.qty}
          </p>
          <button
            className="text-lg font-medium cursor-pointer"
            onClick={() => addQty(item)}
          >
            +
          </button>
        </div>
        <div className="md:hidden flex flex-col items-end sm:grid sm:grid-cols-2">
          <p className="text-md font-bold">{formatPrice(item?.price)}</p>
        </div>
      </div>
      <div className="hidden   md:flex md:flex-col">
        <p className="text-md font-medium text-gray-500">
          {formatPrice(item?.price)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
