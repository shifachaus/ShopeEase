const Summary = ({ productData, orderData, userData, totalAmount }) => {
  return (
    <div className="p-4  ">
      <div className="sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4  md:gap-6  flex flex-col">
        <div className=" bg-white mb-4 text-black p-4 border rounded-xl shadow-sm">
          <span className="text-xs rounded-full  px-3 py-1  bg-blue-200 ">
            Total Amount
          </span>
          <p className="text-2xl md:text-3xl  mt-4">{totalAmount / 100}</p>
        </div>

        <div className=" bg-white mb-4 text-black p-4 border rounded-xl shadow-sm">
          <span className="text-xs rounded-full  px-3 py-1  bg-green-200  ">
            Product
          </span>
          <p className="text-2xl md:text-3xl  mt-4">
            {productData?.products?.length}
          </p>
        </div>
        <div className=" bg-white mb-4 text-black p-4 border rounded-xl shadow-sm">
          <span className="text-xs rounded-full  px-3 py-1  bg-purple-200 ">
            Orders
          </span>
          <p className="text-2xl md:text-3xl  mt-4">
            {orderData?.orders?.length}
          </p>
        </div>
        <div className="  bg-white mb-4 text-black p-4 border rounded-xl shadow-sm">
          <span className="text-xs rounded-full  px-3 py-1  bg-yellow-100  ">
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
