import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import ListItem_Zones from "../components/lists/ListItem_Zones";
import filterKeys from "../functions/filterKeys";
import useAxios from "../hooks/useAxios";
import {
  ExclamationTriangleIcon,
  LightBulbIcon,
} from "@heroicons/react/24/solid";
export default function Zones({}) {
  const [zones, setZones] = useState();

  const { response, loading } = useAxios("groups");

  useEffect(() => {
    if (!response) return;

    // take the keys of the response object and map them to the values as an id

    const zones = filterKeys(response, (item) => item.type === "Zone");
    setZones(zones);
  }, [response]);

  return (
    <>
      {zones &&
        zones.map((items) => {
          return (
            <div
              key={items.id}
              className="gap-4 flex justify-between items-center"
            >
              <div className="flex items-center">
                <ListItem_Zones item={items} />
                <div className="ml-4">
                  <h3 className="font-bold">{items.name}</h3>
                  {items.state.reachable ? (
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
