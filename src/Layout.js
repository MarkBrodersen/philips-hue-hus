import { Outlet } from "react-router-dom";
import Navigation from "./templates/Navigation";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function Layout() {
  return (
    <div className="bg-zinc-900 min-h-screen text-zinc-200">
      <Navigation />
      <div className="pt-14">
        <Outlet />
      </div>
    </div>
  );
}
