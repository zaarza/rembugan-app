import useAppStore from "@/store/app.store";

import MenubarInboxButton from "@/components/Elements/Menubar/inbox";
import MenubarLogoButton from "@/components/Elements/Menubar/logo";
import MenubarProfileButton from "@/components/Elements/Menubar/profile";
import MenubarPrivateButton from "@/components/Elements/Menubar/private";
import MenubarContactsButton from "@/components/Elements/Menubar/contacts";
import MenubarGroupsButton from "@/components/Elements/Menubar/groups";

const Menubar = () => {
    const showConversation = useAppStore((state: any) => state.showConversation);

    return (
        <div className={`menu-bar border-t border-t-black/10 lg:border-x lg:border-x-black/10 lg:py-5 lg:flex fixed lg:w-fit bottom-0 lg:left-0  lg:top-0 lg:flex-col z-40 bg-white w-full justify-between px-3 py-2 lg:sticky ${showConversation ? "hidden lg:flex" : "flex"}`}>
            <div className="flex flex-col items-center left gap-y-5">
                <MenubarLogoButton />
                <MenubarInboxButton />
            </div>

            <div className="flex justify-between center gap-x-5 lg:flex-col lg:gap-y-5">
                <MenubarPrivateButton />
                <MenubarContactsButton />
                <MenubarGroupsButton />
            </div>

            <div className="flex items-center justify-center right">
                <MenubarProfileButton />
            </div>
        </div>
    );
};

export default Menubar;
