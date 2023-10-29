import { Outlet } from "react-router-dom";
import { Suspense, lazy } from "react";
import Footer from "./Footer";
const LazyHeader = lazy(() => import("./Header"));

const SharedLayout = () => {
  return (
    <main>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <LazyHeader />
        </Suspense>
        <Outlet />
        <Footer />
      </main>
    </main>
  );
};

export default SharedLayout;
