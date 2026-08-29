import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const mentors = [
    {
        name: "Riya Shah",
        initials: "RS",
        role: "Staff Software Engineer · FinTech",
        description:
            "Helps developers move from tutorials to production-ready projects and stronger technical interviews.",
        skills: ["JavaScript", "React", "Career"],
        price: "₹799",
        rating: "5.0",
        keywords: "software engineering javascript react web development career",
    },
    {
        name: "Aditya Menon",
        initials: "AM",
        role: "Product Design Lead · SaaS",
        description:
            "Practical portfolio reviews, UX thinking and product design guidance for students and early designers.",
        skills: ["UI/UX", "Figma", "Portfolio"],
        price: "₹699",
        rating: "4.9",
        keywords: "ui ux design product design portfolio figma",
    },
    {
        name: "Nisha Kapoor",
        initials: "NK",
        role: "Founder & Startup Advisor",
        description:
            "Helps aspiring founders test ideas, understand customers and build a realistic first roadmap.",
        skills: ["Startups", "Strategy", "Growth"],
        price: "₹999",
        rating: "5.0",
        keywords: "startup entrepreneurship business marketing founder strategy growth",
    },
];

const categories = [
    {
        icon: "⌘",
        title: "Software Development",
        description:
            "Code reviews, projects, architecture and real-world engineering.",
    },
    {
        icon: "◈",
        title: "Design & UX",
        description:
            "Build your portfolio, improve your process and think like a designer.",
    },
    {
        icon: "↗",
        title: "Business & Startup",
        description:
            "Validate ideas, make decisions and learn from founders.",
    },
    {
        icon: "◎",
        title: "Career & Interviews",
        description:
            "Get practical support for resumes, interviews and career moves.",
    },
];

const Home = () => {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [mobileMenu, setMobileMenu] = useState(false);

    const filteredMentors = mentors.filter((mentor) => {
        const query = search.toLowerCase().trim();

        if (!query) return true;

        return (
            mentor.keywords.includes(query) ||
            mentor.name.toLowerCase().includes(query) ||
            mentor.role.toLowerCase().includes(query) ||
            mentor.skills.some((skill) =>
                skill.toLowerCase().includes(query)
            )
        );
    });

    const scrollToSearch = () => {
        document
            .getElementById("search")
            ?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
    };

    const searchMentors = () => {
        document
            .getElementById("mentors")
            ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
    };

    const quickSearch = (text) => {
        setSearch(text);

        setTimeout(() => {
            document
                .getElementById("mentors")
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
        }, 100);
    };

    return (
        <div className="min-h-screen bg-[#fbfaf6] text-[#123b38]">

            {/* =====================================================
                NAVBAR
            ====================================================== */}


            <header className="sticky top-0 z-50 border-b border-[#123b38]/10 bg-[#fbfaf6]/90 backdrop-blur-xl">

                <div className="w-[92%] max-w-[1180px] mx-auto h-[76px] flex items-center gap-8">

                    <Link
                        to="/Home"
                        className="flex items-center gap-2.5 mr-auto"
                    >
                        <div className="w-10 h-10 rounded-xl bg-[#082f2b] text-white flex items-center justify-center text-xl font-bold -rotate-3">
                            M
                        </div>

                        <span className="text-[23px] font-extrabold tracking-tight">
                            MentorHub
                        </span>
                    </Link>

                    {/* Desktop navigation */}

                    <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-[#39534e]">

                        <a
                            href="#mentors"
                            className="hover:text-[#177fc0] transition"
                        >
                            Find Mentors
                        </a>

                        <a
                            href="#categories"
                            className="hover:text-[#177fc0] transition"
                        >
                            Explore Skills
                        </a>

                        <a
                            href="#how"
                            className="hover:text-[#177fc0] transition"
                        >
                            How It Works
                        </a>

                        <a
                            href="#about"
                            className="hover:text-[#177fc0] transition"
                        >
                            For Mentors
                        </a>

                    </nav>

                    {/* Desktop buttons */}

                    <div className="hidden sm:flex items-center gap-2.5">

                        {
                            !localStorage.getItem("userToken") ? (<button
                                onClick={() => navigate("/login")}
                                className="px-5 py-3 rounded-full border border-[#b8c9c2] text-sm font-bold hover:bg-white transition"
                            >
                                Log in
                            </button>) : (<></>)
                        }

                        <button
                            onClick={scrollToSearch}
                            className="px-5 py-3 rounded-full bg-[#177fc0] text-white text-sm font-bold shadow-lg shadow-[#177fc0]/20 hover:-translate-y-0.5 transition"
                        >
                            Get Started
                        </button>

                    </div>

                    {/* Mobile menu */}

                    <button
                        onClick={() => setMobileMenu(!mobileMenu)}
                        className="lg:hidden text-2xl"
                    >
                        ☰
                    </button>

                </div>

                {mobileMenu && (
                    <div className="lg:hidden bg-[#fbfaf6] border-t border-[#d8e3dc] px-6 py-5 space-y-4">

                        <a
                            href="#mentors"
                            onClick={() => setMobileMenu(false)}
                            className="block font-semibold"
                        >
                            Find Mentors
                        </a>

                        <a
                            href="#categories"
                            onClick={() => setMobileMenu(false)}
                            className="block font-semibold"
                        >
                            Explore Skills
                        </a>

                        <a
                            href="#how"
                            onClick={() => setMobileMenu(false)}
                            className="block font-semibold"
                        >
                            How It Works
                        </a>

                        <a
                            href="#about"
                            onClick={() => setMobileMenu(false)}
                            className="block font-semibold"
                        >
                            For Mentors
                        </a>

                        <button
                            onClick={() => navigate("/login")}
                            className="w-full py-3 rounded-xl bg-[#082f2b] text-white font-semibold"
                        >
                            Log in
                        </button>

                    </div>
                )}

            </header>


            {/* =====================================================
                HERO
            ====================================================== */}

            <section className="relative overflow-hidden bg-[#082f2b] text-white py-20 sm:py-24">

                {/* Decorative background */}

                <div className="absolute -right-32 -top-20 w-96 h-96 rounded-full bg-[#369d89]/30 blur-3xl" />

                <div className="absolute -left-40 bottom-0 w-96 h-96 rounded-full bg-[#237168]/25 blur-3xl" />

                <div className="relative w-[92%] max-w-[1180px] mx-auto grid lg:grid-cols-[1.1fr_.9fr] gap-14 items-center">

                    {/* Hero text */}

                    <div>

                        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/20 bg-white/[0.07] text-sm font-semibold text-emerald-100">

                            <span className="w-2 h-2 rounded-full bg-emerald-300" />

                            Real guidance from people who have been there

                        </div>

                        <h1 className="mt-6 font-serif text-5xl sm:text-6xl lg:text-7xl leading-[.98] tracking-[-3px] max-w-3xl">

                            Meet the mentor who helps you{" "}

                            <span className="text-[#82d8bc]">
                                move forward.
                            </span>

                        </h1>

                        <p className="mt-6 text-lg leading-7 text-[#d4e3dd] max-w-2xl">

                            MentorHub makes meaningful mentorship simple.
                            Discover experienced people, ask better questions,
                            build useful skills, and turn your next goal into
                            a clear plan.

                        </p>


                        {/* Search */}

                        <div
                            id="search"
                            className="mt-8 bg-white p-2 rounded-2xl flex flex-col sm:flex-row gap-2 max-w-2xl shadow-2xl"
                        >

                            <input
                                type="text"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        searchMentors();
                                    }
                                }}
                                placeholder="What do you want help with?"
                                className="flex-1 min-w-0 px-4 py-3.5 outline-none text-[#123b38] rounded-xl"
                            />

                            <button
                                onClick={searchMentors}
                                className="px-6 py-3.5 rounded-xl bg-[#177fc0] text-white font-bold hover:bg-[#126da6] transition"
                            >
                                Search mentors
                            </button>

                        </div>


                        {/* Quick tags */}

                        <div className="flex flex-wrap gap-2 mt-4">

                            {[
                                "Web Development",
                                "Career Growth",
                                "UI/UX Design",
                                "Entrepreneurship",
                            ].map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => quickSearch(tag)}
                                    className="px-3 py-2 rounded-full border border-white/20 text-sm text-[#dceae5] hover:bg-white/10 transition"
                                >
                                    {tag}
                                </button>
                            ))}

                        </div>

                    </div>


                    {/* Hero profile card */}

                    <div className="relative min-h-[430px] rounded-[30px] bg-[#dcefe6] p-7 text-[#123b38] overflow-hidden shadow-2xl">

                        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-[#8bcfbb]" />

                        <div className="absolute right-5 top-32 bg-white rounded-2xl px-4 py-3 shadow-xl text-xs font-bold z-10">
                            ★ 4.9 average rating
                        </div>

                        <div className="relative bg-white rounded-[22px] p-6 w-[82%] mx-auto mt-8 shadow-xl">

                            <div className="w-16 h-16 rounded-[18px] bg-gradient-to-br from-[#d6b78b] to-[#8ebcae] flex items-center justify-center text-xl font-extrabold">
                                AK
                            </div>

                            <h3 className="mt-4 text-xl font-bold">
                                Arjun Kumar
                            </h3>

                            <p className="text-sm text-[#6c7b76]">
                                Senior Product Designer · 9 years experience
                            </p>

                            <div className="flex flex-wrap gap-2 mt-4">

                                {[
                                    "Product Design",
                                    "Portfolio Review",
                                    "Career Strategy",
                                ].map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-2.5 py-1.5 rounded-full bg-[#eaf4ef] text-[11px] font-bold"
                                    >
                                        {skill}
                                    </span>
                                ))}

                            </div>

                            <div className="mt-5 px-4 py-3 rounded-xl bg-[#082f2b] text-white flex justify-between text-sm">
                                <span>Strong match for your goals</span>
                                <b>92%</b>
                            </div>

                        </div>

                        <div className="absolute left-5 bottom-8 bg-white rounded-2xl px-4 py-3 shadow-xl text-xs font-bold">
                            ● 120+ mentees supported
                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                CATEGORIES
            ====================================================== */}

            <section
                id="categories"
                className="py-20 sm:py-24 bg-[#f7f1e5]"
            >

                <div className="w-[92%] max-w-[1180px] mx-auto">

                    <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-5 mb-9">

                        <h2 className="font-serif text-4xl sm:text-5xl tracking-tight max-w-2xl">
                            Find guidance for what comes next.
                        </h2>

                        <p className="text-[#65746f] leading-7 max-w-md">
                            From your first project to your next promotion,
                            choose a direction and meet someone who can help.
                        </p>

                    </div>


                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

                        {categories.map((category) => (
                            <button
                                key={category.title}
                                onClick={() => quickSearch(category.title)}
                                className="text-left bg-white border border-[#eadfca] rounded-2xl p-6 min-h-[170px] hover:-translate-y-1 hover:shadow-xl transition"
                            >

                                <div className="text-3xl mb-8">
                                    {category.icon}
                                </div>

                                <h3 className="font-bold text-lg mb-2">
                                    {category.title}
                                </h3>

                                <p className="text-sm text-[#65746f] leading-6">
                                    {category.description}
                                </p>

                            </button>
                        ))}

                    </div>

                </div>

            </section>


            {/* =====================================================
                MENTORS
            ====================================================== */}

            <section
                id="mentors"
                className="py-20 sm:py-24 bg-[#fbfaf6]"
            >

                <div className="w-[92%] max-w-[1180px] mx-auto">

                    <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-5 mb-9">

                        <h2 className="font-serif text-4xl sm:text-5xl tracking-tight">
                            People worth learning from.
                        </h2>

                        <p className="text-[#65746f] leading-7 max-w-md">
                            Browse mentors available on MentorHub. Every
                            profile is built around experience, skills and
                            practical guidance.
                        </p>

                    </div>


                    {filteredMentors.length === 0 ? (

                        <div className="py-16 text-center bg-white border border-[#d8e3dc] rounded-3xl">
                            <div className="text-4xl mb-4">🔎</div>
                            <h3 className="text-xl font-bold">
                                No mentors found
                            </h3>
                            <p className="text-gray-500 mt-2">
                                Try a broader skill or role.
                            </p>
                        </div>

                    ) : (

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

                            {filteredMentors.map((mentor) => (

                                <article
                                    key={mentor.name}
                                    className="bg-white border border-[#d8e3dc] rounded-[23px] overflow-hidden hover:-translate-y-1 hover:shadow-xl transition"
                                >

                                    <div className="p-5 bg-[#e7f1eb] flex gap-4 items-center">

                                        <div className="w-[74px] h-[74px] rounded-2xl bg-gradient-to-br from-[#b9d9cb] to-[#e9c6a7] flex items-center justify-center text-xl font-bold flex-none">
                                            {mentor.initials}
                                        </div>

                                        <div className="min-w-0">

                                            <h3 className="font-bold text-lg">
                                                {mentor.name}
                                            </h3>

                                            <p className="text-xs text-[#5e726b] leading-5">
                                                {mentor.role}
                                            </p>

                                        </div>

                                        <div className="ml-auto bg-white rounded-full px-2.5 py-1.5 text-xs font-bold whitespace-nowrap">
                                            ★ {mentor.rating}
                                        </div>

                                    </div>


                                    <div className="p-5">

                                        <p className="text-sm text-[#65746f] leading-6 mb-4">
                                            {mentor.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-5">

                                            {mentor.skills.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="px-2.5 py-1.5 rounded-full bg-[#eaf4ef] text-[11px] font-bold"
                                                >
                                                    {skill}
                                                </span>
                                            ))}

                                        </div>

                                        <div className="flex items-center justify-between">

                                            <span className="font-extrabold">
                                                {mentor.price}{" "}
                                                <small className="text-[#65746f] font-medium">
                                                    / session
                                                </small>
                                            </span>

                                            <button
                                                onClick={() =>
                                                    navigate("/mentor-profile", {
                                                        state: {
                                                            mentor,
                                                        },
                                                    })
                                                }
                                                className="px-4 py-2.5 rounded-full bg-[#177fc0] text-white text-sm font-bold hover:bg-[#126da6] transition"
                                            >
                                                View mentor
                                            </button>

                                        </div>

                                    </div>

                                </article>

                            ))}

                        </div>

                    )}


                    <div className="text-center mt-8">

                        <button
                            onClick={() => navigate("/mentors")}
                            className="px-6 py-3 rounded-full bg-[#082f2b] text-white font-bold hover:-translate-y-0.5 transition"
                        >
                            Explore all mentors →
                        </button>

                    </div>

                </div>

            </section>


            {/* =====================================================
                HOW IT WORKS
            ====================================================== */}

            <section
                id="how"
                className="py-20 sm:py-24 bg-[#fbfaf6]"
            >

                <div className="w-[92%] max-w-[1180px] mx-auto">

                    <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-5 mb-9">

                        <h2 className="font-serif text-4xl sm:text-5xl tracking-tight max-w-2xl">
                            Mentorship without the awkwardness.
                        </h2>

                        <p className="text-[#65746f] leading-7 max-w-md">
                            A simple journey designed around useful
                            conversations, not complicated processes.
                        </p>

                    </div>


                    <div className="grid md:grid-cols-3 gap-5">

                        {[
                            {
                                num: "01 / DISCOVER",
                                title: "Tell us your goal.",
                                text: "Search by skill, role, industry or the problem you are trying to solve.",
                            },
                            {
                                num: "02 / CONNECT",
                                title: "Choose your person.",
                                text: "Compare experience, topics, ratings and availability before reaching out.",
                            },
                            {
                                num: "03 / GROW",
                                title: "Make progress together.",
                                text: "Meet, ask questions, create an action plan and keep building momentum.",
                            },
                        ].map((step) => (

                            <article
                                key={step.num}
                                className="relative overflow-hidden min-h-[230px] rounded-[22px] bg-[#082f2b] text-white p-7"
                            >

                                <span className="text-sm text-[#89d9bd] font-extrabold">
                                    {step.num}
                                </span>

                                <h3 className="font-serif text-3xl mt-10 mb-3">
                                    {step.title}
                                </h3>

                                <p className="text-[#c7d9d2] text-sm leading-6">
                                    {step.text}
                                </p>

                                <div className="absolute -right-8 -bottom-8 w-28 h-28 rounded-full border border-white/10" />

                            </article>

                        ))}

                    </div>

                </div>

            </section>


            {/* =====================================================
                FOR MENTORS
            ====================================================== */}

            <section
                id="about"
                className="py-20 sm:py-24 bg-[#e6f2eb]"
            >

                <div className="w-[92%] max-w-[1180px] mx-auto grid lg:grid-cols-2 gap-16 items-center">

                    <div>

                        <div className="inline-flex px-3 py-1.5 rounded-full bg-[#f7fbf8] border border-[#bdd8ca] text-xs font-bold mb-5">
                            For learners & mentors
                        </div>

                        <h2 className="font-serif text-4xl sm:text-5xl leading-tight tracking-tight">
                            One platform. Two people. Real progress.
                        </h2>

                        <p className="mt-5 text-[#546963] leading-7">
                            MentorHub is designed to make mentorship useful
                            on both sides. Mentees get access to people with
                            practical experience, while mentors can share
                            knowledge and build meaningful professional
                            relationships.
                        </p>


                        <div className="grid sm:grid-cols-2 gap-3 mt-7">

                            {[
                                "1-on-1 sessions",
                                "Goal-based matching",
                                "Flexible scheduling",
                                "Skill communities",
                                "Verified profiles",
                                "Progress tracking",
                            ].map((item) => (

                                <div
                                    key={item}
                                    className="flex items-center gap-2 text-sm font-bold"
                                >
                                    <span className="w-6 h-6 rounded-full bg-[#c8e8d9] flex items-center justify-center">
                                        ✓
                                    </span>

                                    {item}
                                </div>

                            ))}

                        </div>


                        <button
                            onClick={() => navigate("/mentor")}
                            className="mt-8 px-6 py-3 rounded-full bg-[#177fc0] text-white font-bold shadow-lg shadow-[#177fc0]/20 hover:-translate-y-0.5 transition"
                        >
                            Become a mentor →
                        </button>

                    </div>


                    {/* Dashboard */}

                    <div className="bg-white rounded-[28px] p-5 shadow-2xl rotate-[1.5deg]">

                        <div className="flex items-center justify-between mb-4">

                            <span className="font-extrabold">
                                Your mentorship space
                            </span>

                            <span className="text-xs bg-[#e2f5ea] text-[#217153] rounded-full px-3 py-2 font-bold">
                                ● Active
                            </span>

                        </div>


                        {[
                            ["AK", "Arjun Kumar", "Product Design · Today, 7:00 PM", "Join →"],
                            ["RS", "Riya Shah", "React roadmap · Friday", "View →"],
                            ["NK", "Nisha Kapoor", "Startup validation · Next week", "View →"],
                        ].map(([initials, name, details, action]) => (

                            <div
                                key={name}
                                className="flex items-center gap-3 py-4 border-t border-[#d8e3dc]"
                            >

                                <div className="w-12 h-12 rounded-xl bg-[#d6e8df] flex items-center justify-center font-bold">
                                    {initials}
                                </div>

                                <div>

                                    <strong className="block text-sm">
                                        {name}
                                    </strong>

                                    <small className="text-[#65746f]">
                                        {details}
                                    </small>

                                </div>

                                <span className="ml-auto text-[#177fc0] text-xs font-bold">
                                    {action}
                                </span>

                            </div>

                        ))}


                        <div className="mt-4 p-4 rounded-xl bg-[#edf6f1]">

                            <strong className="text-sm">
                                Your next milestone
                            </strong>

                            <div className="h-2 bg-[#d3e5dc] rounded-full mt-3 overflow-hidden">

                                <div className="h-full w-[72%] bg-[#177fc0] rounded-full" />

                            </div>

                            <small className="block mt-2 text-[#63766f]">
                                72% of your current goal completed
                            </small>

                        </div>

                    </div>

                </div>

            </section>


            {/* =====================================================
                CTA
            ====================================================== */}

            <section className="w-[92%] max-w-[1180px] mx-auto py-20">

                <div className="rounded-[32px] bg-[#0f5b55] text-white p-8 sm:p-14 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">

                    <div>

                        <h2 className="font-serif text-4xl sm:text-5xl leading-tight tracking-tight">
                            Stop figuring everything out alone.
                        </h2>

                        <p className="mt-4 text-[#d0e5de] leading-6 max-w-2xl">
                            There is someone out there who has already faced
                            the problem you're facing. Start a conversation
                            and take the next step.
                        </p>

                    </div>


                    <div className="flex flex-wrap gap-3 flex-none">

                        <button
                            onClick={scrollToSearch}
                            className="px-6 py-3 rounded-full bg-white text-[#082f2b] font-bold hover:-translate-y-0.5 transition"
                        >
                            Find a mentor
                        </button>

                        <button
                            onClick={() => navigate("/mentor")}
                            className="px-6 py-3 rounded-full border border-white/30 text-white font-bold hover:bg-white/10 transition"
                        >
                            I want to mentor
                        </button>

                    </div>

                </div>

            </section>


            {/* =====================================================
                FOOTER
            ====================================================== */}

            <footer className="bg-[#062824] text-[#cfe0db] py-14">

                <div className="w-[92%] max-w-[1180px] mx-auto">

                    <div className="grid sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(3,1fr)] gap-10">

                        <div>

                            <Link
                                to="/Home"
                                className="flex items-center gap-2.5 text-white"
                            >

                                <div className="w-10 h-10 rounded-xl bg-white text-[#082f2b] flex items-center justify-center font-bold">
                                    M
                                </div>

                                <span className="text-xl font-bold">
                                    MentorHub
                                </span>

                            </Link>

                            <p className="mt-4 text-sm text-[#9eb6af] leading-6 max-w-xs">
                                A modern platform for connecting learners
                                with experienced mentors who can help turn
                                goals into progress.
                            </p>

                        </div>


                        <div>

                            <h4 className="text-white font-bold mb-4">
                                Platform
                            </h4>

                            <div className="grid gap-3 text-sm text-[#9eb6af]">

                                <a href="#mentors" className="hover:text-white">
                                    Find Mentors
                                </a>

                                <a href="#categories" className="hover:text-white">
                                    Explore Skills
                                </a>

                                <a href="#how" className="hover:text-white">
                                    How It Works
                                </a>

                                <button
                                    onClick={() => navigate("/mentor")}
                                    className="text-left hover:text-white"
                                >
                                    Become a Mentor
                                </button>

                            </div>

                        </div>


                        <div>

                            <h4 className="text-white font-bold mb-4">
                                Resources
                            </h4>

                            <div className="grid gap-3 text-sm text-[#9eb6af]">

                                <span>Career Guides</span>
                                <span>Learning Paths</span>
                                <span>Community</span>
                                <span>Success Stories</span>

                            </div>

                        </div>


                        <div>

                            <h4 className="text-white font-bold mb-4">
                                Company
                            </h4>

                            <div className="grid gap-3 text-sm text-[#9eb6af]">

                                <span>About MentorHub</span>
                                <span>Contact</span>
                                <span>Privacy</span>
                                <span>Terms</span>

                            </div>

                        </div>

                    </div>


                    <div className="border-t border-white/10 mt-10 pt-5 flex flex-col sm:flex-row justify-between gap-3 text-xs text-[#8ca59e]">

                        <span>
                            © 2026 MentorHub. Built for meaningful connections.
                        </span>

                        <span>
                            Made with purpose for learners & mentors.
                        </span>

                    </div>

                </div>

            </footer>

        </div>
    );
};

export default Home;