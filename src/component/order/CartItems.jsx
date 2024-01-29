import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/helper";

const CartItems = ({ items }) => {
  return (
    <div className="mb-10 ">
      <h3 className="text-lg font-medium mb-2 tracking-tight sm:text-xl  text-black ">
        Your Cart Items:
      </h3>

      <div className="mt-6 p-2">
        {items?.map((item) => {
          return (
            <div key={item._id} className="grid grid-cols-3 gap-2 items-center">
              <img src={item?.image} alt={item.name} className="h-16 w-20" />
              <Link to={`/product/${item.product}`}>{item.name}</Link>
              <p>
                {item.qty} X {formatPrice(item.price)} ={" "}
                <b>{formatPrice(item.price * item.qty)}</b>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CartItems;
