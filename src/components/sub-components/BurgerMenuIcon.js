import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
const BurgerMenuIcon = () => {
  const [clicked, setClicked] = useState(false);
  return (
    <div
      onClick={() => {
        setClicked(!clicked);
        console.log(clicked);
      }}
      className="w-6 flex justify-between items-center relative"
    >
      <AnimatePresence>
        {clicked === false ? (
          <>
            <span className="w-1 h-1 rounded-full bg-white"></span>
            <span className="w-1 h-1 rounded-full bg-white"></span>
            <span className="w-1 h-1 rounded-full bg-white"></span>
          </>
        ) : (
          <>
            <motion.span
              initial={{
                width: 4,
                height: 4,
              }}
              className=" rounded-full bg-white"
            ></motion.span>
            <motion.span
              initial={{
                width: 4,
                height: 4,
              }}
              animate={{ width: 0, height: 0 }}
              className=" rounded-full bg-white"
            ></motion.span>
            <motion.span
              initial={{ width: 4, height: 4 }}
              animate={{ width: 4, height: 4 }}
              exit={{ width: 4, height: 4 }}
              duration={0.5}
              className=" rounded-full bg-white"
            ></motion.span>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BurgerMenuIcon;
