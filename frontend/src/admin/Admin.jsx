import React from 'react'
import Header from "./components/Navbar";
import SideBar from "./components/SideBar";
import { useState } from "react";
import { Outlet } from 'react-router-dom';
const Admin = ({ isAdminLoggedIn }) => {
    const [showSideBar, setShowSideBar] = useState(true);

    return (
        <div className="flex h-screen bg-gray-100">

            <SideBar
                showSideBar={showSideBar}
                isAdminLoggedIn={isAdminLoggedIn}
            />

            <div className="flex-1 flex flex-col">

                <Header
                    showSideBar={showSideBar}
                    setShowSideBar={setShowSideBar}
                />
                <Outlet />


            </div>

        </div>
    )
}

export default Admin
