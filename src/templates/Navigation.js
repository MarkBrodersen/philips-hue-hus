import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import BurgerMenu from "../components/sub-components/BurgerMenu";
import { useEffect } from "react";

const Navigation = () => {
  let place = useLocation().pathname;
  const navigate = useNavigate;
  return (
    <header className="w-full p-4 pr-6 flex justify-between  fixed top-0">
      {place !== "/" ? (
        <button onClick={navigate("/")}>
          <ChevronLeft className="w-7 h-7" />
        </button>
      ) : (
        <p className="w-[28px] h-[28px]"></p>
      )}
      {place === "/" ? (
        <h1>Home</h1>
      ) : (
        (place = "/rooms" ? (
          <h1>Rooms</h1>
        ) : (
          (place = "/newroom" ? (
            <h1>New Room</h1>
          ) : (
            (place = "/themes" ? (
              <h1>Themes</h1>
            ) : (
              (place = "/newtheme" ? <h1>New Theme</h1> : null)
            ))
          ))
        ))
      )}
      <BurgerMenu />
    </header>
  );
};

export default Navigation;
