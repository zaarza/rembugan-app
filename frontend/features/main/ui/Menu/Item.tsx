import timeFormatter from '@/features/main/utils/timeFormatter';
import useAppStore from '@/store/app.store';
import useConversationStore from '@/store/conversations.store';
import useGroupsStore from '@/store/groups.store';

type MenuItemProps = {
    conversationId?: string;
    name?: string;
    time?: number;
    message?: string | number;
    notificationCount?: number;
    profilePicturePath?: string | null;
    type: 'PRIVATE' | 'GROUP';
    targetId: string;
};

const MenuItem = ({
    conversationId,
    name,
    time,
    message,
    notificationCount = 0,
    profilePicturePath,
    type,
    targetId,
}: MenuItemProps) => {
    const {
        setActiveConversationId,
        setShowConversation,
        setActiveMenu,
        setActiveTargetId,
        setActiveConversationType,
    } = useAppStore((state) => ({
        setActiveConversationId: state.setActiveConversationId,
        setShowConversation: state.setShowConversation,
        setActiveMenu: state.setActiveMenu,
        setActiveTargetId: state.setActiveTargetId,
        setActiveConversationType: state.setActiveConversationType,
    }));

    const onClickMenuItemHandler = (type: 'PRIVATE' | 'GROUP', conversationId?: string) => {
        setActiveTargetId(targetId);

        if (type === 'PRIVATE') {
            // Check is conversation already exist
            if (conversationId === undefined) {
                setActiveConversationId(null);
                const findConversationIdInStore = Object.keys(useConversationStore.getState().conversations).find(
                    (conversationId) => {
                        return useConversationStore
                            .getState()
                            .conversations[conversationId][0].participants.find(
                                (participantItem) => participantItem.user_id === targetId
                            );
                    }
                );

                if (findConversationIdInStore !== undefined) setActiveConversationId(findConversationIdInStore);
            } else {
                setActiveConversationId(conversationId);
            }

            setActiveConversationType('PRIVATE');
            setShowConversation(true);
        }

        if (type === 'GROUP') {
            setActiveConversationType('GROUP');
            setActiveConversationId(targetId);
            setShowConversation(true);
        }
    };

    return (
        <button
            className='bg-white hover:bg-primary/5 duration-300 flex py-4 px-6 gap-x-5 items-center'
            type='button'
            onClick={() => onClickMenuItemHandler(type, conversationId)}
        >
            <div className='rounded-lg overflow-hidden'>
                <img
                    className='w-[54px] aspect-square'
                    src={
                        profilePicturePath
                            ? `${process.env.NEXT_PUBLIC_API_URL}${profilePicturePath}`
                            : 'assets/illustrations/avatar-empty.svg'
                    }
                    alt=''
                />
            </div>
            <div className='flex flex-col items-start gap-y-1 lg:w-[80%] w-full'>
                <div className='flex justify-between w-full items-start'>
                    <h1 className='font-medium text-base text-slate-800'>{name}</h1>
                    {time && <small className='text-xs text-slate-500'>{timeFormatter(time)}</small>}
                </div>
                <div className='flex justify-between w-full items-start'>
                    <h2 className='text-sm text-slate-500 line-clamp-1 overflow-clip text-left max-w-[90%]'>
                        {message}
                    </h2>

                    {notificationCount > 0 && (
                        <small
                            className={`bg-primary rounded-full w-5 aspect-square text-white justify-center items-center relative flex
                        }`}
                        >
                            <span className='absolute text-[10px]'>{notificationCount}</span>
                        </small>
                    )}
                </div>
            </div>
        </button>
    );
};

export default MenuItem;
