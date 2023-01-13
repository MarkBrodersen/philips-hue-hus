import Container from "../Container";
import { BedSingle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PowerIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import useAxios from "../../hooks/useAxios";
import axios from "axios";
import { LightBulbIcon } from "@heroicons/react/24/solid";
import PowerButton from "../buttons/PowerButton";

export default function GridItem({ item, on, id }) {
  const container = useRef(null);

  const [body, setBody] = useState({});
  const [light, setLight] = useState();

  const [any, setAny] = useState(item.state.any_on);
  const [all, setAll] = useState(item.state.all_on);

  const { response, loading } = useAxios(`lights/${light}`, body, "put");

  function handleClick() {
    if (any) {
      axios
        .put(
          `http://192.168.8.100/api/${localStorage.getItem(
            "username"
          )}/groups/${item.id}/action`,
          {
            on: false,
          }
        )
        .then((response) => {
          console.log(response);
          setAll(false);
          setAny(false);
        });
    } else {
      axios
        .put(
          `http://192.168.8.100/api/${localStorage.getItem(
            "username"
          )}/groups/${item.id}/action`,
          {
            on: true,
          }
        )
        .then((response) => {
          setAll(true);
          setAny(true);
        });
    }
  }

  function raveParty() {
    console.log("rave party");
    axios
      .put(
        `http://192.168.8.100/api/${localStorage.getItem("username")}/groups/${
          item.id
        }/action`,
        {
          on: true,
          effect: "colorloop",
        }
      )
      .then((response) => {
        setAll(true);
        setAny(true);
      });
  }

  return (
    <Container>
      <div className="relative isolate w-auto aspect-square p-4 rounded-3xl flex flex-col justify-between overflow-hidden">
        <AnimatePresence>
          {all ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.75, x: -24, y: 64 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0,
                transition: { delay: 0.5, duration: 5 },
              }}
              exit={{ opacity: 0, scale: 0.75, x: -24, y: 64 }}
              className="h-24 w-24 rounded-full absolute top-4 -right-2 bg-pink-400/50 blur-2xl -z-10"
            ></motion.div>
          ) : null}
        </AnimatePresence>
        <div className="flex justify-between items-center">
          <div className="relative w-12 h-12 md:w-8 md-w-8 flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{
                opacity: 1,
                scale: 1,
                opacity: any === true ? 1 : 0.75,
              }}
              className="absolute h-full w-full flex justify-center items-center"
            >
              <BedSingle
                className="absolute w-7 h-7 text-pink-200"
                strokeWidth={3}
              />
            </motion.div>
            <AnimatePresence>
              {any === true && (
                <motion.div
                  animate={{
                    opacity: 1,
                    scale: [1, 1.1, 1, 1.1, 1],
                    y: [0, -2, 0, 2, 0],
                    x: [0, 2, 2, -2, 0],
                    transition: {
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: Math.random() * 2 + 1,
                      repeatDelay: Math.random() * 2 + 1,
                    },
                  }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="w-6 h-6 rounded-full bg-pink-200 blur-lg"
                ></motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* <motion.button
						onClick={handleClick}
						animate={{
							background: all ? '#F472B6' : any ? '#BE185D' : '#44403C',
							color: all ? '#1C1917' : any ? '#F9A8D4' : '#F9A8D480',
							boxShadow: all
								? '0px 2px 16px #831843, 0px 2px 32px #F9A8D470, inset 0px -1px 2px rgba(255, 255, 255, 0.6), inset 0px 4px 8px rgba(253, 242, 248, 0.5), inset 0px -4px 8px rgba(190, 24, 93, 0.3), inset 0px -8px 16px rgba(190, 24, 93, 0.25)'
								: any
								? '0px 8px 32px rgba(190, 24, 93, 0.25), inset 0px -1px 2px rgba(255, 255, 255, 0.4), inset 0px 4px 8px rgba(253, 242, 248, 0.3), inset 0px -4px 8px rgba(190, 24, 93, 0.3), inset 0px -8px 16px rgba(190, 24, 93, 0.25)'
								: '0px 8px 32px rgba(12, 10, 9, 0.25), inset 0px -1px 2px rgba(250, 250, 249, 0.15), inset 0px 4px 8px rgba(250, 250, 249, 0.1), inset 0px -4px 8px rgba(28, 25, 23, 0.25), inset 0px -8px 16px rgba(28, 25, 23, 0.25)',
						}}
						className='rounded-full bg-pink-300 h-16 w-16 md:w-12 md:h-12 shadow-pinkglow flex items-center justify-center'
					>
						<PowerIcon strokeWidth={3} className='h-7 w-7 md:h-6 md:w-6' />
					</motion.button> */}
          <PowerButton action={handleClick} all={all} any={any} />
        </div>
        <div ref={container}>
          <h3
            onClick={raveParty}
            style={{
              width: container.current?.clientWidth,
            }}
            className="text-stone-100 font-bold text-2xl md:text-xl items-center text-ellipsis overflow-x-hidden h-fit whitespace-nowrap"
          >
            {item.name}
          </h3>
          <div className="flex items-center gap-1">
            <LightBulbIcon className="inline-block text-stone-500 h-4 w-4 md:h-3 md:w-3" />{" "}
            <p className="text-stone-400 text-sm md:text-xs">
              {item.lights.length}{" "}
              {item.lights.length === 1 ? "light" : "lights"}
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
