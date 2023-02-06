import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import ListItem_Lights from "../components/lists/ListItem_Lights";
import filterKeys from "../functions/filterKeys";
import useAxios from "../hooks/useAxios";
import {
  ExclamationTriangleIcon,
  LightBulbIcon,
} from "@heroicons/react/24/solid";
export default function Lights({}) {
  const { response, loading } = useAxios("lights");
  const [light, setLight] = useState();

  useEffect(() => {
    if (!response) return;

    const Light = filterKeys(response);
    setLight(Light);
  }, [response]);

  return (
    <>
      {light &&
        light.map((item) => {
          return (
            <div
              key={item.id}
              className="gap-4 flex justify-between items-center"
            >
              <div className="flex items-center">
                <ListItem_Lights item={item} />
                <div className="ml-4">
                  <h3 className=" font-bold ">{item.name}</h3>
                  {item.state.reachable ? (
                    <div className="flex gap-1 items-center">
                      <LightBulbIcon className="w-4 h-4 text-stone-400" />
                      <p className="text-xs font-bold text-stone-500">
                        Connected
                      </p>
                    </div>
                  ) : (
                    <div className="flex gap-1 items-center">
                      <ExclamationTriangleIcon className="w-4 h-4 text-yellow-400" />
                      <p className="text-xs font-bold text-stone-500">
                        Could not connect
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <ChevronRight />
            </div>
          );
        })}
    </>
  );
}
