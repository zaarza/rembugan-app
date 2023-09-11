import useAppStore from "@/store/app.store";
import MenuButton from "./MenuButton";
import Menu from "@/app/type/Menu";
import InboxButton from "./InboxButton";
import ProfileButton from "./ProfileButton";

const MenuBar = () => {
    const activeMenu = useAppStore((state: any) => state.activeMenu);
    const setActiveMenu = useAppStore((state: any) => state.setActiveMenu);
    const showConversation = useAppStore((state: any) => state.showConversation);
    const setShowConversation = useAppStore((state: any) => state.setShowConversation);

    return (
        <div className={`menu-bar border-t border-t-black/10 lg:border-x lg:border-x-black/10 lg:py-5 lg:flex fixed lg:w-fit bottom-0 lg:left-0  lg:top-0 lg:flex-col z-40 bg-white w-full justify-between px-3 py-2 lg:sticky ${showConversation ? "hidden lg:flex" : "flex"}`}>
            <div className="flex flex-col items-center left gap-y-5">
                <MenuButton img="/assets/images/rembugan-logo.svg" className="hidden lg:block w-[30px]" action={() => setShowConversation(false)} />
                <InboxButton />
            </div>
            <div className="flex justify-between center gap-x-5 lg:flex-col lg:gap-y-5">
                <MenuButton action={() => setActiveMenu(Menu.PRIVATE)} notificationCount={1} active={activeMenu === Menu.PRIVATE}>
                    {{
                        svgIcon: (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M2 8.99374C2 5.68349 4.67654 3 8.00066 3H15.9993C19.3134 3 22 5.69478 22 8.99374V21H8.00066C4.68659 21 2 18.3052 2 15.0063V8.99374ZM14 11V13H16V11H14ZM8 11V13H10V11H8Z"></path>
                            </svg>
                        ),
                    }}
                </MenuButton>

                <MenuButton action={() => setActiveMenu(Menu.CONTACTS)} notificationCount={1} active={activeMenu === Menu.CONTACTS}>
                    {{
                        svgIcon: (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M7 2V22H3V2H7ZM9 2H19.0049C20.1068 2 21 2.89821 21 3.9908V20.0092C21 21.1087 20.1074 22 19.0049 22H9V2ZM22 6H24V10H22V6ZM22 12H24V16H22V12ZM15 12C16.1046 12 17 11.1046 17 10C17 8.89543 16.1046 8 15 8C13.8954 8 13 8.89543 13 10C13 11.1046 13.8954 12 15 12ZM12 16H18C18 14.3431 16.6569 13 15 13C13.3431 13 12 14.3431 12 16Z"></path>
                            </svg>
                        ),
                    }}
                </MenuButton>

                <MenuButton action={() => setActiveMenu(Menu.GROUPS)} notificationCount={1} active={activeMenu === Menu.GROUPS}>
                    {{
                        svgIcon: (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M10 19.748V16.4C10 15.1174 10.9948 14.1076 12.4667 13.5321C11.5431 13.188 10.5435 13 9.5 13C7.61013 13 5.86432 13.6168 4.45286 14.66C5.33199 17.1544 7.41273 19.082 10 19.748ZM18.8794 16.0859C18.4862 15.5526 17.1708 15 15.5 15C13.4939 15 12 15.7967 12 16.4V20C14.9255 20 17.4843 18.4296 18.8794 16.0859ZM9.55 11.5C10.7926 11.5 11.8 10.4926 11.8 9.25C11.8 8.00736 10.7926 7 9.55 7C8.30736 7 7.3 8.00736 7.3 9.25C7.3 10.4926 8.30736 11.5 9.55 11.5ZM15.5 12.5C16.6046 12.5 17.5 11.6046 17.5 10.5C17.5 9.39543 16.6046 8.5 15.5 8.5C14.3954 8.5 13.5 9.39543 13.5 10.5C13.5 11.6046 14.3954 12.5 15.5 12.5ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z"></path>
                            </svg>
                        ),
                    }}
                </MenuButton>
            </div>
            <div className="flex items-center justify-center right">
                <ProfileButton />
            </div>
        </div>
    );
};

export default MenuBar;
