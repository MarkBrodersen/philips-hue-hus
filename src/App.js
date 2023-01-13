import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Layout from "./Layout";
import NewRoom from "./pages/NewRoom";
import Loading from "./components/animation/Loading";
import Rooms from "./pages/Rooms";
import NewTheme from "./pages/NewTheme";

function App() {
  const [token, setToken] = useState("");
  const username = localStorage.getItem("username");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (username) {
      setLoading(true);
      axios.get(`http://192.168.8.100/api/${username}`).then((res) => {
        setLoading(false);
        if (res.data.error) {
          setToken(undefined);
        } else {
          setToken(username);
        }
      });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <BrowserRouter>
        <Routes>
          {loading ? (
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <div className="h-screen w-screen fixed flex justify-center items-center">
                    <Loading />
                  </div>
                }
              />
            </Route>
          ) : token ? (
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/new-room" element={<NewRoom />} />
              <Route path="/rooms" element={<Rooms />} />
              <Route path="/newtheme" element={<NewTheme/>} />
            </Route>
          ) : (
            <Route path="/" element={<Layout />}>
              <Route path="*" element={<SignIn />} />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
