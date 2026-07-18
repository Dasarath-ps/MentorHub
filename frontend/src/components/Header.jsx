import Menu from '@mui/icons-material/menu'
import {useState} from "react";


const Header = ({showSideBar, setShowSideBar}) => {
    return <div className={`h-20 flex  bg-red-300`}>
        <button className={`h-10 w-10 bg-gray-700 rounded-full 
        hover:bg-gray-400 hover:text-white absolute left-0 flex justify-center items-center transition-all duration-300`}
                onClick={() => setShowSideBar(!showSideBar)}
        >
            <Menu/>
        </button>
    </div>
}

export default Header