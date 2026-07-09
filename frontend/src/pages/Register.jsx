import {useState} from "react";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import api from "../api.js";

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userName, setUserName] = useState("")
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
        } catch (err) {
            console.log(err.message)
        }
    }

    return <div className={`flex justify-center align-center items-center h-screen`}>
        <div className={`flex justify-center items-center flex-col gap-3`}>
            <h1 className={`text-3xl font-bold text-blue-400 Poppins`}>Register</h1>
            <label>UserName:</label>
            <Input data={userName} setData={setUserName}/>
            <label>Email:</label>
            <Input data={email} setData={setEmail}/>
            <label>Password:</label>
            <Input data={password} setData={setPassword}/>
            <Button
                onClick={handleSubmit}
                data={"Sign In"}/>

        </div>
    </div>
}

export default Register
