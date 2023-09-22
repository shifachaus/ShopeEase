const Shimmer = ({ box }) => {
  return (
    <div className="mx-auto max-w-7xl  p-6 lg:px-8 grid sm:grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {Array(box)
        .fill("")
        .map((e, index) => (
          <div key={index} className="flex flex-col gap-4">
            <div className="h-20 sm:h-40 md:h-56  xl:h-72 border bg-gray-200 animate-pulse flex space-x-4   shadow  p-4 max-w-sm w-full mx-auto "></div>
            <div className="h-2.5 bg-gray-200 w-32 animate-pulse border shadow  "></div>
          </div>
        ))}
    </div>
  );
};

export default Shimmer;
