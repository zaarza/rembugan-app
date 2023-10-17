import { useState } from 'react';
import { IconFillUserSearch } from '@/shared/Icons';
import ModalFriendRequestDetail from '@/features/main/ui/reusable/Modals/FriendRequestDetail';
import timeFormatter from '../../utils/timeFormatter';
import { acceptFriendRequest, rejectFriendRequest } from '@/features/auth/data/api';
import useInboxesStore from '@/store/inboxes.store';

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
    name: string;
    sender_id: string;
    time: number;
    profilePicturePath?: string;
    type: 'friend' | 'group';
    is_seen: number;
};

const ConfirmRequest = ({ id, sender_id, name, time, profilePicturePath, type, is_seen }: ConfirmRequestProps) => {
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const { inboxes, deleteInbox, storeInbox } = useInboxesStore((state) => ({
        inboxes: state.inboxes,
        deleteInbox: state.deleteInbox,
        storeInbox: state.storeInbox,
    }));
    const rejectRequestHandler = async (id: string, type: 'friend' | 'group') => {
        if (!confirm(`Reject friend request from ${name}?`)) {
            return;
        }
        const inbox = inboxes.find((inboxItem) => inboxItem.id === id);

        if (type === 'friend') {
            try {
                deleteInbox(id);
                await rejectFriendRequest(sender_id);
            } catch (error: any) {
                inbox && storeInbox(inbox);
                alert('Failed to reject friend request!')
            }
        }
    };

    const acceptRequestHandler = async (id: string, type: 'friend' | 'group') => {
        if (!confirm(`Accept friend request from ${name}?`)) {
            return;
        }
        const inbox = inboxes.find((inboxItem) => inboxItem.id === id);

        if (type === 'friend') {
            try {
                deleteInbox(id);
                await acceptFriendRequest(sender_id);
            } catch (error: any) {
                inbox && storeInbox(inbox);
                alert('Failed to accept friend request!')
            }
        }
    };

    return (
        <>
            <div className={`flex gap-x-5 px-6 py-4 hover:bg-primary/5 ${is_seen === 1 ? 'bg-white' : 'bg-primary/5'}`}>
                <img
                    className='w-11 h-11 rounded-lg border border-black/10'
                    src={
                        profilePicturePath
                            ? `${process.env.NEXT_PUBLIC_API_URL}${profilePicturePath}`
                            : '/assets/illustrations/avatar-empty.svg'
                    }
                    alt={`${name} profile picture`}
                />
                <div className='flex flex-col gap-y-2'>
                    <h1 className='text-sm text-slate-800 font-medium whitespace-nowrap'>
                        {type === 'friend' ? `${name} sent you a friend request` : `You are invited to join ${name}`}
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
                        <ConfirmationButton
                            variant='OUTLINE'
                            action={() => setShowDetails(true)}
                        >
                            <div className='first:fill-primary w-4'>
                                <IconFillUserSearch />
                            </div>
                        </ConfirmationButton>
                    </div>
                </div>
            </div>
            <ModalFriendRequestDetail
                id={sender_id}
                show={showDetails}
                toggleShow={() => setShowDetails(!showDetails)}
            />
        </>
    );
};

export default ConfirmRequest;
