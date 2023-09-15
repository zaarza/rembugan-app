import { useState } from "react";
import { useFormik } from "formik";

import useAppStore from "@/store/app.store";
import ConversationCard from "@/components/Elements/Conversation/ConversationCard";
import ConversationHeader from "@/components/Elements/Conversation/ConversationHeader";
import ConversationDate from "@/components/Elements/Conversation/ConversationDate";
import ConversationForm from "@/components/Elements/Conversation/ConversationForm";
import ConversationPrivateSidebar from "@/components/Elements/Conversation/ConversationPrivateSidebar";
import NoConversationSelected from "@/components/Elements/Conversation/NoConversationSelected";

const ConversationPrivate = () => {
    const showConversation = useAppStore((state: any) => state.showConversation);
    const [showChatProfileDetail, setShowChatProfileDetail] = useState<boolean>(false);

    const form = useFormik({
        initialValues: {
            content: "",
        },
        onSubmit: (values) => submit(values),
    });

    const submit = (values: any) => {
        console.log(values);
        form.resetForm();
    };

    if (showConversation) {
        return (
            <div className="absolute top-0 left-0 z-10 flex w-full h-full conversation lg:relative bg-background min-w-[380px]">
                <div className="w-full">
                    <ConversationHeader name="Samsudin" status="Online" profilePicturePath="/assets/images/avatar-dummy.png" setShowChatProfileDetail={() => setShowChatProfileDetail(!showChatProfileDetail)}/>
                    <div className="flex flex-col h-full pb-96 px-5 pt-3 overflow-y-scroll border-r border-r-black/10 chat">
                        <ConversationDate time="Yesterday" />
                        <ConversationCard name="You" avatar="/assets/images/avatar-dummy.png" content="Hello world" position="RIGHT" time={1694652432202} is_readed={false} />
                        <ConversationCard name="Samsudin" avatar="/assets/images/avatar-dummy.png" content="Hello world" position="LEFT" time={1694652432202} />
                    </div>
                    <ConversationForm form={form} />
                </div>

                <ConversationPrivateSidebar
                    show={showChatProfileDetail}
                    setShow={() => {
                        setShowChatProfileDetail(!showChatProfileDetail)
                        console.log("trigered")
                    }}
                    data={{
                        name: "Samsudin",
                        id: "user123123",
                        description: "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet",
                        email: "samsudin@email.com",
                        joinedAt: 1694652432202,
                        status: "Available",
                    }}
                />
            </div>
        );
    } else {
        <NoConversationSelected />;
    }
};

export default ConversationPrivate;
