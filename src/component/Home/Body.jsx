import { Suspense, lazy } from "react";
import Loading from "../Loading";
const Instagram = lazy(() => import("./Instagram"));
const DisplayProduct = lazy(() => import("./DisplayProduct"));
const Product = lazy(() => import("./Product"));
const Hero = lazy(() => import("./Hero"));

const Body = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Hero />
        <Product />
        <div className="bg-gray-100">
          <DisplayProduct />
          <Instagram />
        </div>
      </Suspense>
    </>
  );
};

export default Body;
