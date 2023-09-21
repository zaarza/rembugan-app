import { useState } from "react";

import useOnClickOutside from "@/features/main/hooks/useOnClickOutside";

type ProfileButtonProps = {
    profilePicturePath: string;
};

const ProfileButton = ({ profilePicturePath }: ProfileButtonProps) => {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const menuRef = useOnClickOutside(() => setShowMenu(false));

    return (
        <div className="relative flex items-center" ref={menuRef}>
            <button className="overflow-hidden rounded-full w-7 h-7" onClick={() => setShowMenu(!showMenu)}>
                <img className="w-full" src={profilePicturePath} alt="User profile picture" />
            </button>

            <div className={`absolute bg-white rounded-lg border right-0 lg:right-[inherit] lg:left-0 border-black/10  duration-300 ${showMenu ? "visible opacity-100 bottom-[150%] lg:left-[150%] lg:bottom-0" : "invisible opacity-0 bottom-0"}`}>
                <button className="w-full px-5 py-3 bg-white text-slate-800 whitespace-nowrap hover:brightness-95">Profile Details</button>
                <button className="w-full px-5 py-3 text-center bg-white text-slate-800 whitespace-nowrap hover:brightness-95">Logout</button>
            </div>
        </div>
    );
};

export default ProfileButton;