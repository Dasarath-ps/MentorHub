import React from "react";
import { Link } from "react-router-dom";

const mentors = [
    {
        name: "Brad Rogers",
        role: "Supply Chain Planning Director",
        company: "PepsiCo",
        image: "/images/mentor1.jpg",
        skills: ["Leadership", "Operations", "Decision Making"],
    },
    {
        name: "Alexandre Blanchet",
        role: "Python Software Engineer",
        company: "Updev",
        image: "/images/mentor2.jpg",
        skills: ["Python", "Django", "Software Engineering"],
    },
    {
        name: "Seda Elibol",
        role: "Career Coach | Product Manager",
        company: "Independent",
        image: "/images/mentor3.jpg",
        skills: ["Product Management", "Product Strategy", "Research"],
    },
    {
        name: "James Wilson",
        role: "Technology Executive",
        company: "Tech Industry",
        image: "/images/mentor4.jpg",
        skills: ["Technology", "Leadership", "Strategy"],
    },
];

const Mentor = () => {
    return (
        <div className="min-h-screen bg-[#f5f7f2] text-[#163b35]">

            {/* NAVBAR */}
            <header className="sticky top-0 z-50 border-b border-[#dce8df] bg-[#f5f7f2]/95 backdrop-blur-md">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

                    <Link to="/" className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#103d35] font-bold text-white">
                            M
                        </div>

                        <span className="text-xl font-bold tracking-tight">
                            MentorHub
                        </span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <Link
                            to="/login"
                            className="hidden rounded-full px-5 py-2.5 text-sm font-semibold text-[#176b5c] transition hover:bg-[#e8f2eb] sm:block"
                        >
                            Sign in
                        </Link>

                        <Link
                            to="/mentor/apply"
                            className="rounded-full bg-[#176b5c] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#0f594d]"
                        >
                            Become a mentor
                        </Link>
                    </div>

                </div>
            </header>


            {/* HERO */}
            <section className="px-6 py-20 sm:py-24">
                <div className="mx-auto max-w-7xl">

                    <div className="mx-auto max-w-3xl text-center">

                        <div className="mb-5 inline-flex rounded-full bg-[#eaf6ed] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#176b5c]">
                            MentorHub Community
                        </div>

                        <h1 className="text-4xl font-semibold tracking-tight text-[#163b35] sm:text-5xl lg:text-6xl">
                            Learn from people
                            <span className="block text-[#2c8b77]">
                                worth learning from.
                            </span>
                        </h1>

                        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg">
                            Connect with experienced professionals who can
                            guide you through your career, skills and goals.
                        </p>

                    </div>


                    {/* MENTOR CARDS */}
                    <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                        {mentors.map((mentor) => (
                            <div
                                key={mentor.name}
                                className="group overflow-hidden rounded-3xl border border-[#dce8df] bg-white shadow-[0_15px_45px_rgba(15,55,45,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(15,55,45,0.13)]"
                            >

                                {/* IMAGE */}
                                <div className="h-56 overflow-hidden bg-[#e8f2eb]">
                                    <img
                                        src={mentor.image}
                                        alt={mentor.name}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                    />
                                </div>

                                {/* CONTENT */}
                                <div className="p-5">

                                    <h2 className="text-xl font-semibold text-[#163b35]">
                                        {mentor.name}
                                    </h2>

                                    <p className="mt-1 text-sm leading-5 text-gray-500">
                                        {mentor.role}
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-[#176b5c]">
                                        {mentor.company}
                                    </p>

                                    {/* SKILLS */}
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {mentor.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="rounded-full bg-[#eef6f0] px-3 py-1.5 text-xs font-medium text-[#176b5c]"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    {/* VIEW BUTTON */}
                                    <Link
                                        to="/mentors"
                                        className="mt-5 block w-full rounded-xl border border-[#176b5c] py-2.5 text-center text-sm font-semibold text-[#176b5c] transition hover:bg-[#176b5c] hover:text-white"
                                    >
                                        View mentor
                                    </Link>

                                </div>

                            </div>
                        ))}

                    </div>


                    {/* BECOME MENTOR */}
                    <div className="mt-16 rounded-3xl bg-[#103d35] px-6 py-10 text-center text-white shadow-[0_20px_60px_rgba(15,55,45,0.15)] sm:px-10">

                        <h2 className="text-2xl font-semibold sm:text-3xl">
                            Have experience to share?
                        </h2>

                        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-emerald-50/70 sm:text-base">
                            Help students and professionals grow by sharing
                            your knowledge and experience.
                        </p>

                        <Link
                            to="/mentor/apply"
                            className="mt-6 inline-flex rounded-xl bg-[#d8f0dc] px-7 py-3 font-semibold text-[#103d35] transition hover:-translate-y-0.5 hover:bg-white"
                        >
                            Become a mentor →
                        </Link>

                    </div>

                </div>
            </section>

        </div>
    );
};

export default Mentor;