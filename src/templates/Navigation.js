import { ChevronLeft } from "lucide-react";
import BurgerMenuIcon from "../components/sub-components/BurgerMenuIcon";

const Navigation = () => {
  return (
    <header className="w-full p-4 flex justify-between  fixed top-0">
      <ChevronLeft className="w-7 h-7" />
      <h1>Home</h1>
      <BurgerMenuIcon />
    </header>
  );
};

export default Navigation;
