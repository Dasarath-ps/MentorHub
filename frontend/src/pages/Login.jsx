import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api.js";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigator = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/login", {
                email,
                password,
            });

            console.log(res.data);
            navigator("/home");
        } catch (err) {
            // Extract the "detail" message sent by FastAPI ("Your email is not verified...")
            const errorMessage = err.response?.data?.detail || "Login failed";
            const status = err.response?.status;

            // 1. Display the backend error message in the toast
            toast.error(errorMessage);

        }
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center p-6">

            <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

                {/* Left Side */}
                <div className="hidden md:flex flex-col justify-center bg-green-600 text-white p-12">

                    <h1 className="text-5xl font-bold">
                        MentorHub
                    </h1>

                    <p className="mt-5 text-lg leading-8 text-green-100">
                        A professional platform where mentors and mentees connect,
                        collaborate and grow together.
                    </p>

                    <div className="mt-10 space-y-5">

                        <div className="flex items-center gap-3">
                            <span className="text-2xl">✓</span>
                            <span>Learn from experienced mentors</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-2xl">✓</span>
                            <span>Book one-to-one mentoring sessions</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-2xl">✓</span>
                            <span>Join an active learning community</span>
                        </div>

                    </div>

                </div>

                {/* Right Side */}
                <div className="p-10 md:p-14">

                    <div className="md:hidden text-center mb-8">
                        <h1 className="text-4xl font-bold text-green-600">
                            MentorHub
                        </h1>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-800">
                        Welcome Back 👋
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Sign in to continue your journey.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">

                        {/* Email */}

                        <div>

                            <label className="text-sm font-semibold text-gray-700">
                                Email Address
                            </label>

                            <div className="relative mt-2">

                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    ✉
                                </span>

                                <input type="email" value={email} required placeholder="Enter your email" onChange={(e) =>
                                    setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 h-12 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white
                        focus:border-green-600 focus:ring-4 focus:ring-green-100 outline-none transition-all"
                                />

                            </div>

                        </div>

                        {/* Password */}

                        <div>

                            <div className="flex justify-between">

                                <label className="text-sm font-semibold text-gray-700">
                                    Password
                                </label>
                            </div>

                            <div className="relative mt-2">

                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    🔒
                                </span>

                                <input type={showPassword ? "text" : "password"} value={password} required
                                    placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 h-12 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white
                        focus:border-green-600 focus:ring-4 focus:ring-green-100 outline-none transition-all"
                                />
                                <button type="button" className="text-sm text-green-600 hover:underline">
                                    Forgot Password?
                                </button>
                                <button type="button" onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                                >
                                    {showPassword ? "🙈" : "👁"}
                                </button>

                            </div>

                        </div>

                        {/* Remember */}

                        <div className="flex justify-between items-center">

                            <label className="flex items-center gap-2 text-sm text-gray-600">

                                <input type="checkbox" className="accent-green-600" />

                                Remember me

                            </label>

                        </div>

                        {/* Login */}

                        <button type="submit"
                            className="w-full h-12 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition-all shadow-lg hover:shadow-xl">
                            Sign In
                        </button>

                    </form>

                    <div className="flex items-center my-8">

                        <div className="flex-1 border-t"></div>

                        <span className="mx-4 text-gray-400 text-sm">
                            OR
                        </span>

                        <div className="flex-1 border-t"></div>

                    </div>

                    <p className="text-center text-gray-600">

                        Don't have an account?{" "}

                        <Link to="/register" className="font-semibold text-green-600 hover:underline">
                            Create Account
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
};

export default Login;