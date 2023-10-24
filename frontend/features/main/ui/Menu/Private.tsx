import { useState } from 'react';
import useAppStore from '@/store/app.store';
import Searchbar from '@/features/main/ui/reusable/Searchbar';
import MenuItem from '@/features/main/ui/Menu/Item';
import useConversationsStore from '@/store/conversations.store';
import useContactsStore from '@/store/contacts.store';
import useUserStore from '@/store/user.store';
import ItemSkeleton from './ItemSkeleton';

const MenuPrivate = () => {
    const [query, setQuery] = useState<string>('');
    const { setActiveMenu } = useAppStore((state) => ({
        setActiveMenu: state.setActiveMenu,
    }));

    const submitQuery = (event: any) => {
        event.preventDefault();
    };

    const { conversations, loadingConversations } = useConversationsStore((state) => ({
        conversations: state.conversations,
        loadingConversations: state.loadingConversations,
    }));
    const { findContact, loadingContacts } = useContactsStore((state) => ({
        findContact: state.findContact,
        loadingContacts: state.loadingContacts,
    }));
    const { user } = useUserStore((state) => ({ user: state.user }));

    return (
        <div className='flex flex-col w-full h-full relative'>
            <div className='sticky top-0 z-10 flex flex-col p-6 bg-white gap-y-5'>
                <h1 className='text-xl font-semibold text-slate-800'>Messages</h1>
                <Searchbar
                    name='message'
                    placeholder='Search messages...'
                    value={query}
                    setValue={(event) => setQuery(event.target.value)}
                    submitHandler={submitQuery}
                />
            </div>

            {loadingContacts || loadingConversations ? (
                <>
                    <ItemSkeleton />
                    <ItemSkeleton />
                    <ItemSkeleton />
                </>
            ) : (
                <div className='flex flex-col overflow-auto pb-36 h-full'>
                    {Object.keys(conversations).length > 0 ? (
                        Object.keys(conversations).map((conversation, index: number) => {
                            const lastMessage =
                                conversations[conversation][0].chats[conversations[conversation][0].chats.length - 1];
                            const lastMessageUser =
                                lastMessage.sender_id === user.id ? user : findContact(lastMessage.sender_id)?.details;
                        
                            const unseenMessagesCount = conversations[conversation][0].chats.filter(
                                (chat) => chat.is_seen === 0
                            ).length;
                            const target = conversations[conversation][0].participants.filter(
                                (participantItem) => participantItem.user_id !== user.id
                            )[0];

                            return (
                                <MenuItem
                                    name={findContact(target.user_id)?.details.name || "Unknown"}
                                    conversationId={conversation}
                                    message={lastMessage.message}
                                    time={lastMessage.sent_at}
                                    key={`message-${conversation}`}
                                    notificationCount={unseenMessagesCount}
                                    type='PRIVATE'
                                    targetId={target.user_id}
                                />
                            );
                        })
                    ) : (
                        <div className='flex justify-center items-center py-5 px-6 m-auto absolute top-[48%] left-0 right-0'>
                            <div className='text-sm text-slate-500 text-center'>
                                Current message is empty, select{' '}
                                <button
                                    type='button'
                                    className='cursor-pointer text-primary underline underline-offset-2'
                                    onClick={() => setActiveMenu('CONTACTS')}
                                >
                                    contact
                                </button>{' '}
                                and start conversation!
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MenuPrivate;
