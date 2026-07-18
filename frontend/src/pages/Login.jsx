import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../api.js";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigator = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/login",
                {
                    email,
                    password
                }
            )
            console.log(res.data)
            navigator("/")
        } catch (err) {
            console.log(err.response.data)
        }
    }

    return <div className={`flex justify-center align-center items-center h-screen bg-gray-800`}>
        <div className={`flex justify-center items-center flex-col gap-3`}>
            <h1 className={`text-3xl font-bold text-blue-400 Poppins`}>Login</h1>
            <label className={`text-white`}>Email:</label>
            <Input data={email} setData={setEmail} ofType={"text"}/>
            <label className={`text-white`}>
                Password:
            </label>
            <Input data={password} setData={setPassword} ofType={"password"}/>
            <Button
                onClick={handleSubmit}
                data={"Sign In"}/>
        </div>
    </div>
}

export default Login