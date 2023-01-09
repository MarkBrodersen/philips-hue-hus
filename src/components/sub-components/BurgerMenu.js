import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { NavLink } from "react-router-dom";
const BurgerMenu = () => {
  const [clicked, setClicked] = useState(false);
  return (
    <>
      <div
        onClick={() => {
          setClicked(!clicked);
        }}
        className="w-6 flex justify-between items-center relative"
      >
        <AnimatePresence>
          {clicked === false ? (
            <>
              <motion.span
                initial={{
                  marginRight: -12,
                  rotate: 45,
                  width: 32,
                }}
                animate={{ width: 4, height: 4 }}
                transition={{ type: "anticipate" }}
                className="rounded-full bg-white"
              ></motion.span>
              <motion.span
                initial={{ width: 0, height: 0 }}
                animate={{ width: 4, height: 4 }}
                transition={{ type: "anticipate" }}
                className="rounded-full bg-white"
              ></motion.span>
              <motion.span
                initial={{
                  marginLeft: -12,
                  rotate: -45,
                  width: 32,
                }}
                animate={{ width: 4, height: 4 }}
                transition={{ type: "anticipate" }}
                className="rounded-full bg-white"
              ></motion.span>
            </>
          ) : (
            <>
              <motion.span
                initial={{ width: 4, height: 4 }}
                animate={{
                  marginRight: -12,
                  rotate: 45,
                  width: 32,
                }}
                transition={{ type: "anticipate" }}
                className=" rounded-full bg-white"
              ></motion.span>
              <motion.span
                initial={{ width: 4, height: 4 }}
                animate={{ width: 0, height: 0 }}
                transition={{ type: "anticipate" }}
                className=" rounded-full bg-white"
              ></motion.span>
              <motion.span
                initial={{ width: 4, height: 4 }}
                animate={{
                  marginLeft: -12,
                  rotate: -45,
                  width: 32,
                }}
                transition={{ type: "anticipate" }}
                className=" rounded-full bg-white"
              ></motion.span>
            </>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {clicked === true ? (
          <motion.aside
            initial={{ right: -400, top: 64 }}
            animate={{ right: 0, top: 64 }}
            className="absolute shadow-container rounded-l-3xl p-5 w-64 bg-gradient-to-tr from-stone-800/50 to-stone-800"
          >
            <ul>
              <li className="text-xl font-medium ">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="text-xl font-medium mt-5">
                <NavLink to="/rooms">Rooms</NavLink>
              </li>
              <li className="text-xl font-medium mt-5">
                <NavLink to="/newroom">New Room</NavLink>
              </li>
              <li className="text-xl font-medium mt-5">
                <NavLink to="/themes">Themes</NavLink>
              </li>
              <li className="text-xl font-medium mt-5">
                <NavLink to="/newthemes">New Theme</NavLink>
              </li>
            </ul>
          </motion.aside>
        ) : (
          <motion.aside
            initial={{ right: 0, top: 64 }}
            animate={{ right: -400, top: 64 }}
            className="absolute shadow-container rounded-l-3xl p-5 w-64 bg-gradient-to-tr from-stone-800/50 to-stone-800"
          >
            <ul>
              <li className="text-xl font-medium ">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="text-xl font-medium mt-5">
                <NavLink to="/rooms">Rooms</NavLink>
              </li>
              <li className="text-xl font-medium mt-5">
                <NavLink to="/newroom">New Room</NavLink>
              </li>
              <li className="text-xl font-medium mt-5">
                <NavLink to="/themes">Themes</NavLink>
              </li>
              <li className="text-xl font-medium mt-5">
                <NavLink to="/newthemes">New Theme</NavLink>
              </li>
            </ul>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default BurgerMenu;
