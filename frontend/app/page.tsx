"use client";

import ActiveMenu from "@/components/ActiveMenu";
import Conversation from "@/components/Conversation";
import MenuBar from "@/components/MenuBar";
import NoConversation from "@/components/NoConversation";
import useAppStore from "@/store/app.store";

const Main = () => {
    const showConversation = useAppStore((state: any) => state.showConversation);
    
    return (
        <>
            <div className="flex relative w-full h-screen overflow-hidden bg-white lg:static">
                <MenuBar />
                <ActiveMenu />
                { showConversation ? <Conversation /> : <NoConversation /> }
            </div>
        </>
    );
};

export default Main;
