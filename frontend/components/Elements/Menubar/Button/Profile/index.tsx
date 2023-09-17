import { useState } from "react";

import MenubarProfileMenu from "@/components/Elements/Menubar/Button/Profile/Menu";
import useOnClickOutside from "@/hooks/useOnClickOutside";

const MenubarProfileButton = () => {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const menuRef = useOnClickOutside(() => setShowMenu(false));

    return (
        <div className="relative" ref={menuRef}>
            <button className="w-7 h-7 rounded-full overflow-hidden" onClick={() => setShowMenu(!showMenu)}>
                <img className="w-full" src="/assets/images/avatar-dummy.png" alt="" />
            </button>

            <MenubarProfileMenu show={showMenu} />
        </div>
    );
};

export default MenubarProfileButton;
