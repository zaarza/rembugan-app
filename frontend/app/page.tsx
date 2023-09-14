"use client";

import Menu from "@/components/menu/Menu";
import Conversation from "@/components/conversation";
import Menubar from "@/components/menubar/Menubar";

const Main = () => {
    return (
        <div className="flex relative w-full h-screen overflow-hidden bg-white lg:static">
            <Menubar />
            <Menu />
            <Conversation />
        </div>
    );
};

export default Main;
