import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const SharedLayout = () => {
  return (
    <main>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default SharedLayout;
