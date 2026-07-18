import {useState} from "react";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import api from "../api.js";
import {useNavigate, useNavigation} from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userName, setUserName] = useState("")
    const navigator = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/register",
                {
                    userName,
                    email,
                    password
                }
            )
            console.log(res.data)
            navigator('/login')
        } catch (err) {
            console.log(err.message)
        }
    }

    return <div className={`flex justify-center align-center items-center h-screen bg-gray-800`}>
        <div className={`flex justify-center items-center flex-col gap-3`}>
            <h1 className={`text-3xl font-bold text-blue-400 Poppins`}>Register</h1>
            <label className={`text-white`}>UserName:</label>
            <Input data={userName} setData={setUserName} ofType={"text"}/>
            <label className={`text-white`}>Email:</label>
            <Input data={email} setData={setEmail} ofType={"email"}/>
            <label className={`text-white`}>Password:</label>
            <Input data={password} setData={setPassword} ofType={"password"}/>
            <Button
                onClick={handleSubmit}
                data={"Sign In"}/>

        </div>
    </div>
}

export default Register
