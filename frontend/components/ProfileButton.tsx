import { useEffect, useRef, useState } from "react";
import MenuButton from "./MenuButton";

const ProfileButton = () => {
    const [showMenu, setShowMenu] = useState<boolean>(true);
    const menuRef = useRef(null);

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
            <MenuButton img="/assets/images/avatar-dummy.png" className="overflow-hidden rounded-full" action={() => setShowMenu(!showMenu)} />
            <div className={`absolute bg-white rounded-lg border right-0 border-black/10  duration-300 ${showMenu ? "visible opacity-100 bottom-[150%]" : "invisible opacity-0 bottom-0"}`}>
                <button className="text-slate-800 whitespace-nowrap py-3 px-5 hover:brightness-95 bg-white w-full">Profile Details</button>
                <button className="text-slate-800 whitespace-nowrap py-3 px-5 text-center hover:brightness-95 bg-white w-full">Logout</button>
            </div>
        </div>
    );
};

export default ProfileButton;
