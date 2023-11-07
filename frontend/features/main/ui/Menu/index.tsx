"use client";

import MenuContacts from '@/features/main/ui/Menu/Contact';
import MenuGroups from '@/features/main/ui/Menu/Group';
import MenuPrivate from '@/features/main/ui/Menu/Private';
import useAppStore from '@/store/app.store';

const Menu = () => {
    const { activeMenu } = useAppStore((state) => ({
        activeMenu: state.activeMenu,
    }));
    return (
        <div className='w-full h-fulll bg-white lg:min-w-[320px] lg:max-w-[400px] lg:border-r-black/10 lg:border-r'>
            {activeMenu === 'PRIVATE' && <MenuPrivate />}
            {activeMenu === 'CONTACTS' && <MenuContacts />}
            {activeMenu === 'GROUPS' && <MenuGroups />}
        </div>
    );
};

export default Menu;
