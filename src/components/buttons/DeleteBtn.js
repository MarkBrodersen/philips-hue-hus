import axios from "axios";

export default function DeleteBtn({ id, groupType }) {
  const username = localStorage.getItem("username");
  function handleDelete() {
    axios.delete(`http://192.168.8.100/api/${username}/groups/${id}`);

    alert("you have deleted this group");

    window.history.back();
  }
  return (
    <button onClick={handleDelete} className="">
      Delete {groupType}
    </button>
  );
}
