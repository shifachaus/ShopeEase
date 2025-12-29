import { formatPrice } from "../../utils/helper";

const CartTotals = ({ total }) => {
  return (
    <>
      <h2 className=" text-xl ">Cart Totals</h2>
      <div className="md: bg-gray-100">
        <div className=" flex flex-col  gap-4 rounded p-5 h-fit">
          <div className=" flex flex-col  gap-2 mb-4">
            <div className="flex justify-between gap-2 items-center">
              <p className="font-medium text-md">Subtotals</p>
              <p className="font-medium text-sm text-slate-600">
                {" "}
                {formatPrice(total)}
              </p>
            </div>
            <div className="flex justify-between gap-2 items-center">
              <p className="font-medium text-md">Total</p>
              <p className="font-medium text-slate-600 text-sm">
                {formatPrice(total)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartTotals;
