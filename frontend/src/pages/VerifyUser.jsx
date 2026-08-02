import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import api from "../api.js";

const OTP_DURATION = 300; // 5 minutes in seconds

const VerifyUser = () => {
    // Array state for 6 single-digit inputs
    const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(OTP_DURATION);
    const [canResend, setCanResend] = useState(false);

    // Refs for input focus management
    const inputRefs = useRef([]);

    const navigator = useNavigate();
    const location = useLocation();
    const email = location.state?.email || "";

    // ⏱ Countdown Timer Logic
    useEffect(() => {
        if (timeLeft <= 0) {
            setCanResend(true);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    // Format seconds to mm:ss
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    // 🔢 Handle digit input and auto-advance
    const handleDigitChange = (index, value) => {
        // Accept only digits
        if (!/^\d*$/.test(value)) return;

        const newDigits = [...otpDigits];
        // Take last entered character if multiple typed
        newDigits[index] = value.slice(-1);
        setOtpDigits(newDigits);

        // Auto-advance focus to next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // ⬅️ Handle Backspace navigation
    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // 📋 Handle Clipboard Paste (Paste full 6-digit code)
    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").trim();
        if (/^\d{6}$/.test(pastedData)) {
            const digits = pastedData.split("");
            setOtpDigits(digits);
            inputRefs.current[5]?.focus();
        }
    };

    // 🔑 Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const fullOtp = otpDigits.join("");

        if (!email) {
            toast.error("Email reference missing. Please register again.");
            navigator("/register");
            return;
        }

        if (timeLeft <= 0) {
            toast.error("OTP has expired. Please click Resend OTP.");
            return;
        }

        if (fullOtp.length < 6) {
            toast.error("Please enter all 6 digits.");
            return;
        }

        setLoading(true);

        try {
            const res = await api.post("/verify-otp", { email, otp: fullOtp });
            toast.success(res.data.message || "Account verified successfully!");

            setTimeout(() => {
                navigator("/login"); // Redirect to Login page
            }, 1200);
        } catch (err) {
            const errorMessage = err.response?.data?.detail || "OTP verification failed";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // 🔄 Handle Resend OTP Request
    const handleResendOtp = async () => {
        if (!email) {
            toast.error("Email reference missing. Please register again.");
            return;
        }

        setResendLoading(true);

        try {
            const res = await api.post("/resend-otp", { email });
            toast.success(res.data.message || "New OTP sent to your email!");

            // Reset timer and inputs
            setTimeLeft(OTP_DURATION);
            setCanResend(false);
            setOtpDigits(["", "", "", "", "", ""]);
            inputRefs.current[0]?.focus();
        } catch (err) {
            const errorMessage = err.response?.data?.detail || "Failed to resend OTP";
            toast.error(errorMessage);
        } finally {
            setResendLoading(false);
        }
    };

    const isComplete = otpDigits.every((d) => d !== "");

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center p-6">
            <Toaster position="top-right" />

            {/* Single Centered Card */}
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 md:p-10 flex flex-col justify-center">

                {/* Header Icon */}
                <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-3xl mb-6">
                    📩
                </div>

                <h2 className="text-3xl font-bold text-gray-800 text-center">Verify Email 🔒</h2>
                <p className="text-gray-500 mt-2 text-center text-sm">
                    We sent a 6-digit code to
                    <br />
                    <span className="font-semibold text-gray-700">{email || "your email"}</span>
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <label className="text-sm font-semibold text-gray-700">Enter Verification Code</label>

                            {/* ⏱ Countdown Timer */}
                            <span className={`text-sm font-medium ${timeLeft > 60 ? "text-green-600" : "text-red-500 animate-pulse"}`}>
                                {timeLeft > 0 ? formatTime(timeLeft) : "Expired"}
                            </span>
                        </div>

                        {/* 6 Digit Input Boxes */}
                        <div className="flex justify-between gap-2" onPaste={handlePaste}>
                            {otpDigits.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    disabled={timeLeft <= 0}
                                    onChange={(e) => handleDigitChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-12 h-14 text-center text-2xl font-bold font-mono rounded-xl border border-gray-300 bg-gray-50 focus:bg-white focus:border-green-600 focus:ring-4 focus:ring-green-100 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Verify Button */}
                    <button
                        type="submit"
                        disabled={loading || timeLeft <= 0 || !isComplete}
                        className="w-full h-12 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>
                </form>

                {/* Resend OTP Section */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Didn't receive the code?{" "}
                        <button
                            type="button"
                            onClick={handleResendOtp}
                            disabled={!canResend || resendLoading}
                            className={`font-semibold transition-all ${
                                canResend && !resendLoading
                                    ? "text-green-600 hover:underline cursor-pointer"
                                    : "text-gray-400 cursor-not-allowed"
                            }`}
                        >
                            {resendLoading ? "Resending..." : "Resend OTP"}
                        </button>
                    </p>
                </div>

                <div className="flex items-center my-6">
                    <div className="flex-1 border-t border-gray-200"></div>
                    <span className="mx-4 text-gray-400 text-xs uppercase">or</span>
                    <div className="flex-1 border-t border-gray-200"></div>
                </div>

                <p className="text-center text-sm text-gray-600">
                    Wrong email address?{" "}
                    <Link to="/register" className="font-semibold text-green-600 hover:underline">
                        Back to Registration
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default VerifyUser;