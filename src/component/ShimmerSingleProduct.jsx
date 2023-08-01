const ShimmerSingleProduct = () => {
  return (
    <div className="mx-auto max-w-7xl  p-6 lg:px-8 grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-6 mb-4">
          <div className=" border bg-gray-200 animate-pulse flex space-x-4 border  shadow  p-4 w-full mx-auto h-[300px] rounded"></div>
          <div className="grid grid-cols-4 gap-4">
            <div className=" border bg-gray-200 animate-pulse flex space-x-4 border  shadow  p-4 w-full mx-auto h-16 rounded"></div>
            <div className=" border bg-gray-200 animate-pulse flex space-x-4 border  shadow  p-4 w-full mx-auto h-16 rounded"></div>
            <div className=" border bg-gray-200 animate-pulse flex space-x-4 border  shadow  p-4 w-full mx-auto h-16 rounded"></div>
            <div className=" border bg-gray-200 animate-pulse flex space-x-4 border  shadow  p-4 w-full mx-auto h-16 rounded"></div>
          </div>
        </div>
        <div className="h-2.5 bg-gray-200 rounded w-48 animate-pulse border shadow  "></div>
        <div className="h-2 bg-gray-200 rounded w-40 animate-pulse border shadow  "></div>

        <div className="mt-3">
          <div className="h-2 bg-gray-200 rounded mb-2.5 animate-pulse border shadow "></div>
          <div className="h-2 bg-gray-200 rounded mb-2.5 animate-pulse border shadow "></div>
          <div className="h-2 bg-gray-200 rounded animate-pulse border shadow "></div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerSingleProduct;
