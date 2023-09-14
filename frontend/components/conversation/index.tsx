import useAppStore from "@/store/app.store";
import React from "react";
import ConversationPrivate from "./private";
import ConversationGroup from "./group";

const Conversation = () => {
    const activeConversationType = useAppStore((state: any) => state.activeConversationType);

    switch (activeConversationType) {
        case "PRIVATE":
            return <ConversationPrivate />
        case "GROUP":
            return <ConversationGroup />
        default:
            return <></>
    }
};

export default Conversation;
