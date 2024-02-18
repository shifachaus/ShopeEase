import { Outlet } from "react-router-dom";
import Footer from "../component/Footer";
import Header from "../component/Header";

const SharedLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default SharedLayout;
