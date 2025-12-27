const Summary = ({ productData, orderData, userData, totalAmount }) => {
  return (
    <div className="p-4  ">
      <div className="sm:grid sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6  flex flex-col">
        <div className=" bg-white mb-4 text-black p-4 shadow-md rounded">
          <span className="text-sm font-semibold bg-blue-200 rounded  px-2 py-1  ">
            Total Amount
          </span>
          <p className="text-2xl md:text-3xl  mt-4">{totalAmount / 100}</p>
        </div>

        <div className=" bg-white mb-4 text-black p-4 shadow-md rounded">
          <span className="text-sm font-semibold bg-green-200 rounded  px-2 py-1 ">
            Product
          </span>
          <p className="text-2xl md:text-3xl  mt-4">
            {productData?.products?.length}
          </p>
        </div>
        <div className=" bg-white mb-4 text-black p-4 shadow-md rounded">
          <span className="text-sm font-semibold bg-purple-200 rounded  px-2 py-1">
            Orders
          </span>
          <p className="text-2xl md:text-3xl  mt-4">
            {orderData?.orders?.length}
          </p>
        </div>
        <div className="  bg-white mb-4 text-black p-4 shadow-md rounded">
          <span className="text-sm font-semibold bg-yellow-100 rounded  px-2 py-1 ">
            Users
          </span>
          <p className="text-2xl md:text-3xl  mt-4">
            {userData?.users?.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
