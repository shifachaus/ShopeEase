const Shimmer = ({ box = 8 }) => {
  return (
    <div className="mx-auto max-w-6xl py-6  grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: box }).map((_, index) => (
        <div key={index} className="flex flex-col gap-4" aria-hidden="true">
          <div className="h-20 sm:h-40 md:h-56 xl:h-72  bg-gray-200 rounded animate-pulse"></div>

          <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
