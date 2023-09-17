import useAppStore from "@/store/app.store";
import MenuType from "@/type/Menu";
import PrivateMenu from "@/components/Fragments/PrivateMenu";
import ContactsMenu from "@/components/Fragments/ContactsMenu";
import GroupsMenu from "./GroupsMenu";

const Menu = () => {
    const activeMenu = useAppStore((state: any) => state.activeMenu);

    return (
        <div className="w-full lg:min-w-[320px] lg:max-w-[400px] lg:border-r-black/10 lg:border-r">
            {activeMenu === MenuType.PRIVATE && <PrivateMenu />}
            {activeMenu === MenuType.CONTACTS && <ContactsMenu />}
            {activeMenu === MenuType.GROUPS && <GroupsMenu />}
        </div>
    );
};

export default Menu;
