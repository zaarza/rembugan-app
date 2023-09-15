import { useState } from "react";
import MenubarButton from "@/components/Elements/Menubar/MenubarButton";
import MenubarInboxMenu from "@/components/Elements/Menubar/inbox/MenubarInboxMenu";
import InboxCategories from "@/type/InboxCategories";
import useOnClickOutside from "@/hooks/useOnClickOutside";

const NotificationCategoryButton = ({ text, active, onClick }: { text: string; active: boolean; onClick: () => void }) => {
    return (
        <button className={`rounded-lg px-4 text-xs py-2 border border-black/10 hover:brightness-95 ${active ? "bg-primary text-white" : "bg-white text-slate-800"}`} onClick={() => onClick()}>
            {text}
        </button>
    );
};

const MenubarInboxButton = () => {
    const [showInbox, setShowInbox] = useState<boolean>(false);
    const [activeInboxCategory, setActiveInboxCategory] = useState<InboxCategories>(InboxCategories.ALL);
    const [inbox, setInbox] = useState<object[]>([{}, {}, {}]);

    const menuRef = useOnClickOutside(() => setShowInbox(false));

    return (
        <div className="relative" ref={menuRef}>
            <MenubarButton action={() => setShowInbox(!showInbox)} active={showInbox} children={{icon: <svg className={`${showInbox ? "fill-primary" : "fill-slate-800"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 18.6667L20.4 19.2C20.5657 19.4209 20.5209 19.7343 20.3 19.9C20.2135 19.9649 20.1082 20 20 20H4C3.72386 20 3.5 19.7761 3.5 19.5C3.5 19.3918 3.53509 19.2865 3.6 19.2L4 18.6667V10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10V18.6667ZM9.5 21H14.5C14.5 22.3807 13.3807 23.5 12 23.5C10.6193 23.5 9.5 22.3807 9.5 21Z"></path></svg>}} />
            <MenubarInboxMenu activeInboxCategory={activeInboxCategory} setActiveInboxCategory={setActiveInboxCategory} show={showInbox} setShow={() => setShowInbox(!showInbox)} inbox={inbox}/>
        </div>
    );
};

export default MenubarInboxButton;
