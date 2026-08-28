import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

const MentorProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [mentor, setMentor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const handleApproved = async () => {
        try {
            const response = await api.post(`/mentors/${id}/approve`);
            if (response.data.message === "Mentor approved successfully") {
                alert("Mentor approved successfully!");
                navigate("/admin/find-mentors");
            } else {
                alert("Failed to approve mentor.");
            }
        } catch (error) {
            console.error("Error approving mentor:", error);
            alert("An error occurred while approving the mentor.");
        }
    };
    useEffect(() => {
        const getSingleMentor = async () => {
            try {
                setLoading(true);

                const res = await api.get(`/mentors/${id}`);

                setMentor(res.data.data);
            } catch (error) {
                console.error("Error fetching mentor:", error);
                setError("Unable to load mentor profile.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            getSingleMentor();
        }
    }, [id]);

    // Loading
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-green-600"></div>
                    <p className="text-gray-500">
                        Loading mentor profile...
                    </p>
                </div>
            </div>
        );
    }

    // Error
    if (error || !mentor) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
                <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-2xl">
                        ⚠️
                    </div>

                    <h2 className="mt-5 text-xl font-bold text-gray-900">
                        Mentor Not Found
                    </h2>

                    <p className="mt-2 text-gray-500">
                        {error || "The mentor profile could not be found."}
                    </p>

                    <button
                        onClick={() => navigate(-1)}
                        className="mt-6 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const skills = mentor.skills
        ? mentor.skills.split(",").map((skill) => skill.trim())
        : [];

    return (
        <div className="min-h-screen bg-gray-50">

            {/* ================= HEADER ================= */}
            <section className="relative overflow-hidden bg-gradient-to-br from-green-700 via-green-600 to-emerald-600">

                {/* Decorative circles */}
                <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10"></div>
                <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-white/10"></div>

                <div className="relative mx-auto max-w-6xl px-6 py-10">

                    {/* Back button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-8 flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20"
                    >
                        ← Back to Mentors
                    </button>

                    <div className="flex flex-col gap-8 md:flex-row md:items-center">

                        {/* Profile Image */}
                        <div className="shrink-0">

                            <div className="h-40 w-40 overflow-hidden rounded-3xl border-4 border-white/30 bg-white/20 shadow-2xl">

                                {mentor.profilePic ? (
                                    <img
                                        src={`data:${mentor.profilePicType};base64,${mentor.profilePic}`}
                                        alt={`${mentor.firstName} ${mentor.lastName}`}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center">
                                        <span className="text-6xl font-bold text-white">
                                            {mentor.firstName?.charAt(0)}
                                        </span>
                                    </div>
                                )}

                            </div>

                        </div>

                        {/* Basic Information */}
                        <div className="flex-1 text-white">

                            <div className="flex flex-wrap items-center gap-3">

                                <h1 className="text-3xl font-bold md:text-4xl">
                                    {mentor.firstName} {mentor.lastName}
                                </h1>

                                {/* Status */}
                                <span className="rounded-full bg-yellow-400/20 px-3 py-1 text-xs font-semibold text-yellow-100 ring-1 ring-yellow-300/30">
                                    {mentor.accepted === "accepted"
                                        ? "✓ Accepted Mentor"
                                        : "Pending Approval"}
                                </span>

                            </div>

                            <p className="mt-2 text-lg font-medium text-green-100">
                                {mentor.jobTitle}
                            </p>

                            {mentor.company && (
                                <p className="mt-1 text-green-100/80">
                                    {mentor.company}
                                </p>
                            )}

                            {mentor.location && (
                                <div className="mt-4 flex items-center gap-2 text-sm text-green-50">
                                    <span>📍</span>
                                    <span>{mentor.location}</span>
                                </div>
                            )}

                            {/* Category */}
                            {mentor.category && (
                                <div className="mt-5">
                                    <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
                                        {mentor.category}
                                    </span>
                                </div>
                            )}

                        </div>

                    </div>
                </div>
            </section>


            {/* ================= MAIN CONTENT ================= */}
            <main className="mx-auto max-w-6xl px-6 py-10">

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

                    {/* ================= LEFT COLUMN ================= */}
                    <div className="space-y-8 lg:col-span-2">

                        {/* About */}
                        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

                            <div className="mb-5 flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-lg">
                                    👋
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">
                                        About Me
                                    </h2>

                                    <p className="text-sm text-gray-400">
                                        Get to know your mentor
                                    </p>
                                </div>

                            </div>

                            <p className="leading-8 text-gray-600">
                                {mentor.bio || "No bio available."}
                            </p>

                        </section>


                        {/* Achievement */}
                        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

                            <div className="mb-5 flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-100 text-lg">
                                    🏆
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">
                                        Achievements
                                    </h2>

                                    <p className="text-sm text-gray-400">
                                        Professional experience & highlights
                                    </p>
                                </div>

                            </div>

                            <div className="rounded-xl border border-yellow-100 bg-yellow-50 p-5">

                                <div className="flex gap-4">

                                    <div className="mt-1 text-xl">
                                        ⭐
                                    </div>

                                    <p className="leading-7 text-gray-700">
                                        {mentor.achievement ||
                                            "No achievements added yet."}
                                    </p>

                                </div>

                            </div>

                        </section>


                        {/* Why Mentor */}
                        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

                            <div className="mb-5 flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-lg">
                                    💡
                                </div>

                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">
                                        Why I Want to Mentor
                                    </h2>

                                    <p className="text-sm text-gray-400">
                                        Their mentoring motivation
                                    </p>
                                </div>

                            </div>

                            <p className="leading-8 text-gray-600">
                                {mentor.whyMentor ||
                                    "No information provided."}
                            </p>

                        </section>


                        {/* Skills */}
                        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

                            <h2 className="text-xl font-bold text-gray-900">
                                Skills & Expertise
                            </h2>

                            <p className="mt-1 text-sm text-gray-400">
                                Areas where this mentor can help
                            </p>

                            <div className="mt-5 flex flex-wrap gap-3">

                                {skills.length > 0 ? (
                                    skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="rounded-xl bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-700 ring-1 ring-green-100"
                                        >
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-gray-500">
                                        No skills listed.
                                    </p>
                                )}

                            </div>

                        </section>

                    </div>


                    {/* ================= RIGHT COLUMN ================= */}
                    <div className="space-y-8">

                        {/* Contact Card */}
                        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

                            <h2 className="text-xl font-bold text-gray-900">
                                Connect with Mentor
                            </h2>

                            <p className="mt-1 text-sm leading-6 text-gray-500">
                                Interested in learning from this mentor?
                                Connect with them through the links below.
                            </p>


                            {/* Email */}
                            {mentor.email && (
                                <a
                                    href={`mailto:${mentor.email}`}
                                    className="mt-6 flex items-center gap-4 rounded-xl border border-gray-100 p-4 transition hover:border-green-200 hover:bg-green-50"
                                >

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100">
                                        ✉️
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs font-medium text-gray-400">
                                            Email
                                        </p>

                                        <p className="truncate text-sm font-semibold text-gray-700">
                                            {mentor.email}
                                        </p>
                                    </div>

                                </a>
                            )}


                            {/* LinkedIn */}
                            {mentor.linkedin && (
                                <a
                                    href={mentor.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-3 flex items-center gap-4 rounded-xl border border-gray-100 p-4 transition hover:border-blue-200 hover:bg-blue-50"
                                >

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                                        in
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium text-gray-400">
                                            LinkedIn
                                        </p>

                                        <p className="text-sm font-semibold text-gray-700">
                                            View LinkedIn Profile →
                                        </p>
                                    </div>

                                </a>
                            )}


                            {/* Website */}
                            {mentor.website && (
                                <a
                                    href={mentor.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-3 flex items-center gap-4 rounded-xl border border-gray-100 p-4 transition hover:border-purple-200 hover:bg-purple-50"
                                >

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100">
                                        🌐
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium text-gray-400">
                                            Portfolio
                                        </p>

                                        <p className="text-sm font-semibold text-gray-700">
                                            Visit Website →
                                        </p>
                                    </div>

                                </a>
                            )}

                        </section>


                        {/* Professional Details */}
                        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

                            <h2 className="text-xl font-bold text-gray-900">
                                Professional Details
                            </h2>

                            <div className="mt-5 space-y-5">

                                {/* Job */}
                                <div className="flex gap-4">

                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                                        💼
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Job Title
                                        </p>

                                        <p className="mt-1 font-semibold text-gray-800">
                                            {mentor.jobTitle || "Not specified"}
                                        </p>
                                    </div>

                                </div>


                                {/* Company */}
                                <div className="flex gap-4">

                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                                        🏢
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Company
                                        </p>

                                        <p className="mt-1 font-semibold text-gray-800">
                                            {mentor.company || "Not specified"}
                                        </p>
                                    </div>

                                </div>


                                {/* Location */}
                                <div className="flex gap-4">

                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                                        📍
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Location
                                        </p>

                                        <p className="mt-1 font-semibold text-gray-800">
                                            {mentor.location || "Not specified"}
                                        </p>
                                    </div>

                                </div>


                                {/* Category */}
                                <div className="flex gap-4">

                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                                        🎯
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Expertise Category
                                        </p>

                                        <p className="mt-1 font-semibold text-gray-800">
                                            {mentor.category || "Not specified"}
                                        </p>
                                    </div>

                                </div>

                            </div>

                        </section>


                        {/* CTA */}
                        <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-6 text-white shadow-lg">

                            <div className="text-3xl">
                                🚀
                            </div>

                            <h2 className="mt-4 text-xl font-bold">
                                Ready to learn?
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-gray-300">
                                Connect with {mentor.firstName} and start
                                your mentoring journey.
                            </p>

                            <button
                                onClick={handleApproved}
                                className="mt-5 w-full rounded-xl bg-green-500 px-5 py-3 font-semibold text-white transition hover:bg-green-400 active:scale-95"
                            >
                                Approved
                            </button>

                        </section>

                    </div>

                </div>

            </main>

        </div>
    );
};

export default MentorProfile;