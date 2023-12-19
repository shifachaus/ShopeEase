import { Outlet } from "react-router-dom";
import { Suspense, lazy } from "react";
import Footer from "../component/Footer";
const LazyHeader = lazy(() => import("../component/Header"));

const SharedLayout = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyHeader />
      </Suspense>
      <Outlet />
      <Footer />
    </>
  );
};

export default SharedLayout;
