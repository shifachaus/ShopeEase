import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";

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
