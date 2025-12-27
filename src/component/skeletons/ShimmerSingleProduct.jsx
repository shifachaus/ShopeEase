const ShimmerSingleProduct = () => {
  return (
    <div className="mx-auto max-w-7xl  p-6 lg:px-8 grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-6 mb-4">
          <div className="  bg-gray-200 animate-pulse flex space-x-4 border  shadow  p-4 w-full mx-auto h-[300px] rounded"></div>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 animate-pulse flex space-x-4 border  shadow  p-4 w-full mx-auto h-16 rounded"
              ></div>
            ))}
          </div>
        </div>
        <div className="h-2.5 bg-gray-200 rounded w-48 animate-pulse border shadow  "></div>
        <div className="h-2 bg-gray-200 rounded w-40 animate-pulse border shadow  "></div>

        <div className="mt-3">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="h-1.5 bg-gray-200 rounded mb-2.5 animate-pulse border shadow "
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShimmerSingleProduct;
