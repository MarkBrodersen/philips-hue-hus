import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import PowerButton from "../components/buttons/PowerButton";
import ListItem_Zones from "../components/lists/ListItem_Zones";
import filterKeys from "../functions/filterKeys";
import useAxios from "../hooks/useAxios";
export default function Zones({}) {
  const [zones, setZones] = useState();

  const { response, loading } = useAxios("groups");

  useEffect(() => {
    if (!response) return;

    // take the keys of the response object and map them to the values as an id

    const zones = filterKeys(response, (item) => item.type === "Zone");
    console.log(zones);
    setZones(zones);
  }, [response]);

  return (
    <>
      {zones &&
        zones.map((items) => {
          return (
            <div key={items.id} className="flex justify-between">
              <div className="flex">
                <ListItem_Zones item={items} />
                <h3>{items.name}</h3>
              </div>
              <ChevronRight />
            </div>
          );
        })}
    </>
  );
}
