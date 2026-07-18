import {Routes, Route} from "react-router-dom"
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx"

const App = () => {

    return <div>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
    </div>
}

export default App