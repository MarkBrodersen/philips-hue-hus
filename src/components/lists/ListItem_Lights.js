import PowerButton from "../buttons/PowerButton";
import axios from "axios";
import { useState } from "react";
export default function ListItem_Lights({ item }) {
  const [on, setOn] = useState(item.state.on);
  function handleClick() {
    if (on) {
      axios
        .put(
          `http://192.168.0.118/api/${localStorage.getItem(
            "username"
          )}/lights/${item.id}/state`,
          {
            on: false,
          }
        )
        .then((response) => {
          setOn(false);
        });
    } else {
      axios
        .put(
          `http://192.168.0.118/api/${localStorage.getItem(
            "username"
          )}/lights/${item.id}/state`,
          {
            on: true,
          }
        )
        .then((response) => {
          setOn(true);
        });
    }
  }

  return <PowerButton action={handleClick} all={on} />;
}
