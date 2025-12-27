import FormButton from "../admin/form/FormButton";

const Proceed = ({ orderData, setStatus, isLoading, updateOrderStatus }) => {
  return (
    <div
      className={
        orderData?.order?.orderStatus === "Delivered"
          ? "hidden"
          : "mt-8 md:col-span-4 "
      }
    >
      <p className="text-xl font-medium  text-[#252323] mb-6 border-b pb-3   text-center">
        Process Order
      </p>
      <div className="flex flex-col gap-4  p-2 ">
        <select
          onChange={(e) => setStatus(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Choose Category</option>
          {orderData?.order?.orderStatus === "Processing" && (
            <option value="Shipped">Shipped</option>
          )}

          {orderData?.order?.orderStatus === "Shipped" && (
            <option value="Delivered">Delivered</option>
          )}
        </select>

        <FormButton
          isLoading={isLoading}
          name={"Proceed"}
          onClick={updateOrderStatus}
        />
      </div>
    </div>
  );
};

export default Proceed;
