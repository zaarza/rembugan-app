type MenubarProfileMenuProps = {
    show: boolean
};

const MenubarProfileMenu = ({ show }: MenubarProfileMenuProps) => {
    return (
        <div className={`absolute bg-white rounded-lg border right-0 lg:right-[inherit] lg:left-0 border-black/10  duration-300 ${show ? "visible opacity-100 bottom-[150%] lg:left-[150%] lg:bottom-0" : "invisible opacity-0 bottom-0"}`}>
            <button className="text-slate-800 whitespace-nowrap py-3 px-5 hover:brightness-95 bg-white w-full">Profile Details</button>
            <button className="text-slate-800 whitespace-nowrap py-3 px-5 text-center hover:brightness-95 bg-white w-full">Logout</button>
        </div>
    );
};

export default MenubarProfileMenu;
