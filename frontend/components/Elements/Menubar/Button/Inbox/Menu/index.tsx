import { useState } from "react";

import InboxCategories from "@/type/InboxCategories";
import Categories from "@/components/Elements/Menubar/Button/Inbox/Categories";
import confirmRequest from "@/type/confirmRequest";
import ConfirmRequest from "@/components/Elements/ConfirmRequest";

type MenubarInboxMenuProps = {
    active: boolean;
    toggleActive: () => void;
    inbox: any[];
    activeInboxCategory: InboxCategories;
    setActiveInboxCategory: (category: InboxCategories) => void;
};

const MenubarInboxMenu = ({ active, toggleActive, inbox, activeInboxCategory, setActiveInboxCategory }: MenubarInboxMenuProps) => {
    const [friendRequests, setFriendRequests] = useState<confirmRequest[]>([
        {
            name: "Samsudin",
            time: 1694836137714,
            profilePicturePath: "/assets/images/avatar-dummy.png",
        },
        {
            name: "Bagas",
            time: 1694836137714,
            profilePicturePath: "/assets/images/avatar2-dummy.png"
        }
    ])
    return (
        <div className={`bg-white shadow-lg min-w-[400px] flex flex-col gap-y-5 absolute bottom-0 lg:bottom-[inherit] lg:top-0 lg:left-0 left-0 rounded-lg border-black/10 border duration-300 z-30 ${active ? "visible opacity-100 lg:left-[200%] bottom-[150%]" : "invisible opacity-50"}`}>
            <div className="flex justify-between px-6 pt-6">
                <h1 className="text-slate-800 font-medium">Notifications ({inbox.length})</h1>
                <button className="w-11 flex justify-end items-start group" onClick={() => toggleActive()}>
                    <svg className="fill-slate-800 w-6 group-hover:fill-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path>
                    </svg>
                </button>
            </div>

            <div className="flex gap-x-4 px-6">
                <Categories active={activeInboxCategory === InboxCategories.ALL} text="All" action={() => setActiveInboxCategory(InboxCategories.ALL)} />
                <Categories active={activeInboxCategory === InboxCategories.READ} text="Read" action={() => setActiveInboxCategory(InboxCategories.READ)} />
                <Categories active={activeInboxCategory === InboxCategories.UNREAD} text="Unread" action={() => setActiveInboxCategory(InboxCategories.UNREAD)} />
            </div>

            <div className="flex flex-col max-h-80 overflow-auto">
                {friendRequests.map((friendRequestItem, index) => <ConfirmRequest name={friendRequestItem.name} time={friendRequestItem.time} profilePicturePath={friendRequestItem.profilePicturePath} type="FRIEND" key={`friend-request-${index}`} />)}
            </div>
        </div>  
    );
};

export default MenubarInboxMenu;
