import {useState} from "react";

const SideBar = ({showSideBar}) => {
    console.log(showSideBar)
    return <div className={`w-[200px] h-full bg-amber-50 rounded-2xl
    absolute 
    ${showSideBar ? "left-0" : "left-[-200px]"}
    transition-all
    `}>
        SideBar
    </div>
}

export default SideBar