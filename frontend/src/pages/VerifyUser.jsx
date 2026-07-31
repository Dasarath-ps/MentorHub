
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import api from "../api.js";

const VerifyUser = () => {
    const [otp, setOtp] = useState()
    const [showOtp, setShowOtp] = useState()
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


                    <form
                        onSubmit={handleSubmit}
                        className="mt-8 space-y-6"
                    >
                        {/*{OTP}*/}
 <div>

                            <label className="text-sm font-semibold text-gray-700">
                                OTP
                            </label>

                            <div className="relative mt-2">

                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    🔒
                                </span>

                                <input
                                    type={showOtp ? "text" : "password"}
                                    value={otp}
                                    placeholder="Create a password"
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full pl-12 pr-12 h-12 rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-100 outline-none transition-all"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                                >
                                    {showOtp ? "🙈" : "👁"}
                                </button>

                            </div>

                        </div>





                        {/* Register Button */}
                        <button
                            type="submit"
                            className="w-full h-12 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition-all shadow-lg hover:shadow-xl"
                        >
                            Verify
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

export default VerifyUser;

