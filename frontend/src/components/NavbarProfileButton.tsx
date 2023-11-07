'use client';
import { useState } from 'react';
import useOnClickOutside from '@/features/main/hooks/useOnClickOutside';
import useCurrentUser from '@/src/hooks/useCurrentUser';
import ModalCurrentUserProfile from '@/src/components/ModalCurrentUserProfile';
import logOut from '@/src/utils/logOut';

const NavbarProfileButton = () => {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [showModalCurrentUserProfile, setShowModalCurrentUserProfile] = useState<boolean>(false);
    const menuRef = useOnClickOutside(() => setShowMenu(false));
    const { data, isLoading, error } = useCurrentUser();

    if (isLoading || error) {
        return <div className='w-7 h-7 bg-background rounded-full' />;
    }

    if (data) {
        return (
            <>
                <div
                    className='relative flex items-center'
                    ref={menuRef}
                >
                    <button
                        className='overflow-hidden rounded-full w-7 h-7'
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        <img
                            className='w-full h-full rounded-full'
                            src={
                                data.avatar
                                    ? typeof data.avatar === 'object'
                                        ? URL.createObjectURL(data.avatar)
                                        : data.avatar
                                    : '/assets/illustrations/avatar-empty.svg'
                            }
                            alt='User profile picture'
                        />
                    </button>

                    <div
                        className={`absolute shadow-lg bg-white rounded-lg border right-0 lg:right-[inherit] lg:left-0 border-black/10  duration-300 ${
                            showMenu
                                ? 'visible opacity-100 bottom-[150%] lg:left-[200%] lg:bottom-0'
                                : 'invisible opacity-0 bottom-0'
                        }`}
                    >
                        <button
                            className='w-full px-5 py-3 bg-white text-slate-800 whitespace-nowrap hover:brightness-95'
                            onClick={() => setShowModalCurrentUserProfile(true)}
                        >
                            Profile Details
                        </button>
                        <button
                            className='w-full px-5 py-3 text-center bg-white text-slate-800 whitespace-nowrap hover:brightness-95'
                            onClick={() => logOut()}
                        >
                            Logout
                        </button>
                    </div>
                </div>
                <ModalCurrentUserProfile
                    show={showModalCurrentUserProfile}
                    toggleShow={() => setShowModalCurrentUserProfile(!showModalCurrentUserProfile)}
                />
            </>
        );
    }
};

export default NavbarProfileButton;
