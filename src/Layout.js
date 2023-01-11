import { Outlet } from "react-router-dom";
import Navigation from "./templates/Navigation";

export default function Layout() {
  return (
    <div className="bg-stone-900 min-h-screen text-stone-200">
      <Navigation />
      <div className="pt-14">
        <Outlet />
      </div>
    </div>
  );
}
