import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import {useState} from "react";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
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
        } catch (err) {
            console.log(err.message)
        }
    }

    return <div className={`flex justify-center align-center items-center h-screen`}>
        <div className={`flex justify-center items-center flex-col gap-3`}>
            <h1 className={`text-3xl font-bold text-blue-400 Poppins`}>Login</h1>
            <label>Email:</label>
            <Input data={email} setData={setEmail}/>
            <label>
                Password:
            </label>
            <Input data={password} setData={setPassword}/>
            <Button
                onClick={handleSubmit}
                data={"Sign In"}/>
        </div>
    </div>
}

export default Login