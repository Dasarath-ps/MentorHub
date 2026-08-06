import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const Header = ({ showSideBar, setShowSideBar }) => {
    const navigate = useNavigate();
    return (
        <header className={` sticky top-0 h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8
            shadow-sm z-40 `}>
            {/* Left */}
        
            <div className="flex items-center gap-5">
        
                <button onClick={()=> setShowSideBar(!showSideBar)}
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

            </div>
        
            {/* Right */}
        
            <div className="flex items-center gap-5">
        
                <button className="
                                relative
                                h-11
                                w-11
                                rounded-xl
                                hover:bg-gray-100
                                flex
                                items-center
                                justify-center
                                transition
                            ">
                    <MailOutlineOutlinedIcon />
        
                    <span className="
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
                                ">
                        2
                    </span>
        
                </button>
        
                <button className="
                                relative
                                h-11
                                w-11
                                rounded-xl
                                hover:bg-gray-100
                                flex
                                items-center
                                justify-center
                                transition
                            ">
                    <NotificationsNoneOutlinedIcon />
        
                    <span className="
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
                                ">
                        5
                    </span>
        
                </button>
        
                <div className="flex items-center gap-3 cursor-pointer">
        

                </div>
        
            </div>
        
        </header>
    );
};

export default Header;