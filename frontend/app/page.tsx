"use client";

import Menu from "@/components/Fragments/Menu";
import Conversation from "@/components/Fragments/Conversation";
import Menubar from "@/components/Fragments/Menubar";

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
