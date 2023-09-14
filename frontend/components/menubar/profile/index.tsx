import { useEffect, useRef, useState } from "react";
import MenubarButton from "@/components/menubar/MenubarButton";
import MenubarProfileMenu from "./MenubarProfileMenu";

const MenubarProfileButton = () => {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const menuRef = useRef<any>(null);

    useEffect(() => {
        const clickOutsideToClose = (event: any) => {
            if (!menuRef.current?.contains(event.target)) {
                setShowMenu(false)
            }
        }

        document.addEventListener("mousedown", clickOutsideToClose);

        return (() => {
            document.removeEventListener("mousedown", clickOutsideToClose);
        })
    })

    return (
        <div className="relative" ref={menuRef}>
            {/* BUTTON */}
            <button className="w-11 h-11 rounded-full overflow-hidden" onClick={() => setShowMenu(!showMenu)}>
                <img className="w-full" src="/assets/images/avatar-dummy.png" alt="" />
            </button>

            <MenubarProfileMenu show={showMenu} />
        </div>
    );
};

export default MenubarProfileButton;
