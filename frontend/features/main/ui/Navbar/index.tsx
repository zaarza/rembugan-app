"use client";

import { useState } from 'react';
import { RembuganAppLogo, IconFillMessage, IconFillContactBook, IconFillGroup } from '@/shared/Icons';
import useAppStore from '@/store/app.store';
import ButtonIcon from '@/features/main/ui/reusable/ButtonIcon';
import InboxButton from '@/features/main/ui/Navbar/InboxButton';
import ProfileButton from '@/features/main/ui/Navbar/ProfileButton';

const Navbar = () => {
  const { activeMenu, setActiveMenu, setActiveConversationId, showConversation } =
      useAppStore((state) => ({
          setActiveConversationId: state.setActiveConversationId,
          showConversation: state.showConversation,
          activeMenu: state.activeMenu,
          setActiveMenu: state.setActiveMenu,
      }));
  const [showInbox, setShowInbox] = useState<boolean>(false);

  return (
      <div
          className={`border-t border-t-black/10 lg:border-x lg:border-x-black/10 lg:py-5 lg:flex fixed lg:w-fit bottom-0 lg:left-0  lg:top-0 lg:flex-col z-40 bg-white w-full gap-x-8 px-5 py-2 lg:sticky justify-center lg:justify-between ${
              showConversation ? 'hidden lg:flex' : 'flex'
          }`}
      >
          <div className='flex lg:flex-col gap-x-12 gap-y-6'>
              <div className='hidden lg:block'>
                  <ButtonIcon
                      icon={<RembuganAppLogo />}
                      action={() => setActiveConversationId(null)}
                  />
              </div>
              <InboxButton
                  show={showInbox}
                  setShow={setShowInbox}
              />
          </div>

          <div className='flex lg:flex-col gap-x-8 gap-y-6 justify-evenly'>
              <ButtonIcon
                  icon={<IconFillMessage />}
                  action={() => setActiveMenu('PRIVATE')}
                  active={activeMenu === 'PRIVATE'}
              />
              <ButtonIcon
                  icon={<IconFillContactBook />}
                  action={() => setActiveMenu('CONTACTS')}
                  active={activeMenu === 'CONTACTS'}
              />
              <ButtonIcon
                  icon={<IconFillGroup />}
                  action={() => setActiveMenu('GROUPS')}
                  active={activeMenu === 'GROUPS'}
              />
          </div>

          <ProfileButton />
      </div>
  );
};

export default Navbar;