 import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Verification from "./pages/Verification";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ChangePassword from "./pages/ChangePassword";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { loginAction } from "./actions/userAction";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Axios from "axios";
import Sidebar from "./components/Sidebar";
import ToBeTenant from "./pages/ToBeTenant";
import ResetPassword from "./pages/ResetPassword";
const API_URL = process.env.REACT_APP_API_BASE_URL // "http://localhost:2305"

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();

  const keepLogin = async() => {
    try {
      let getLocalStorage = localStorage.getItem('prw_login');
      // console.log('hasilnya keep login adalah  :' ,getLocalStorage)
      if (getLocalStorage) {
        let res = await Axios.post(API_URL + `/users/keep`,{},{
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
      {/* {location.pathname === '/dashboard' ? <Sidebar /> : <Navbar loading={loading} />} */}
      {['/dashboard','/changepass','/profile','/tobetenant','/changepict', '/mybooking'].includes(location.pathname) ? <Sidebar/> : <Navbar loading={loading} />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/changepass" element={<ChangePassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tobetenant" element={<ToBeTenant />} />
        <Route path="/resetpass" element={<ResetPassword />} />
      </Routes>
      {/* {location.pathname !== '/dashboard' && <Footer />} */}
      {['/','/login','/register','/verification','/resetpass'].includes(location.pathname) && <Footer/>}
    </div>
  );
}

export default App;
