import useAppStore from "@/store/app.store";
import MenuPrivate from "@/components/menu/private";
import MenuType from "@/type/Menu";

const Menu = () => {
    const activeMenu = useAppStore((state: any) => state.activeMenu);

    return (
        <div className="active-menu w-full lg:min-w-[320px] lg:max-w-[400px] lg:border-r-black/10 lg:border-r">
            <MenuPrivate show={activeMenu === MenuType.PRIVATE} />
        </div>
    );
};

export default Menu;
