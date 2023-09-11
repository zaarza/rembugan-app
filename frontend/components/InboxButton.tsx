import { useEffect, useRef, useState } from "react";
import MenuButton from "./MenuButton";
import FriendRequestInbox from "./FriendRequestInbox";

enum NotificationCategory {
    ALL = "ALL",
    READ = "READ",
    UNREAD = "UNREAD",
}

const NotificationCategoryButton = ({ text, active, onClick }: { text: string; active: boolean; onClick: () => void }) => {
    return (
        <button className={`rounded-lg px-4 text-xs py-2 border border-black/10 hover:brightness-95 ${active ? "bg-primary text-white" : "bg-white text-slate-800"}`} onClick={() => onClick()}>
            {text}
        </button>
    );
};

const InboxButton = () => {
    const [showInbox, setShowInbox] = useState<boolean>(false);
    const [notification, setNotification] = useState([1, 2, 3]);
    const [activeNotificationCategory, setActiveNotificationCategory] = useState<NotificationCategory>(NotificationCategory.ALL);
    const menuRef = useRef(null);

    useEffect(() => {
        const clickOutsideToClose = (event: any) => {
            if (!menuRef.current?.contains(event.target)) {
                setShowInbox(false);
            }
        };

        document.addEventListener("mousedown", clickOutsideToClose);

        return () => {
            document.removeEventListener("mousedown", clickOutsideToClose);
        };
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <MenuButton notificationCount={notification.length} active={showInbox} action={() => setShowInbox(!showInbox)}>
                {{
                    svgIcon: (
                        <svg className={`${showInbox ? "fill-primary" : "fill-slate-800"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M20 18.6667L20.4 19.2C20.5657 19.4209 20.5209 19.7343 20.3 19.9C20.2135 19.9649 20.1082 20 20 20H4C3.72386 20 3.5 19.7761 3.5 19.5C3.5 19.3918 3.53509 19.2865 3.6 19.2L4 18.6667V10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10V18.6667ZM9.5 21H14.5C14.5 22.3807 13.3807 23.5 12 23.5C10.6193 23.5 9.5 22.3807 9.5 21Z"></path>
                        </svg>
                    ),
                }}
            </MenuButton>

            <div className={`bg-white shadow-lg min-w-[400px] flex flex-col gap-y-5 p-6 absolute bottom-0 lg:bottom-[inherit] lg:top-0 lg:left-0 left-0 rounded-lg border-black/10 border duration-300 z-30 ${showInbox ? "visible opacity-100 lg:left-[150%] bottom-[150%]" : "invisible opacity-50"}`}>
                <div className="flex justify-between">
                    <h1 className="text-slate-800 font-medium">Notifications ({notification.length})</h1>
                    <button className="w-11 flex justify-end items-start group" onClick={() => setShowInbox(false)}>
                        <svg className="fill-slate-800 w-6 group-hover:fill-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path>
                        </svg>
                    </button>
                </div>

                <div className="flex gap-x-4">
                    <NotificationCategoryButton active={activeNotificationCategory === NotificationCategory.ALL} text="All" onClick={() => setActiveNotificationCategory(NotificationCategory.ALL)} />
                    <NotificationCategoryButton active={activeNotificationCategory === NotificationCategory.READ} text="Read" onClick={() => setActiveNotificationCategory(NotificationCategory.READ)} />
                    <NotificationCategoryButton active={activeNotificationCategory === NotificationCategory.UNREAD} text="Unread" onClick={() => setActiveNotificationCategory(NotificationCategory.UNREAD)} />
                </div>

                <div className="flex flex-col gap-y-6 max-h-80 overflow-auto">
                    <FriendRequestInbox />
                    <FriendRequestInbox />
                    <FriendRequestInbox />
                    <FriendRequestInbox />
                    <FriendRequestInbox />
                    <FriendRequestInbox />
                </div>
            </div>
        </div>
    );
};

export default InboxButton;
