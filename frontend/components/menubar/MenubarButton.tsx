import useAppStore from "@/store/app.store";
import Menu from "@/type/Menu";

type MenubarButtonProps = {
    name?: Menu;
    children: {
        icon: any
    };
    active?: boolean,
    action?: () => void;
}

const MenubarButton = ({ name, children, action, active }: MenubarButtonProps) => {
    const activeMenu = useAppStore((state: any) => state.activeMenu);
    const setActiveMenu = useAppStore((state: any) => state.setActiveMenu);

    return (
        <button className={`group w-11 aspect-square relative flex justify-center items-center`} type="button" onClick={() => action ? action() : setActiveMenu(name)}>
            {children.icon && <div className={`first:group-hover:fill-primary first:w-7 first:fill-slate-800 first:duration-300 ${active !== undefined ? (active && "first:fill-primary") : activeMenu === name && "first:fill-primary"}`}>{children.icon}</div>}
            {true && activeMenu !== name && <span className="w-4 absolute right-[5px] top-1 aspect-square bg-primary rounded-full text-white text-xs">{0}</span>}
        </button>
    );
};

export default MenubarButton;
