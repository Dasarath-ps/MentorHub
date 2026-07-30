import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";

const Header = ({ showSideBar, setShowSideBar }) => {
    return (
        <header
            className={`
                sticky
                top-0
                h-20
                bg-white
                border-b
                border-gray-200
                flex
                items-center
                justify-between
                px-8
                shadow-sm
                z-40
            `}
        >
            {/* Left */}

            <div className="flex items-center gap-5">

                <button
                    onClick={() => setShowSideBar(!showSideBar)}
                    className="
                        h-11
                        w-11
                        rounded-xl
                        bg-green-600
                        hover:bg-green-700
                        text-white
                        flex
                        items-center
                        justify-center
                        transition
                    "
                >
                    <MenuIcon />
                </button>

                <div className="relative">

                    <SearchIcon
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Search mentors, sessions..."
                        className="
                            w-80
                            h-11
                            pl-12
                            pr-4
                            rounded-xl
                            border
                            border-gray-300
                            bg-gray-50
                            focus:bg-white
                            focus:border-green-600
                            focus:ring-4
                            focus:ring-green-100
                            outline-none
                            transition
                        "
                    />

                </div>

            </div>

            {/* Right */}

            <div className="flex items-center gap-5">

                <button
                    className="
                        relative
                        h-11
                        w-11
                        rounded-xl
                        hover:bg-gray-100
                        flex
                        items-center
                        justify-center
                        transition
                    "
                >
                    <MailOutlineOutlinedIcon />

                    <span
                        className="
                            absolute
                            -top-1
                            -right-1
                            w-5
                            h-5
                            rounded-full
                            bg-green-600
                            text-white
                            text-xs
                            flex
                            items-center
                            justify-center
                        "
                    >
                        2
                    </span>

                </button>

                <button
                    className="
                        relative
                        h-11
                        w-11
                        rounded-xl
                        hover:bg-gray-100
                        flex
                        items-center
                        justify-center
                        transition
                    "
                >
                    <NotificationsNoneOutlinedIcon />

                    <span
                        className="
                            absolute
                            -top-1
                            -right-1
                            w-5
                            h-5
                            rounded-full
                            bg-red-500
                            text-white
                            text-xs
                            flex
                            items-center
                            justify-center
                        "
                    >
                        5
                    </span>

                </button>

                <div className="flex items-center gap-3 cursor-pointer">

                    <div
                        className="
                            w-11
                            h-11
                            rounded-full
                            bg-green-600
                            text-white
                            flex
                            items-center
                            justify-center
                            font-bold
                            text-lg
                        "
                    >
                        D
                    </div>

                    <div className="hidden md:block">

                        <h3 className="font-semibold text-gray-800">
                            Devanandan
                        </h3>

                        <p className="text-sm text-gray-500">
                            Mentee
                        </p>

                    </div>

                </div>

            </div>

        </header>
    );
};

export default Header;
