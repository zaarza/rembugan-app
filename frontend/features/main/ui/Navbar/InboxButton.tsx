import { IconFillNotificationBell, IconLineClose } from '@/shared/Icons';
import ButtonIcon from '@/features/main/ui/reusable/ButtonIcon';
import ConfirmRequest from '@/features/main/ui/reusable/ConfirmRequest';
import InboxCategoryButton from '@/features/main/ui/Navbar/InboxCategoryButton';
import useInboxesStore from '@/store/inboxes.store';
import useInboxButton from '@/features/main/hooks/useInboxButton';
import inboxType from '@/type/inboxType';

const InboxButton = () => {
    const { inboxes } = useInboxesStore((state) => ({ inboxes: state.inboxes }));
    const {
        menuRef,
        setShowMenu,
        showMenu,
        page,
        lastPage,
        setPage,
    } = useInboxButton();

    return (
        <div
            className='relative'
            ref={menuRef}
        >
            <ButtonIcon
                icon={<IconFillNotificationBell />}
                action={() => setShowMenu(!showMenu)}
                active={showMenu}
            />
            <div
                className={`bg-white shadow-lg w-[360px] overflow-hidden flex flex-col gap-y-5 absolute bottom-0 lg:bottom-[inherit] lg:top-0 lg:left-0 -left-[50%] rounded-lg border-black/10 border duration-300 z-30 ${
                    showMenu ? 'visible opacity-100 lg:left-[200%] bottom-[150%]' : 'invisible opacity-50'
                }`}
            >
                <div className='flex justify-between px-6 pt-6'>
                    <h1 className='font-medium text-slate-800'>Notifications ({inboxes.length})</h1>
                    <ButtonIcon
                        icon={<IconLineClose />}
                        action={() => setShowMenu(!showMenu)}
                    />
                </div>

                <div className='flex flex-col overflow-auto max-h-80'>
                    {inboxes.length > 0 ? (
                        inboxes.map((inboxItem: inboxType, index: number) => (
                            <ConfirmRequest
                                id={inboxItem?.id}
                                sender_id={inboxItem?.sender_id}
                                name={inboxItem?.sender_details?.name || ''}
                                time={inboxItem?.created_at}
                                profilePicturePath={inboxItem?.sender_details?.avatar}
                                type={inboxItem?.type}
                                key={`${inboxItem?.type}-request-${index}`}
                            />
                        ))
                    ) : (
                        <div className='h-36 flex justify-center items-center'>
                            <div className='text-sm text-slate-500'>Inbox is empty!</div>
                        </div>
                    )}

                    {page < lastPage && (
                        <div className='mx-auto mt-5 mb-5'>
                            <InboxCategoryButton
                                action={() => page < lastPage && setPage(page + 1)}
                                text='Load more'
                                active={false}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InboxButton;
