import { useState } from 'react';
import { IconFillNotificationBell, IconLineClose } from '@/shared/Icons';
import useAppStore from '@/store/app.store';
import useOnClickOutside from '@/features/main/hooks/useOnClickOutside';
import ButtonIcon from '@/features/main/ui/reusable/ButtonIcon';
import ConfirmRequest from '@/features/main/ui/reusable/ConfirmRequest';
import InboxCategoryButton from '@/features/main/ui/Navbar/InboxCategoryButton';

const InboxButton = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: (show: boolean) => void;
}) => {
  const [activeInboxCategory, setActiveInboxCategory] = useState<
      'ALL' | 'UNREAD' | 'READ'
  >('ALL');
  const menuRef = useOnClickOutside(() => setShow(false));
  const { inboxData } = useAppStore((state) => ({ inboxData: state.inbox}))

  return (
      <div
          className='relative'
          ref={menuRef}
      >
          <ButtonIcon
              icon={<IconFillNotificationBell />}
              action={() => setShow(!show)}
              active={show}
              notificationCount={1}
          />
          <div
              className={`bg-white shadow-lg w-[360px] overflow-hidden flex flex-col gap-y-5 absolute bottom-0 lg:bottom-[inherit] lg:top-0 lg:left-0 -left-[50%] rounded-lg border-black/10 border duration-300 z-30 ${
                  show
                      ? 'visible opacity-100 lg:left-[200%] bottom-[150%]'
                      : 'invisible opacity-50'
              }`}
          >
              <div className='flex justify-between px-6 pt-6'>
                  <h1 className='font-medium text-slate-800'>
                      Notifications ({inboxData.length})
                  </h1>
                  <ButtonIcon
                      icon={<IconLineClose />}
                      action={() => setShow(!show)}
                  />
              </div>

              <div className='flex px-6 gap-x-4'>
                  <InboxCategoryButton
                      active={activeInboxCategory === 'ALL'}
                      text='All'
                      action={() => setActiveInboxCategory('ALL')}
                  />
                  <InboxCategoryButton
                      active={activeInboxCategory === 'READ'}
                      text='Read'
                      action={() => setActiveInboxCategory('READ')}
                  />
                  <InboxCategoryButton
                      active={activeInboxCategory === 'UNREAD'}
                      text='Unread'
                      action={() => setActiveInboxCategory('UNREAD')}
                  />
              </div>

              <div className='flex flex-col overflow-auto max-h-80'>
                  {inboxData.length > 0 ? inboxData.map((inboxItem, index) => (
                      <ConfirmRequest
                          id={inboxItem.id}
                          name={inboxItem.name}
                          time={inboxItem.time}
                          profilePicturePath={inboxItem.profilePicturePath}
                          type={inboxItem.type}
                          key={`${inboxItem.type}-request-${index}`}
                      />
                  )): (
                      <div className='h-36 flex justify-center items-center'>
                          <div className='text-sm text-slate-500'>Inbox is empty!</div>
                      </div>
                  )}
              </div>
          </div>
      </div>
  );
};

export default InboxButton;