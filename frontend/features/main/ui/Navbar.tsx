"use client";

import useAppStore from "@/store/app.store";
import ButtonIcon from "@/features/main/ui/reusable/ButtonIcon";
import InboxButton from "@/features/main/ui/reusable/InboxButton";
import ProfileButton from "@/features/main/ui/reusable/ProfileButton";
import LogoSvg from "@/shared/icons/Logo";
import menuType from "@/features/main/type/menu";
import MessageSvg from "@/shared/icons/Message";
import ContactBookSvg from "@/shared/icons/ContactBook";
import GroupSvg from "@/shared/icons/Group";

const Navbar = () => {
    const { activeMenu, setActiveMenu, setActiveConversationId, showConversation } = useAppStore((state: any) => ({ setActiveMenu: state.setActiveMenu, setActiveConversationId: state.setActiveConversationId, activeMenu: state.activeMenu, showConversation: state.showConversation }));

    return (
        <div className={`border-t border-t-black/10 lg:border-x lg:border-x-black/10 lg:py-5 lg:flex fixed lg:w-fit bottom-0 lg:left-0  lg:top-0 lg:flex-col z-40 bg-white w-full gap-x-8 px-5 py-2 lg:sticky justify-center lg:justify-between ${showConversation ? "hidden lg:flex" : "flex"}`}>
            <div className="flex lg:flex-col gap-x-12 gap-y-6">
                <div className="hidden lg:block">
                    <ButtonIcon icon={<LogoSvg />} action={() => setActiveConversationId(null)} />
                </div>
                <InboxButton />
            </div>

            <div className="flex lg:flex-col gap-x-8 gap-y-6 justify-evenly">
                <ButtonIcon icon={<MessageSvg />} action={() => setActiveMenu(menuType.PRIVATE)} active={activeMenu === menuType.PRIVATE} />
                <ButtonIcon icon={<ContactBookSvg />} action={() => setActiveMenu(menuType.CONTACTS)} active={activeMenu === menuType.CONTACTS} />
                <ButtonIcon icon={<GroupSvg />} action={() => setActiveMenu(menuType.GROUPS)} active={activeMenu === menuType.GROUPS} />
            </div>

            <ProfileButton profilePicturePath="/assets/images/avatar-dummy.png" />
        </div>
    );
};

export default Navbar;
