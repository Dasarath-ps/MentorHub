import Header from "../components/Header.jsx";
import SideBar from "../components/SideBar.jsx";
import MainBody from "../components/MainBody.jsx";
import {useState} from "react";

const Home = () => {
    const [showSideBar, setShowSideBar] = useState(true)

    return (
        // 1. Full height container, stacking children vertically
        <div className="grid grid-cols-[200px_1fr] h-screen ">
            <SideBar showSideBar={showSideBar}/>

            <div className="flex flex-col">
                <Header showSideBar={showSideBar} setShowSideBar={setShowSideBar}/>
                <MainBody/>
            </div>
        </div>
    );

}
export default Home;