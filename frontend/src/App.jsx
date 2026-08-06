import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import Login from "./loginRegister/Login.jsx";
import Register from "./loginRegister/Register.jsx";
import Home from "./mentee/Home.jsx";
import GuestHome from "./guest/GuestHome.jsx";
import VerifyUser from "./loginRegister/VerifyUser.jsx";
import Admin from "./admin/Admin.jsx";
const App = () => {
  const location = useLocation();

  // 🧹 Dismiss all active toasts whenever the route changes
  useEffect(() => {
    toast.dismiss();
  }, [location.pathname]);

  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#fff",
            color: "#333",
          },
        }}
      />

      <Routes>
        <Route path="/verify" element={<VerifyUser />} />
        <Route path="/" element={<GuestHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
};

export default App;