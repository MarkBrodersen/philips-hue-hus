import { motion } from "framer-motion";

export default function Loading() {
  function template({ rotate, y, scale }) {
    return `rotate(${rotate}) translateY(${y}) scale(${scale})`;
  }
  const array = Array.from({ length: 6 }, (_, i) => i);
  return (
    <motion.div className="w-24 h-24 relative flex justify-center items-center">
      <motion.div
        className="absolute w-16 h-16 bg-pink-400 blur-2xl"
        animate={{ scale: [0.75, 1, 0.75], opacity: [0.75, 1, 0.75] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: array.length * 0.1667 + 0.25,
          ease: "easeInOut",
        }}
      ></motion.div>
      {array.map((_, i) => (
        <motion.div
          transformTemplate={template}
          key={i}
          className="absolute w-4 h-4 bg-pink-300 rounded-full shadow-pink"
          initial={{
            rotate: i * (360 / array.length),
            y: (-8 * array.length) / 2,
          }}
          animate={{
            rotate: i * (360 / array.length),
            y: (-8 * array.length) / 2,
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 1, 0.5],
            filter: ["blur(8px)", "blur(0px)", "blur(0px)", "blur(0px)"],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: array.length * 0.1667,
            // ease: 'easeInOut',
            type: "spring",
            stiffness: 100,
            damping: 10,
            delay: i * 0.05,
            repeatDelay: 0.25,
          }}
        />
      ))}
    </motion.div>
  );
}
