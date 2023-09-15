import { useState } from "react";

import MenubarProfileMenu from "./MenubarProfileMenu";
import useOnClickOutside from "@/hooks/useOnClickOutside";

const MenubarProfileButton = () => {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const menuRef = useOnClickOutside(() => setShowMenu(false));

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
