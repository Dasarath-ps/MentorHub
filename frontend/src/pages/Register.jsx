
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api.js";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
const [confirmPassword, setConfirmPassword] = useState("")
    const navigator = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/register", {
                userName,
                email,
                password,
            });

            console.log(res.data);
            alert("Check your email")
            navigator("/verify")
        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center p-6">

            <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

                {/* Left Side */}
                <div className="hidden md:flex flex-col justify-center bg-green-600 text-white p-12">

                    <h1 className="text-5xl font-bold">
                        MentorHub
                    </h1>

                    <p className="mt-5 text-lg leading-8 text-green-100">
                        Join a growing community where mentors and mentees connect,
                        learn together, and achieve their goals.
                    </p>

                    <div className="mt-10 space-y-5">

                        <div className="flex items-center gap-3">
                            <span className="text-2xl">✓</span>
                            <span>Find experienced mentors</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-2xl">✓</span>
                            <span>Share your knowledge with others</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-2xl">✓</span>
                            <span>Grow through mentorship</span>
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
                        Create Account 🚀
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Create your MentorHub account to get started.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 space-y-6"
                    >

                        {/* Username */}
                        <div>

                            <label className="text-sm font-semibold text-gray-700">
                                Username
                            </label>

                            <div className="relative mt-2">

                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    👤
                                </span>

                                <input
                                    type="text"
                                    value={userName}
                                    placeholder="Choose a username"
                                    onChange={(e) => setUserName(e.target.value)}
                                    className="w-full pl-12 pr-4 h-12 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-100 outline-none transition-all"
                                />

                            </div>

                        </div>

                        {/* Email */}
                        <div>

                            <label className="text-sm font-semibold text-gray-700">
                                Email Address
                            </label>

                            <div className="relative mt-2">

                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    ✉
                                </span>

                                <input
                                    type="email"
                                    value={email}
                                    placeholder="Enter your email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 h-12 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-100 outline-none transition-all"
                                />

                            </div>

                        </div>

                        {/* Password */}
                        <div>

                            <label className="text-sm font-semibold text-gray-700">
                                Password
                            </label>

                            <div className="relative mt-2">

                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    🔒
                                </span>

                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    placeholder="Create a password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 h-12 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-100 outline-none transition-all"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                                >
                                    {showPassword ? "🙈" : "👁"}
                                </button>

                            </div>

                        </div>
                        {/*Confirm Password*/}

                        <div>

                            <label className="text-sm font-semibold text-gray-700">
                                Confirm Password
                            </label>

                            <div className="relative mt-2">

                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    🔒
                                </span>

                                <input
                                    type={confirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    placeholder="Create a password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 h-12 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-100 outline-none transition-all"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!confirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                                >
                                    {confirmPassword ? "🙈" : "👁"}
                                </button>

                            </div>

                        </div>

                        {/* Terms */}
                        <label className="flex items-start gap-3 text-sm text-gray-600">

                            <input
                                type="checkbox"
                                required
                                className="mt-1 accent-green-600"
                            />

                            <span>
                                I agree to the{" "}
                                <span className="text-green-600 font-medium cursor-pointer hover:underline">
                                    Terms & Conditions
                                </span>{" "}
                                and{" "}
                                <span className="text-green-600 font-medium cursor-pointer hover:underline">
                                    Privacy Policy
                                </span>
                            </span>

                        </label>

                        {/* Register Button */}
                        <button
                            type="submit"
                            className="w-full h-12 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition-all shadow-lg hover:shadow-xl"
                        >
                            Create Account
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

                        Already have an account?{" "}

                        <Link
                            to="/"
                            className="font-semibold text-green-600 hover:underline"
                        >
                            Sign In
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
};

export default Register;

