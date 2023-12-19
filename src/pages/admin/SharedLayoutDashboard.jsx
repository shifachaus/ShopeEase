import { Outlet } from "react-router-dom";
import Sidebar from "../../component/Sidebar";

const SharedLayoutDashboard = () => {
  return (
    <section>
      <Sidebar />
      <Outlet />
    </section>
  );
};

export default SharedLayoutDashboard;
