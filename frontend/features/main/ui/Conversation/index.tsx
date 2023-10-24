'use client';
import { useEffect, useRef, useState } from 'react';
import useAppStore from '@/store/app.store';
import ConversationCard from '@/features/main/ui/Conversation/Card';
import ConversationHeader from '@/features/main/ui/Conversation/Header';
import ConversationNull from '@/features/main/ui/Conversation/Null';
import ConversationSidebar from '@/features/main/ui/Conversation/Sidebar';
import useConversationsStore from '@/store/conversations.store';
import useUserStore from '@/store/user.store';
import useContactsStore from '@/store/contacts.store';
import contactType from '@/type/contactType';
import userType from '@/type/userType';
import { IconFillPaperPlane } from '@/shared/Icons';
import ButtonIcon from '../reusable/ButtonIcon';
import { postConversationChat } from '@/features/auth/data/api';

type chatType = {
    id?: string;
    conversation_id?: string;
    sender_id: string;
    message: string;
    sent_at: number;
    is_seen: 0 | 1;
};

const Conversation = () => {
    const [tempChats, setTempChats] = useState<chatType[]>([]);
    const { activeConversationType, showConversation, setShowConversation, activeConversationId, activeTargetId } =
        useAppStore((state) => ({
            activeConversationType: state.activeConversationType,
            showConversation: state.showConversation,
            setShowConversation: state.setShowConversation,
            activeConversationId: state.activeConversationId,
            activeTargetId: state.activeTargetId,
        }));
    const [showSidebar, setShowSidebar] = useState<boolean>(false);
    const [chatForm, setChatForm] = useState<string>('');
    const { conversations } = useConversationsStore((state) => ({ conversations: state.conversations }));
    const { user } = useUserStore((state) => ({ user: state.user }));
    const { contacts, findContact } = useContactsStore((state) => ({
        contacts: state.contacts,
        findContact: state.findContact,
    }));
    const [targetDetails, setTargetDetails] = useState<contactType>();
    const [isOnline, setIsOnline] = useState<boolean | undefined>();
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const chatBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        activeTargetId && setTargetDetails(findContact(activeTargetId));

        if (activeTargetId !== null) {
            window.Echo.join(`chat.${activeTargetId}`)
                .here((users: userType[]) => {
                    setIsOnline(users.length > 1 ? true : false);
                })
                .joining(() => {
                    setIsOnline(true);
                })
                .leaving(() => {
                    setIsOnline(false);
                })
                .listenForWhisper('typing', () => {
                    !isTyping && setIsTyping(true)
                })
        }
    }, [activeTargetId]);


    useEffect(() => {
        const setIsTypingTimeOut = setTimeout(() => {
            isTyping && setIsTyping(false)
        }, 2000)

        return (() => {
            clearTimeout(setIsTypingTimeOut)
        })
    }, [isTyping])
    if (!activeTargetId) {
        return <ConversationNull />;
    }


    const onTypingFormHandler = (event: any) => {
        setChatForm(event.target.value);
        window.Echo.join(`chat.${user.id}`).whisper('typing', null)
    };

    const onSubmitChatFormHandler = async (event: any) => {
        event.preventDefault();
        if (chatForm.length === 0) return;
        const currentChatForm = chatForm;
        setChatForm('');

        const newChat: chatType = {
            is_seen: 0,
            message: currentChatForm,
            sender_id: useUserStore.getState().user.id,
            sent_at: new Date().getTime(),
        };

        if (!activeConversationId) {
            setTempChats([...tempChats, newChat]);
        }
        try {
            const response = await postConversationChat(
                {
                    message: chatForm,
                    receiver_id: activeTargetId,
                },
                activeConversationId || undefined
            );

            if (!activeConversationId) {
                const conversations = useConversationsStore.getState().conversations;
                conversations[response.data.data.conversation_id] = [
                    {
                        participants: [
                            {
                                conversation_id: response.data.data.conversation_id,
                                user_id: activeTargetId,
                            },
                            {
                                conversation_id: response.data.data.conversation_id,
                                user_id: user.id,
                            },
                        ],
                        chats: [response.data.data],
                    },
                ];
                useConversationsStore.setState((store) => ({ conversations }));
                useAppStore.setState({ activeConversationId: response.data.data.conversation_id });
            } else {
                const conversations = useConversationsStore.getState().conversations;
                conversations[activeConversationId][0].chats.push(response.data.data);
                useConversationsStore.setState({ conversations });
            }
            setTempChats(tempChats.filter((item) => item.sent_at !== newChat.sent_at));
        } catch (error: any) {
            setChatForm(currentChatForm);
            setTempChats(tempChats.filter((item) => item.sent_at !== newChat.sent_at));
        }
    };

    const toggleSidebarHandler = () => {
        useAppStore.getState().reset();
        setShowSidebar(false);
    };

    return (
        <div
            className={`absolute top-0 left-0 z-10 flex w-full h-full conversation lg:relative bg-background min-w-[380px] ${
                !showConversation && 'top-full'
            }`}
        >
            <div className='w-full'>
                <ConversationHeader
                    toggleConversation={() => setShowConversation(false)}
                    name={targetDetails?.details.name}
                    isOnline={isOnline}
                    isTyping={isTyping}
                    showSidebarHandler={() => setShowSidebar(true)}
                    profilePicturePath={targetDetails?.details.avatar}
                />
                <div className='flex flex-col h-full px-5 pt-3 overflow-y-scroll border-r pb-96 border-r-black/10 gap-y-5' ref={chatBoxRef}>
                    {/* <ConversationDate time={1695194444327} /> */}
                    {activeConversationId &&
                        [...conversations[activeConversationId][0].chats, ...tempChats].map((chat, index) => {
                            let detail: contactType | userType | undefined =
                                chat.sender_id === user.id ? user : findContact(chat.sender_id)?.details;

                            return (
                                <ConversationCard
                                    name={chat.sender_id === user.id ? 'You' : detail?.name}
                                    avatar={detail?.avatar}
                                    message={chat.message}
                                    position={chat.sender_id === user.id ? 'RIGHT' : 'LEFT'}
                                    time={chat.sent_at}
                                    key={index}
                                    is_seen={chat.sender_id !== user.id ? undefined : chat.is_seen}
                                />
                            );
                        })}
                </div>

                <form
                    className='sticky bottom-0 flex justify-between bg-white border-t border-r border-r-black/10 border-t-black/10'
                    onSubmit={onSubmitChatFormHandler}
                >
                    <label
                        htmlFor='message'
                        className='w-full px-5 py-4'
                    >
                        <input
                            id='message'
                            type='text'
                            className='w-full focus:outline-none text-slate-500 placeholder:text-sm'
                            placeholder='Type to add your message'
                            value={chatForm}
                            onChange={(event) => onTypingFormHandler(event)}
                        />
                    </label>
                    <div className='flex items-center pr-5'>
                        <ButtonIcon
                            icon={<IconFillPaperPlane />}
                            type='submit'
                        />
                    </div>
                </form>
            </div>

            {activeConversationType === 'PRIVATE' && (
                <ConversationSidebar
                    toggleSidebar={() => toggleSidebarHandler()}
                    show={showSidebar}
                    data={{
                        name: targetDetails?.details.name,
                        id: targetDetails?.details.id,
                        description: targetDetails?.details.description,
                        email: targetDetails?.details.email,
                        joinedAt: targetDetails?.details.joined_at,
                        status: targetDetails?.details.status,
                        avatar: targetDetails?.details.avatar,
                    }}
                />
            )}
            {/* {activeConversationType === 'GROUPS' && (
                <ConversationSidebar
                    toggleSidebar={() => setShowSidebar(!showSidebar)}
                    show={showSidebar}
                    data={{
                        name: 'BMX Club',
                        id: 1234,
                        description: 'Lorem ipsum dolor sit amet',
                        membership: 10,
                        createdAt: 1695194444327,
                        creator: 'Samsudin',
                    }}
                />
            )} */}
        </div>
    );
};

export default Conversation;
