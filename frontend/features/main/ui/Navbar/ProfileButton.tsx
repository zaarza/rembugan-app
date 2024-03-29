/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import useOnClickOutside from '@/features/main/hooks/useOnClickOutside';
import ModalMyProfile from '@/features/main/ui/reusable/Modals/MyProfile';
import useUserStore from '@/store/user.store';

const ProfileButton = () => {
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const menuRef = useOnClickOutside(() => setShowMenu(false));
    const [showModalMyProfile, setShowModalMyProfile] = useState<boolean>(false);
    const { user, logOut } = useUserStore((state) => ({
        user: state.user,
        fetchUser: state.fetchUser,
        logOut: state.logOut,
    }));

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
                            user.avatar
                                ? typeof user.avatar === 'object'
                                    ? URL.createObjectURL(user.avatar)
                                    : user.avatar
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
                        onClick={() => setShowModalMyProfile(true)}
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
            <ModalMyProfile
                show={showModalMyProfile}
                toggleShow={() => setShowModalMyProfile(!showModalMyProfile)}
            />
        </>
    );
};

export default ProfileButton;
