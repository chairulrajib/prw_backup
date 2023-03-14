 import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Verification from "./pages/Verification";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { loginAction } from "./actions/userAction";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Axios from "axios";
const API_URL = process.env.REACT_APP_API_BASE_URL // "http://localhost:2305"

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const keepLogin = async() => {
    try {
      let getLocalStorage = localStorage.getItem('prw_login');
      console.log('hasilnya adalah  :' ,getLocalStorage)
      if (getLocalStorage) {
        let res = await Axios.get(API_URL + `/users/keep`,{
          headers:{
            "Authorization" :`Bearer ${getLocalStorage}`
          }
        })
          delete res.data.password 
            dispatch(loginAction(res.data));
            setLoading(false);
            localStorage.setItem("prw_login", res.data.token);
      } else {
        setLoading(false);
        console.log()
      }
    } catch(err){
      console.log(err)
      setLoading(false);// loading dimatikan saat mendapatkan response
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
        <Route path="/verification" element={<Verification />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
