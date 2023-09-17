import useAppStore from "@/store/app.store";

import Menu from "@/type/Menu";
import MenubarInboxButton from "@/components/Elements/Menubar/Button/Inbox";
import MenubarLogoButton from "@/components/Elements/Menubar/Button/Logo";
import MenubarProfileButton from "@/components/Elements/Menubar/Button/Profile";
import MenubarPrivateButton from "@/components/Elements/Menubar/Button/Private";
import MenubarContactsButton from "@/components/Elements/Menubar/Button/Contacts";
import MenubarGroupsButton from "@/components/Elements/Menubar/Button/Groups";

const Menubar = () => {
    const { activeMenu, setActiveMenu, setActiveConversationId, showConversation } = useAppStore((state: any) => ({ setActiveMenu: state.setActiveMenu, setActiveConversationId: state.setActiveConversationId, activeMenu: state.activeMenu, showConversation: state.showConversation }));

    return (
        <div className={`menu-bar border-t border-t-black/10 lg:border-x lg:border-x-black/10 lg:py-5 lg:flex fixed lg:w-fit bottom-0 lg:left-0  lg:top-0 lg:flex-col z-40 bg-white w-full justify-between px-5 py-2 lg:sticky ${showConversation ? "hidden lg:flex" : "flex"}`}>
            <div className="flex flex-col items-center left gap-y-6">
                <MenubarLogoButton action={() => setActiveConversationId(null)} />
                <MenubarInboxButton />
            </div>

            <div className="flex justify-between items-center gap-x-5 lg:flex-col lg:gap-y-6">
                <MenubarPrivateButton action={() => setActiveMenu(Menu.PRIVATE)} active={activeMenu === Menu.PRIVATE} />
                <MenubarContactsButton action={() => setActiveMenu(Menu.CONTACTS)} active={activeMenu === Menu.CONTACTS} />
                <MenubarGroupsButton action={() => setActiveMenu(Menu.GROUPS)} active={activeMenu === Menu.GROUPS} />
            </div>

            <div className="flex items-center justify-center right">
                <MenubarProfileButton />
            </div>
        </div>
    );
};

export default Menubar;
