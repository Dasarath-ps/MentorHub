import {
    FaHome,
    FaUserFriends,
    FaComments,
    FaCalendarAlt,
    FaUsers,
    FaCog,
    FaSignOutAlt,
    FaChalkboardTeacher,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SideBar = ({ showSideBar, isAdminLoggedIn }) => {
    const navigate = useNavigate();
    const menu = [

        {
            name: isAdminLoggedIn ? "Manage Mentors" : "Find Mentors",
            icon: <FaChalkboardTeacher />,
        },
        {
            name: isAdminLoggedIn ? "Manage Users" : "Community",
            icon: <FaUsers />,
        },
        {
            name: "Messages",
            icon: <FaComments />,
        },
        !isAdminLoggedIn ? {
            name: "Sessions",
            icon: <FaCalendarAlt />,
        } : null,
        {
            name: "Profile",
            icon: <FaUserFriends />,
        },
        {
            name: "Settings",
            icon: <FaCog />,
        },
    ];

    return (
        <aside
            className={`
                ${showSideBar ? "w-64" : "w-20"}
                h-screen
                bg-white
                border-r
                border-gray-200
                shadow-lg
                transition-all
                duration-300
                flex
                flex-col
                flex-shrink-0
            `}
        >
            {/* Logo */}

            <div className="h-20 flex items-center justify-center border-b">

                <h1 className="text-3xl font-bold text-gray-800">

                    {showSideBar && isAdminLoggedIn ? (
                        <>
                            Mentor
                            <span className="text-green-600">is</span>

                        </>

                    ) : (
                        <>A<span className="text-green-600">P</span></>
                    )}
                    {showSideBar && (
                        <p className="mt-[5px] text-sm font-semibold text-green-600 tracking-wider uppercase">
                            Admin Panel
                        </p>
                    )}

                </h1>

            </div>

            {/* Navigation */}

            <div className="flex-1 px-3 py-6">

                {showSideBar && (
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-4 px-2">
                        Navigation
                    </p>
                )}

                <div className="space-y-2">

                    {menu.map((item, index) => (
                        <button
                            key={index}
                            className={`
                                w-full
                                flex
                                items-center
                                gap-4
                                px-4
                                py-3
                                rounded-xl
                                ${item.name.toLowerCase() == location.pathname.split("/").pop() ? "bg-green-200 text-green-600" : "text-gray-600"}
                                hover:bg-green-50
                                hover:text-green-600
                                transition-all
                                duration-300
                                `}
                            onClick={() => navigate(`/admin/${item.name.toLowerCase().replace(/\s+/g, '-')}`)}
                        >
                            <span className="text-xl">
                                {item.icon}
                            </span>

                            {showSideBar && (
                                <span className="font-medium">
                                    {item.name}
                                </span>
                            )}
                        </button>
                    ))}

                </div>

            </div>

        </aside>
    );
};

export default SideBar;
