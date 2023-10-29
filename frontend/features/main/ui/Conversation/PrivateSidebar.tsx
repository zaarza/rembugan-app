import { useState } from 'react';
import { IconLineArrowLeft, IconLineMenuList, IconFillMail, IconFillClock, IconFillSmile } from '@/shared/Icons';
import useOnClickOutside from '@/features/main/hooks/useOnClickOutside';
import ButtonIcon from '@/features/main/ui/reusable/ButtonIcon';
import timeFormatter from '@/features/main/utils/timeFormatter';
import userType from '@/type/userType';
import useContactsStore from '@/store/contacts.store';
import { deleteContactById } from '@/features/auth/data/api';
import useAppStore from '@/store/app.store';
import useConversationStore from '@/store/conversations.store';

type PrivateSidebarProps = {
    data: userType;
    show: boolean;
    toggleSidebar: () => void;
};

const PrivateSidebar = ({ data, show, toggleSidebar }: PrivateSidebarProps) => {
    const [showAction, setShowAction] = useState<boolean>(false);
    const actionRef = useOnClickOutside(() => setShowAction(false));

    const onClickDeleteContactHandler = async (data: userType, callbacks: (() => void)[]) => {
        if (!confirm(`Delete ${data.name} from contacts?`)) return;
        let conversation;
        const contact = useContactsStore.getState().contacts.find((contact) => contact.details.name === data.name);

        const conversationId = Object.keys(useConversationStore.getState().conversations).find((conversationId) => {
            return useConversationStore
                .getState()
                .conversations[conversationId][0].participants.find(
                    (participantItem) => participantItem.user_id === data.id
                );
        });

        useContactsStore.getState().deleteContact(data.id);

        try {
            await deleteContactById(data.id, useAppStore.getState().activeConversationId);
            useAppStore.setState({ activeTargetId: null, activeConversationId: null, showConversation: false });
            callbacks.forEach((callback) => callback());

            if (conversationId !== undefined) {
                conversation = useConversationStore.getState().conversations[conversationId];
                useConversationStore.getState().deletePersonConversation(conversationId);
            }
        } catch (error: any) {
            alert('Failed to delete contact');
            contact && useContactsStore.getState().addContact(contact);
        }
    };

    return (
        <>
            <div
                className={`flex fixed h-full flex-col gap-y-10 px-5 py-3 md:static right-0 top-0 border-l border-l-black/10 md:border-0 bg-white w-[80%] max-w-[340px] z-20 ${
                    show ? '-mr-0 duration-300' : '-mr-[9999px] duration-300'
                } overflow-auto`}
            >
                <div className='flex items-center justify-between title'>
                    <ButtonIcon
                        icon={<IconLineArrowLeft />}
                        action={() => toggleSidebar()}
                    />
                    <div className='flex flex-col gap-y-1'>
                        <h1 className='text-sm font-semibold text-slate-800'>Contact Information</h1>
                        <h2 className='text-xs text-slate-800'>Detail information about this contact</h2>
                    </div>
                    <div className='relative'>
                        <ButtonIcon
                            icon={<IconLineMenuList />}
                            action={() => setShowAction(!showAction)}
                        />
                        <div
                            className={`bg-white overflow-hidden rounded-lg border border-black/10 absolute right-0 top-[50px] ${
                                showAction ? 'block' : 'hidden'
                            }`}
                            ref={actionRef}
                        >
                            <div
                                className='py-3 px-5 text-red-500 whitespace-nowrap bg-white hover:brightness-95'
                                onClick={() => onClickDeleteContactHandler(data, [() => toggleSidebar()])}
                            >
                                Delete Contact
                            </div>
                        </div>
                    </div>
                </div>

                {/* PROFILE */}
                <div className='flex flex-col gap-y-3'>
                    <img
                        className='rounded-lg self-center max-w-[100px] w-full min-w-[24px]'
                        src={
                            data.avatar
                                ? `${process.env.NEXT_PUBLIC_API_URL}/${data.avatar}`
                                : '/assets/illustrations/avatar-empty.svg'
                        }
                        alt=''
                    />
                    <div className='flex flex-col items-center gap-y-1'>
                        <h1 className='font-semibold text-slate-800'>{data.name || ''}</h1>
                        <h2 className='text-xs text-slate-500'>@{data.id || ''}</h2>
                    </div>
                </div>
                <div className='flex flex-col gap-y-1'>
                    <h1 className='font-medium text-sm text-slate-800'>Contact Description</h1>
                    <h2 className='text-xs text-slate-800'>{data.description || 'No description'}</h2>
                </div>
                <div className='flex flex-col gap-y-1'>
                    <h3 className='font-medium text-sm text-slate-800'>More Information</h3>
                    <div className='flex flex-col gap-y-2'>
                        <span
                            title='Email address'
                            className='flex items-center gap-x-3'
                        >
                            <div className='w-5 first:fill-slate-800'>
                                <IconFillMail />
                            </div>
                            <p className='text-xs text-slate-800'>{data.email || ''}</p>
                        </span>
                        <span
                            title='Joined at'
                            className='flex items-center gap-x-3'
                        >
                            <div className='w-5 first:fill-slate-800'>
                                <IconFillClock />
                            </div>
                            <p className='text-xs text-slate-800'>
                                {data.joined_at && 'Joined at ' + timeFormatter(data.joined_at)}
                            </p>
                        </span>
                        <span
                            title='Status'
                            className='flex items-center gap-x-3'
                        >
                            <div className='w-5 first:fill-slate-800'>
                                <IconFillSmile />
                            </div>
                            <p className='text-xs text-slate-800'>{data.status || 'No status'}</p>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PrivateSidebar;
