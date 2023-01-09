import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Layout from "./Layout";

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
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/rooms" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
