import { useState } from "react";

import confirmRequestType from "@/features/main/type/confirmRequest";
import useOnClickOutside from "@/features/main/hooks/useOnClickOutside";
import ButtonIcon from "@/features/main/ui/reusable/ButtonIcon";
import ConfirmRequest from "@/features/main/ui/reusable/ConfirmRequest";
import InboxCategoryButton from "@/features/main/ui/reusable/InboxCategoryButton";
import NotificationBellSvg from "@/shared/icons/NotificationBell";

const InboxButton = () => {
    const [showInbox, setShowInbox] = useState<boolean>(false);
    const [activeInboxCategory, setActiveInboxCategory] = useState<"ALL" | "UNREAD" | "READ">("ALL");
    const [inbox, setInbox] = useState<confirmRequestType[]>([
        {
            id: "1",
            name: "Samsudin",
            profilePicturePath: "/assets/images/avatar-dummy.png",
            time: 1695194444327,
            type: "FRIEND"
        }
    ]);
    const menuRef = useOnClickOutside(() => setShowInbox(false));

    return (
        <div className="relative" ref={menuRef}>
            <ButtonIcon icon={<NotificationBellSvg />} action={() => setShowInbox(!showInbox)} active={showInbox} notificationCount={1} />
            <div className={`bg-white shadow-lg min-w-[400px] flex flex-col gap-y-5 absolute bottom-0 lg:bottom-[inherit] lg:top-0 lg:left-0 left-0 rounded-lg border-black/10 border duration-300 z-30 ${showInbox ? "visible opacity-100 lg:left-[200%] bottom-[150%]" : "invisible opacity-50"}`}>
                <div className="flex justify-between px-6 pt-6">
                    <h1 className="font-medium text-slate-800">Notifications ({inbox.length})</h1>
                    <ButtonIcon icon={<NotificationBellSvg />} action={() => setShowInbox(!showInbox)} />
                </div>

                <div className="flex px-6 gap-x-4">
                    <InboxCategoryButton active={activeInboxCategory === "ALL"} text="All" action={() => setActiveInboxCategory("ALL")} />
                    <InboxCategoryButton active={activeInboxCategory === "READ"} text="Read" action={() => setActiveInboxCategory("READ")} />
                    <InboxCategoryButton active={activeInboxCategory === "UNREAD"} text="Unread" action={() => setActiveInboxCategory("UNREAD")} />
                </div>

                <div className="flex flex-col overflow-auto max-h-80">
                    {inbox.map((inboxItem, index) => (
                        <ConfirmRequest id={inboxItem.id} name={inboxItem.name} time={inboxItem.time} profilePicturePath={inboxItem.profilePicturePath} type={inboxItem.type} key={`${inboxItem.type}-request-${index}`} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InboxButton;