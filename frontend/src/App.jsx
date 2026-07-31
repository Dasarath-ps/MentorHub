import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx"
import GuestHome from "./pages/GuestHome.jsx"
import VerifyUser from "./pages/VerifyUser.jsx";
const App = () => {

    return <div>
        <Routes>
            <Route path="/verify" element = {<VerifyUser/>}/>
            <Route path="/" element={<GuestHome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
        </Routes>
    </div>
}

export default App