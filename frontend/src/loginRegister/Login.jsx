import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api.js";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [userType, setUserType] = useState("mentee");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please enter your email and password.");
            return;
        }

        setLoading(true);

        try {
            const res = await api.post("/login", {
                email,
                password,
                userType
            });

            console.log(res.data);

            if (res.data.message === "Admin login successful") {
                navigate("/admin");
            } else if (res.data.message === "User login successful") {
                navigate("/Home");
            }else if (res.data.message === "Mentor login successful"){
                navigate("/mentor");
            }
        } catch (err) {
            const errorMessage =
                err.response?.data?.detail || "Login failed";

            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f5f3eb] flex items-center justify-center p-4 sm:p-6">

            <Toaster position="top-right" />

            <div className="w-full max-w-5xl min-h-[500px] bg-white rounded-[28px] overflow-hidden shadow-[0_25px_80px_rgba(10,45,40,0.15)] grid lg:grid-cols-[0.9fr_1.1fr]">

                {/* =====================================================
                    LEFT BRAND PANEL
                ====================================================== */}

                <div className="relative hidden lg:flex overflow-hidden bg-[#073b35] text-white p-12 xl:p-16 flex-col justify-between">

                    {/* Decorative circles */}

                    <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full border border-white/10" />

                    <div className="absolute top-20 -right-28 w-72 h-72 rounded-full border border-emerald-200/10" />

                    <div className="absolute bottom-[-150px] left-[-80px] w-[420px] h-[420px] rounded-full bg-emerald-400/10" />

                    <div className="absolute top-[45%] right-[-100px] w-64 h-64 rounded-full bg-teal-300/10 blur-2xl" />


                    {/* Logo */}

                    <div className="relative z-10 flex items-center gap-3">

                        <div className="w-11 h-11 rounded-2xl bg-[#dcefe5] text-[#073b35] flex items-center justify-center text-xl font-black">
                            M
                        </div>

                        <span className="text-2xl font-bold tracking-tight">
                            MentorHub
                        </span>

                    </div>


                    {/* Main Message */}

                    <div className="relative z-10 max-w-md">

                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-sm text-emerald-100 mb-7">

                            <span className="w-2 h-2 rounded-full bg-emerald-300" />

                            Learn. Connect. Grow.

                        </div>

                        <h1 className="font-serif text-5xl xl:text-6xl leading-[1.05] tracking-tight">

                            Your next step
                            <span className="block text-emerald-300">
                                starts here.
                            </span>

                        </h1>

                        <p className="mt-6 text-base xl:text-lg leading-8 text-emerald-50/70">

                            Connect with people who have already walked
                            the path you're about to take. Find guidance,
                            share knowledge and grow together.

                        </p>


                        {/* Benefits */}

                        <div className="mt-9 space-y-4">

                            <div className="flex items-center gap-4">

                                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300">
                                    ✓
                                </div>

                                <span className="text-sm text-white/85">
                                    Learn directly from experienced people
                                </span>

                            </div>

                            <div className="flex items-center gap-4">

                                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300">
                                    ✓
                                </div>

                                <span className="text-sm text-white/85">
                                    Build meaningful professional connections
                                </span>

                            </div>

                            <div className="flex items-center gap-4">

                                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300">
                                    ✓
                                </div>

                                <span className="text-sm text-white/85">
                                    Turn your goals into an action plan
                                </span>

                            </div>

                        </div>

                    </div>


                    {/* Bottom */}

                    <div className="relative z-10 flex items-center gap-3 text-sm text-white/50">

                        <div className="flex -space-x-2">

                            <div className="w-8 h-8 rounded-full bg-[#d6b79c] border-2 border-[#073b35]" />
                            <div className="w-8 h-8 rounded-full bg-[#8ebcae] border-2 border-[#073b35]" />
                            <div className="w-8 h-8 rounded-full bg-[#b8a3c9] border-2 border-[#073b35]" />

                        </div>

                        <span>
                            A community built around growth
                        </span>

                    </div>

                </div>


                {/* =====================================================
                    RIGHT LOGIN PANEL
                ====================================================== */}

                <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-16 xl:px-20">

                    {/* Mobile Logo */}

                    <div className="lg:hidden flex items-center justify-center gap-3 mb-9">

                        <div className="w-10 h-10 rounded-xl bg-[#073b35] text-white flex items-center justify-center font-black">
                            M
                        </div>

                        <span className="text-2xl font-bold text-[#073b35]">
                            MentorHub
                        </span>

                    </div>


                    <div className="w-full max-w-md mx-auto">

                        {/* Heading */}

                        <div className="mb-8">

                            <p className="text-sm font-semibold text-[#16827a] mb-3">
                                Welcome back
                            </p>

                            <h2 className="font-serif text-4xl sm:text-5xl text-[#123b38] tracking-tight">
                                Sign in to MentorHub
                            </h2>

                            <p className="mt-3 text-gray-500 leading-6">
                                Continue your mentorship journey.
                            </p>

                        </div>


                        {/* User Type */}

                        <div className="p-1 bg-[#f1f5f2] rounded-xl flex mb-7">

                            <button
                                type="button"
                                onClick={() => setUserType("mentee")}
                                className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${
                                    userType === "mentee"
                                        ? "bg-white text-[#123b38] shadow-sm"
                                        : "text-gray-500 hover:text-[#123b38]"
                                }`}
                            >
                                I'm a mentee
                            </button>

                            <button
                                type="button"
                                onClick={() => setUserType("mentor")}
                                className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${
                                    userType === "mentor"
                                        ? "bg-white text-[#123b38] shadow-sm"
                                        : "text-gray-500 hover:text-[#123b38]"
                                }`}
                            >
                                I'm a mentor
                            </button>

                        </div>


                        {/* Login Form */}

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            {/* Email */}

                            <div>

                                <label className="block text-sm font-semibold text-[#294642] mb-2">
                                    Email address
                                </label>

                                <div className="relative">

                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        @
                                    </span>

                                    <input
                                        type="email"
                                        value={email}
                                        required
                                        placeholder="you@example.com"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className="w-full h-13 pl-11 pr-4 rounded-xl border border-gray-200 bg-gray-50/70 text-[#123b38] placeholder:text-gray-400 outline-none transition-all focus:bg-white focus:border-[#16827a] focus:ring-4 focus:ring-[#16827a]/10"
                                    />

                                </div>

                            </div>


                            {/* Password */}

                            <div>

                                <div className="flex items-center justify-between mb-2">

                                    <label className="text-sm font-semibold text-[#294642]">
                                        Password
                                    </label>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            toast("Password recovery coming soon.")
                                        }
                                        className="text-xs font-semibold text-[#16827a] hover:text-[#0b5d57] hover:underline"
                                    >
                                        Forgot password?
                                    </button>

                                </div>

                                <div className="relative">

                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        •••
                                    </span>

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={password}
                                        required
                                        placeholder="Enter your password"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        className="w-full h-13 pl-11 pr-12 rounded-xl border border-gray-200 bg-gray-50/70 text-[#123b38] placeholder:text-gray-400 outline-none transition-all focus:bg-white focus:border-[#16827a] focus:ring-4 focus:ring-[#16827a]/10"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500 hover:text-[#123b38]"
                                    >
                                        {showPassword
                                            ? "Hide"
                                            : "Show"}
                                    </button>

                                </div>

                            </div>


                            {/* Remember */}

                            <div className="flex items-center">

                                <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer">

                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded border-gray-300 text-[#16827a] focus:ring-[#16827a]"
                                    />

                                    Remember me

                                </label>

                            </div>


                            {/* Login Button */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-12 rounded-xl bg-[#176b5c] hover:bg-[#0f594d] text-white font-semibold shadow-lg shadow-[#176b5c]/15 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                            >

                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">

                                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />

                                        Signing in...

                                    </span>
                                ) : (
                                    "Sign in"
                                )}

                            </button>

                        </form>


                        {/* Divider */}

                        <div className="flex items-center gap-4 my-7">

                            <div className="flex-1 h-px bg-gray-200" />

                            <span className="text-xs font-medium text-gray-400">
                                OR
                            </span>

                            <div className="flex-1 h-px bg-gray-200" />

                        </div>


                        {/* Google */}

                        <button
                            type="button"
                            onClick={() =>
                                toast("Google login will be connected soon.")
                            }
                            className="w-full h-12 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-[#253b38] font-semibold flex items-center justify-center gap-3 transition-all"
                        >

                            <span className="text-lg font-bold">
                                G
                            </span>

                            Continue with Google

                        </button>


                        {/* Register */}

                        <p className="text-center text-sm text-gray-500 mt-8">

                            Don't have an account?{" "}

                            <Link
                                to="/register"
                                className="font-bold text-[#16827a] hover:text-[#0b5d57] hover:underline"
                            >
                                Create an account
                            </Link>

                        </p>


                        {/* Footer */}

                        <p className="text-center text-xs text-gray-400 mt-8">
                            By continuing, you agree to MentorHub's{" "}
                            <span className="underline cursor-pointer">
                                Terms
                            </span>{" "}
                            and{" "}
                            <span className="underline cursor-pointer">
                                Privacy Policy
                            </span>
                            .
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Login;