import { useState, useEffect } from "react";

import useAppStore from "@/store/app.store";
import messageType from "@/features/main/type/message";
import MenuItem from "@/features/main/ui/reusable/MenuItem";
import Searchbar from "@/features/main/ui/reusable/MenuSearchbar";

const MenuPrivate = () => {
    const [messages, setMessages] = useState<messageType[]>([
        {
            name: "Samsudin",
            message: "Hello world",
            time: 1694759125888,
            profilePicturePath: "/assets/images/avatar-dummy.png",
            user_id: 1,
        },
        {
            name: "Bagas",
            message: "On the way bro...",
            time: 1694759125888,
            profilePicturePath: "/assets/images/avatar2-dummy.png",
            user_id: 2,
        },
    ]);
    const [query, setQuery] = useState<string>("");
    const { setActiveConversationType, setActiveConversationId, setShowConversation } = useAppStore((state: any) => ({
        setActiveConversationType: state.setActiveConversationType,
        setActiveConversationId: state.setActiveConversationId,
        setShowConversation: state.setShowConversation,
    }));

    const submitQuery = (event: any) => {
        event.preventDefault();
        query;
    };

    const onClickMenuItem = (id: number) => {
        setActiveConversationId(id);
        setShowConversation(true);
        setActiveConversationType("PRIVATE");
    };

    useEffect(() => {
        // TODO: Api integration for query
    }, [query]);

    return (
        <div className="flex flex-col w-full h-full">
            <div className="sticky top-0 z-10 flex flex-col p-6 bg-white gap-y-5">
                <h1 className="text-xl font-semibold text-slate-800">Messages</h1>
                <Searchbar name="message" placeholder="Search messages..." value={query} setValue={(event) => setQuery(event.target.value)} submitHandler={submitQuery} />
            </div>

            <div className="flex flex-col overflow-auto pb-36">
                {messages.map((messageItem, index: number) => (
                    <MenuItem name={messageItem.name} message={messageItem.message} time={messageItem.time} profilePicturePath={messageItem.profilePicturePath} key={`message-${index}`} action={() => onClickMenuItem(messageItem.user_id)} />
                ))}
            </div>
        </div>
    );
};

export default MenuPrivate