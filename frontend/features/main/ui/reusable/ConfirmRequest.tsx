import { useEffect, useState } from 'react';
import { IconFillUserSearch } from '@/shared/Icons';
import ModalFriendRequestDetail from '@/features/main/ui/reusable/Modals/FriendRequestDetail';
import timeFormatter from '../../utils/timeFormatter';
import {
    acceptFriendRequest,
    acceptGroupInvitation,
    getGroupDetails,
    getUserDetailById,
    rejectFriendRequest,
    rejectGroupInvitation,
} from '@/features/auth/data/api';
import useInboxesStore from '@/store/inboxes.store';
import useContactsStore from '@/store/contacts.store';
import userType from '@/type/userType';
import groupType from '@/type/groupType';
import useGroupsStore from '@/store/groups.store';

type confirmationButtonProps = {
    text?: string;
    children?: any;
    variant: 'OUTLINE' | 'FILL';
    action: () => void;
};

const ConfirmationButton = ({ text, variant, action, children }: confirmationButtonProps) => {
    return (
        <button
            className={`hover:brightness-95 rounded-lg px-4 py-2 border text-xs ${
                variant === 'FILL' ? 'bg-primary text-white border-black/10' : 'border-primary text-primary'
            }`}
            onClick={() => action()}
        >
            {text || children}
        </button>
    );
};

type ConfirmRequestProps = {
    id: string;
    sender_id: string;
    time: number;
    type: 'friend' | 'group' | 'group-join-request';
};

const ConfirmRequest = ({ id, sender_id, time, type }: ConfirmRequestProps) => {
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [details, setDetails] = useState<userType | groupType>();

    useEffect(() => {
        if (type === 'group') {
            getGroupDetails(sender_id).then((result) => {
                setDetails(result.data.data);
            });
        } else {
            getUserDetailById(sender_id).then((result) => {
                setDetails(result.data.data);
            });
        }
    }, []);

    const { inboxes, deleteInbox, storeInbox } = useInboxesStore((state) => ({
        inboxes: state.inboxes,
        deleteInbox: state.deleteInbox,
        storeInbox: state.storeInbox,
    }));
    const rejectRequestHandler = async (id: string, type: 'friend' | 'group' | 'group-join-request') => {
        if (!confirm(`Reject friend request from ${name}?`)) {
            return;
        }
        const inbox = inboxes.find((inboxItem) => inboxItem.id === id);
        if (!inbox) return;

        try {
            deleteInbox(id);
            if (type === 'friend') {
                await rejectFriendRequest(sender_id);
            } else {
                await rejectGroupInvitation(inbox.id);
            }
        } catch (error: any) {
            inbox && storeInbox(inbox);
            if (type === 'friend') {
                alert('Failed to reject friend request!');
            } else {
                alert('Failed to reject group invitation!');
            }
        }
    };

    const acceptRequestHandler = async (id: string, type: 'friend' | 'group' | 'group-join-request') => {
        const inbox = inboxes.find((inboxItem) => inboxItem.id === id);

        try {
            if (type === 'friend') {
                if (!confirm(`Accept friend request from ${details?.name}?`)) {
                    return;
                }
                deleteInbox(id);
                const response = await acceptFriendRequest(sender_id);
                useContactsStore.setState((store) => ({ contacts: [...store.contacts, response.data.data] }));
            }

            if (type === 'group') {
                if (!confirm(`Accept join ${details?.name} group?`)) {
                    return;
                }
                deleteInbox(id);
                const response = await acceptGroupInvitation(id);
                const group = await getGroupDetails(response.data.data.group_id);
                useGroupsStore.getState().addGroup(group.data.data);
            }
        } catch (error: any) {
            inbox && storeInbox(inbox);

            if (type === 'group') {
                alert('Failed to accept group invitation!');
            } else {
                alert('Failed to accept friend request!');
            }
        }
    };

    if (details) {
        return (
            <>
                <div className={`flex gap-x-5 px-6 py-4 hover:bg-primary/5 bg-white`}>
                    <img
                        className='w-11 h-11 rounded-lg border border-black/10'
                        src={
                            details.avatar
                                ? `${process.env.NEXT_PUBLIC_API_URL}${details.avatar}`
                                : '/assets/illustrations/avatar-empty.svg'
                        }
                        alt={`${name} profile picture`}
                    />
                    <div className='flex flex-col gap-y-2'>
                        <h1 className='text-sm text-slate-800 font-medium whitespace-nowrap'>
                            {type === 'friend'
                                ? `${details.name} sent you a friend request`
                                : `You are invited to join ${details.name}`}
                        </h1>
                        <h2 className='text-xs text-slate-500'>{timeFormatter(time)}</h2>
                        <div className='flex gap-x-3'>
                            <ConfirmationButton
                                text='Reject'
                                variant='OUTLINE'
                                action={() => rejectRequestHandler(id, type)}
                            />
                            <ConfirmationButton
                                text='Accept'
                                variant='FILL'
                                action={() => acceptRequestHandler(id, type)}
                            />
                            {type === 'friend' && (
                                <ConfirmationButton
                                    variant='OUTLINE'
                                    action={() => setShowDetails(true)}
                                >
                                    <div className='first:fill-primary w-4'>
                                        <IconFillUserSearch />
                                    </div>
                                </ConfirmationButton>
                            )}
                        </div>
                    </div>
                </div>
                <ModalFriendRequestDetail
                    id={sender_id}
                    show={showDetails}
                    toggleShow={() => setShowDetails(!showDetails)}
                    acceptRequestHandler={() => acceptRequestHandler(id, 'friend')}
                    rejectRequestHandler={() => rejectRequestHandler(id, 'friend')}
                />
            </>
        );
    }
};

export default ConfirmRequest;
