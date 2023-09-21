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
    const activeConversationId = useAppStore((state: any) => state.activeConversationId)
    const [showSidebar, setShowSidebar] = useState<boolean>(false)

    if (activeConversationId === null) {
        return <ConversationNull />
    }

    return (
        <div className="absolute top-0 left-0 z-10 flex w-full h-full conversation lg:relative bg-background min-w-[380px]">
            <div className="w-full">
                <ConversationHeader name="Samsudin" status="Online" showSidebarHandler={() => setShowSidebar(true)} profilePicturePath="/assets/images/avatar-dummy.png" />
                <div className="flex flex-col h-full pb-96 px-5 pt-3 overflow-y-scroll border-r border-r-black/10 chat">
                    <ConversationDate time={1695194444327} />
                    <ConversationCard name="You" avatar="/assets/images/avatar-dummy.png" content="Hello world" is_readed={true} position="RIGHT" time={1695194444327} />
                </div>
                <ConversationForm />
            </div>

            <ConversationSidebar toggleSidebar={() => setShowSidebar(!showSidebar)} show={showSidebar} data={{name: "Samsudin", id: 1234, description: "Lorem ipsum dolor sit amet", email: "email@email.com", joinedAt: 1695194444327, status: "Available"}} />
        </div>
    );
};

export default Conversation;
