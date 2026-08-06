import { useState } from "react";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import MainBody from "./components/MainBody";

const Home = () => {
    const [showSideBar, setShowSideBar] = useState(true);

    return (
        <div className="flex h-screen bg-gray-100">

            <SideBar
                showSideBar={showSideBar}
            />

            <div className="flex-1 flex flex-col">

                <Header
                    showSideBar={showSideBar}
                    setShowSideBar={setShowSideBar}
                />

                <MainBody />

            </div>

        </div>
    );
};

export default Home;