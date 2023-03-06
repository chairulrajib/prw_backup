import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { loginAction } from "./actions/userAction";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Axios from "axios";
const API_URL = "http://localhost:2300";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const keepLogin = () => {
    let getLocalStorage = JSON.parse(localStorage.getItem('prw_login'));
    console.log('hasilnya adalah  :' ,getLocalStorage)
    if (getLocalStorage) {
      Axios.get(API_URL + `/user?id=${getLocalStorage.id}`)
        .then((res) => {
          dispatch(loginAction(res.data));
          setLoading(false);
          localStorage.setItem("prw_login", JSON.stringify(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLoading(false);
      console.log()
    }
  };

  useEffect(() => {
    keepLogin();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <div>
      <Navbar loading={loading} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
