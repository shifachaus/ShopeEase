import { Outlet } from "react-router-dom";
import Sidebar from "../ui/Sidebar";

const SharedLayoutDashboard = () => {
  return (
    <section>
      <Sidebar />
      <Outlet />
    </section>
  );
};

export default SharedLayoutDashboard;
