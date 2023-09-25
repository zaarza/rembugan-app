"use client";
import { useState } from "react";

import useAppStore from "@/store/app.store";
import ConversationHeader from "@/features/main/ui/reusable/ConversationHeader";
import ConversationCard from "@/features/main/ui/reusable/ConversationCard";
import ConversationDate from "@/features/main/ui/reusable/ConversationDate";
import ConversationForm from "@/features/main/ui/reusable/ConversationForm";
import ConversationSidebar from "@/features/main/ui/reusable/ConversationSidebar";
import ConversationNull from "@/features/main/ui/reusable/ConversationNull";

const Conversation = () => {
    const {showConversation, activeConversationId, activeConversationType} = useAppStore((state: any) => ({activeConversationId: state.activeConversationId, showConversation: state.showConversation, activeConversationType: state.activeConversationType}))
    const [showSidebar, setShowSidebar] = useState<boolean>(false)

    if (activeConversationId === null) {
        return <ConversationNull />
    }

    return (
        <div className={`absolute top-0 left-0 z-10 flex w-full h-full conversation lg:relative bg-background min-w-[380px] ${!showConversation && "top-full"}`}>
            <div className="w-full">
                <ConversationHeader name="Samsudin" status="Online" showSidebarHandler={() => setShowSidebar(true)} profilePicturePath="/assets/images/avatar-dummy.png" />
                <div className="flex flex-col h-full px-5 pt-3 overflow-y-scroll border-r pb-96 border-r-black/10 chat">
                    <ConversationDate time={1695194444327} />
                    <ConversationCard name="You" avatar="/assets/images/avatar-dummy.png" content="Hello world" is_readed={true} position="RIGHT" time={1695194444327} />
                </div>
                <ConversationForm />
            </div>

            {activeConversationType === "PRIVATE" && <ConversationSidebar toggleSidebar={() => setShowSidebar(!showSidebar)} show={showSidebar} data={{name: "Samsudin", id: 1234, description: "Lorem ipsum dolor sit amet", email: "email@email.com", joinedAt: 1695194444327, status: "Available"}} />}
            {activeConversationType === "GROUP" && <ConversationSidebar toggleSidebar={() => setShowSidebar(!showSidebar)} show={showSidebar} data={{name: "BMX Club", id: 1234, description: "Lorem ipsum dolor sit amet", membership: 10, createdAt: 1695194444327, creator: "Samsudin"}} />}
        </div>
    );
};

export default Conversation;
