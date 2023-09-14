import MenubarInboxCategoryButton from "@/components/menubar/inbox/MenubarInboxCategoryButton";
import InboxCategories from "@/type/InboxCategories";
import MenubarInboxFriendRequest from "@/components/menubar/inbox/MenubarInboxFriendRequest";

type MenubarInboxMenuProps = {
    show: boolean;
    setShow: () => void;
    inbox: any[];
    activeInboxCategory: InboxCategories;
    setActiveInboxCategory: (category: InboxCategories) => void;
};

const MenubarInboxMenu = ({ show, setShow, inbox, activeInboxCategory, setActiveInboxCategory }: MenubarInboxMenuProps) => {
    return (
        <div className={`bg-white shadow-lg min-w-[400px] flex flex-col gap-y-5 p-6 absolute bottom-0 lg:bottom-[inherit] lg:top-0 lg:left-0 left-0 rounded-lg border-black/10 border duration-300 z-30 ${show ? "visible opacity-100 lg:left-[150%] bottom-[150%]" : "invisible opacity-50"}`}>
            <div className="flex justify-between">
                <h1 className="text-slate-800 font-medium">Notifications ({inbox.length})</h1>
                <button className="w-11 flex justify-end items-start group" onClick={() => setShow()}>
                    <svg className="fill-slate-800 w-6 group-hover:fill-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"></path>
                    </svg>
                </button>
            </div>

            <div className="flex gap-x-4">
                <MenubarInboxCategoryButton active={activeInboxCategory === InboxCategories.ALL} text="All" action={() => setActiveInboxCategory(InboxCategories.ALL)} />
                <MenubarInboxCategoryButton active={activeInboxCategory === InboxCategories.READ} text="Read" action={() => setActiveInboxCategory(InboxCategories.READ)} />
                <MenubarInboxCategoryButton active={activeInboxCategory === InboxCategories.UNREAD} text="Unread" action={() => setActiveInboxCategory(InboxCategories.UNREAD)} />
            </div>

            <div className="flex flex-col gap-y-6 max-h-80 overflow-auto">
                <MenubarInboxFriendRequest />
                <MenubarInboxFriendRequest />
                <MenubarInboxFriendRequest />
                <MenubarInboxFriendRequest />
                <MenubarInboxFriendRequest />
                <MenubarInboxFriendRequest />
            </div>
        </div>  
    );
};

export default MenubarInboxMenu;
