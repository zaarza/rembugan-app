import useAppStore from "@/store/app.store";
import ConversationPrivate from "@/components/Elements/Conversation/private";
import ConversationGroup from "@/components/Elements/Conversation/group";
import NoConversationSelected from "@/components/Elements/Conversation/NoConversationSelected";

const Conversation = () => {
    const {activeConversationType, showConversation} = useAppStore((state: any) => ({activeConversationType: state.activeConversationType, showConversation: state.showConversation}));

    if (!showConversation) {
        return <NoConversationSelected />
    }

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
