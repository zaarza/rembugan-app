"use client";

import useAppStore from "@/store/app.store";
import menuType from "@/features/main/type/menu";
import MenuPrivate from "@/features/main/ui/reusable/MenuPrivate";
import MenuGroups from "@/features/main/ui/reusable/MenuGroups";
import MenuContacts from "@/features/main/ui/reusable/MenuContacts";

const Menu = () => {
    const activeMenu = useAppStore((state: any) => state.activeMenu);

    return (
        <div className="w-ful h-fulll bg-white lg:min-w-[320px] lg:max-w-[400px] lg:border-r-black/10 lg:border-r">
            {activeMenu === menuType.PRIVATE && <MenuPrivate />}
            {activeMenu === menuType.CONTACTS && <MenuContacts />}
            {activeMenu === menuType.GROUPS && <MenuGroups />}
        </div>
    );
};

export default Menu;
