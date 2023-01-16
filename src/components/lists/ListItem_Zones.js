import PowerButton from "../buttons/PowerButton";
import axios from "axios";
import { useState } from "react";

export default function ListItem_Zones({ item }) {
  const [any, setAny] = useState(item.state.any_on);
  const [all, setAll] = useState(item.state.any_on);
  function handleClick() {
    if (any) {
      axios
        .put(
          `http://192.168.0.118/api/${localStorage.getItem(
            "username"
          )}/groups/${item.id}/action`,
          {
            on: false,
          }
        )
        .then((response) => {
          setAll(false);
          setAny(false);
        });
    } else {
      axios
        .put(
          `http://192.168.0.118/api/${localStorage.getItem(
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

  return <PowerButton action={handleClick} all={all} any={any} />;
}
