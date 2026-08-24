import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import Login from "./loginRegister/Login.jsx";
import Register from "./loginRegister/Register.jsx";
import Home from "./mentee/Home.jsx";
import GuestHome from "./guest/GuestHome.jsx";
import VerifyUser from "./loginRegister/VerifyUser.jsx";
import Admin from "./admin/Admin.jsx";
import Mentor from "./mentor/Mentor.jsx";
import ApplyMentor from "./mentor/ApplyMentor.jsx";
import FindMenotros from "./admin/FindMenotros.jsx";
const App = () => {
  const location = useLocation();

  // 🧹 Dismiss all active toasts whenever the route changes
  useEffect(() => {
    toast.dismiss();
  }, [location.pathname]);
  localStorage.getItem("adminToken");
  localStorage.getItem("userToken");
  const isAdminLoggedIn = !!localStorage.getItem("adminToken");
  const isUserLoggedIn = !!localStorage.getItem("userToken");
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
        <Route path="/admin" element={<Admin />} >
          <Route path="find-mentors" element={<FindMenotros />} />
          <Route path="community" element={<div>Community</div>} />
          <Route path="messages" element={<div>Messages</div>} />
          <Route path="settings" element={<div>Settings</div>} />
          <Route path="sessions" element={<div>Sessions</div>} />
          <Route path="profile" element={<div>Profile</div>} />
        </Route>
        <Route path="/mentor" element={<Mentor />} />
        <Route path="/mentor/apply" element={<ApplyMentor />} />

      </Routes>
    </div>
  );
};

export default App;