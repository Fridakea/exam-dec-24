import { Outlet, Link } from "react-router-dom";
import { ERoutes } from "@/main.tsx";

export const Layout = () => {
  return (
    <>
      <nav>
        <Link to={ERoutes.HOME}>Home</Link>
        <Link to={ERoutes.SCHEDULE}>Schedule</Link>
        <Link to={ERoutes.PAYMENT}>Payment</Link>
      </nav>

      <Outlet />
    </>
  );
};
