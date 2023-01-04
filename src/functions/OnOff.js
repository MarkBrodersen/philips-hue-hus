function onOffHandler() {
  const url =
    "http://192.168.8.100/api/jOlSE9c5q3ugMwt-VyS05oeaBZpwXQJbaUcY8Zf0/lights/53/state";
  const command = {
    on: true,
  };
  const onOffChecker = false;
  if (onOffChecker === false) {
    command = { on: true };
  } else {
    command = { on: false };
  }
  axios.put(url, command);
}
export default onOffHandler;
