import { useEffect, useState } from "react";
import Searchbar from "@/components/Elements/Menu/Searchbar/";
import Title from "@/components/Elements/Menu/Title/";
import Item from "@/components/Elements/Menu/Item/";
import useAppStore from "@/store/app.store";

type Message = {
    name: string;
    message: string;
    time: number;
    profilePicturePath?: string;
    user_id: number;
};

const PrivateMenu = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            name: "Samsudin",
            message: "Hello world",
            time: 1694759125888,
            profilePicturePath: "/assets/images/avatar-dummy.png",
            user_id: 1
        },
        {
            name: "Bagas",
            message: "On the way bro...",
            time: 1694759125888,
            profilePicturePath: "/assets/images/avatar2-dummy.png",
            user_id: 2
        }
    ]);
    const [query, setQuery] = useState<string>("");
    const {setActiveConversationType, setActveConversationId, setShowConversation} = useAppStore((state: any) => ({
        setActiveConversationType: state.setActiveConversationType,
        setActveConversationId: state.setActveConversationId,
        setShowConversation: state.setShowConversation,
    }))

    const submitQuery = (event: any) => {
        event.preventDefault();
        (query);
    };

    const onClickItem = (id?: number) => {
        setActveConversationId(id);
        setShowConversation(true);
        setActiveConversationType("PRIVATE");
    }

    useEffect(() => {
        // TODO: Api integration for query
    }, [query]);

    return (
        <div className="flex flex-col w-full h-full">
            <div className="sticky top-0 z-10 flex flex-col p-6 bg-white gap-y-5">
                <Title text="Messages" />
                <Searchbar name="message" placeholder="Search messages..." value={query} setValue={(event) => setQuery(event.target.value)} submitHandler={submitQuery} />
            </div>

            <div className="flex flex-col overflow-auto pb-36">
                {messages.map((messageItem, index: number) => (
                    <Item name={messageItem.name} message={messageItem.message} time={messageItem.time} profilePicturePath={messageItem.profilePicturePath} key={`message-${index}`} action={() => onClickItem(messageItem.user_id)} />
                ))}
            </div>
        </div>
    );
};

export default PrivateMenu;
