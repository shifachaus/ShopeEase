import { formatPrice } from "../../utils/helper";
import { addItems, removeItems } from "../../features/carts/cartSlice";
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
    <div className="grid grid-cols-3 items-center gap-4 py-4 px-2">
      <div className="flex flex-col gap-2 ">
        <img
          src={item?.image}
          alt="image"
          className="w-20 h-20   cursor-pointer rounded "
        />
        <p className="text-gray-500 text-sm">{item?.name}</p>
      </div>

      <div className="flex flex-col gap-3">
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
      </div>
      <div className="   md:flex md:flex-col">
        <p className="text-md font-medium text-gray-500">
          {formatPrice(item?.price)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
