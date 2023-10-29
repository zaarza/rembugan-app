'use client';

import { useEffect, useRef, useState } from 'react';
import useAppStore from '@/store/app.store';
import ConversationCard from '@/features/main/ui/Conversation/Card';
import ConversationHeader from '@/features/main/ui/Conversation/Header';
import useConversationsStore from '@/store/conversations.store';
import useUserStore from '@/store/user.store';
import useContactsStore from '@/store/contacts.store';
import contactType from '@/type/contactType';
import userType from '@/type/userType';
import { IconFillPaperPlane } from '@/shared/Icons';
import ButtonIcon from '@/features/main/ui/reusable/ButtonIcon';
import { postConversationChat } from '@/features/auth/data/api';
import PrivateSidebar from '@/features/main/ui/Conversation/PrivateSidebar';
import chatType from '@/type/chatType';

const initialTargetDetails: userType = {
    id: '',
    avatar: null,
    description: null,
    email: '',
    is_online: 0,
    joined_at: 0,
    last_seen: 0,
    name: '',
    status: '',
};

const PrivateConversation = () => {
    const { activeConversationType, showConversation, activeConversationId, activeTargetId } = useAppStore((state) => ({
        activeConversationType: state.activeConversationType,
        showConversation: state.showConversation,
        activeConversationId: state.activeConversationId,
        activeTargetId: state.activeTargetId,
    }));
    const [tempChats, setTempChats] = useState<chatType[]>([]);
    const [showSidebar, setShowSidebar] = useState<boolean>(false);
    const [chatForm, setChatForm] = useState<string>('');
    const { conversations } = useConversationsStore((state) => ({ conversations: state.conversations }));
    const [targetDetails, setTargetDetails] = useState<userType>(initialTargetDetails);
    const [isOnline, setIsOnline] = useState<boolean | undefined>();
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const chatBoxRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    };

    useConversationsStore.subscribe(() => scrollToBottom());

    useEffect(() => {
        if (activeTargetId && showConversation) {
            // TODO: Get target details
            const detail = useContactsStore.getState().findContact(activeTargetId)?.details;
            detail && setTargetDetails(detail);

            // TODO: Join presence channel
            window.Echo.join(`chat.${activeTargetId}`)
                .here((users: userType[]) => {
                    setIsOnline(users.length > 1 ? true : false);
                })
                .joining(() => {
                    !isOnline && setIsOnline(true);
                })
                .leaving(() => {
                    isOnline && setIsOnline(false);
                })
                .listenForWhisper('typing', () => {
                    !isTyping && setIsTyping(true);
                });
        }

        return () => {
            setIsOnline(false);
            setIsTyping(false);
            setTargetDetails(initialTargetDetails);
            setTempChats([]);
            setShowSidebar(false);
        };
    }, [showConversation]);

    // TODO: User typing
    useEffect(() => {
        const setIsTypingTimeOut = setTimeout(() => {
            isTyping && setIsTyping(false);
        }, 2000);

        return () => {
            clearTimeout(setIsTypingTimeOut);
        };
    }, [isTyping]);

    const onTypingFormHandler = (event: any) => {
        setChatForm(event.target.value);
        window.Echo.join(`chat.${useUserStore.getState().user.id}`).whisper('typing', null);
    };

    const onSubmitChatFormHandler = async (event: any) => {
        event.preventDefault();
        if (chatForm.length === 0) return;
        if (!activeTargetId) return;
        const currentChatForm = chatForm;
        setChatForm('');

        const newChat: chatType = {
            id: '0',
            sender_id: useUserStore.getState().user.id,
            message: currentChatForm,
            conversation_id: '0',
            sent_at: new Date().getTime(),
            is_seen: 0,
        };

        const currentTempChats = tempChats;
        if (!activeConversationId) {
            setTempChats([...currentTempChats, newChat]);
        }

        try {
            const response = await postConversationChat(
                {
                    message: chatForm,
                    receiver_id: activeTargetId,
                },
                activeConversationId
            );

            // * If user first time chat to related user
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
                                user_id: useUserStore.getState().user.id,
                            },
                        ],
                        chats: [response.data.data],
                    },
                ];
                useConversationsStore.setState({ conversations });
                useAppStore.setState({ activeConversationId: response.data.data.conversation_id });
            } else {
                // * User have chatted with related users
                useConversationsStore.getState().addChatToExistConversation(activeConversationId, newChat);
            }
        } catch (error: any) {
            alert('Failed to send message');
            setChatForm(currentChatForm);
        } finally {
            setTempChats(currentTempChats);
        }
    };

    const toggleSidebarHandler = () => {
        useAppStore.setState({
            activeConversationId: null,
            activeTargetId: null,
            showConversation: false,
        });
    };

    if (activeConversationType === 'PRIVATE') {
        return (
            <div
                className={`absolute top-0 left-0 z-10 flex w-full h-full conversation lg:relative bg-background min-w-[380px] ${
                    !showConversation && 'top-full'
                }`}
            >
                <div className='w-full'>
                    <ConversationHeader
                        toggleConversation={() => toggleSidebarHandler()}
                        name={targetDetails?.name}
                        status={isTyping ? 'Typing...' : isOnline ? 'Online' : 'Offline'}
                        showSidebarHandler={() => setShowSidebar(true)}
                        profilePicturePath={targetDetails.avatar}
                    />
                    <div
                        className='flex flex-col h-full px-5 pt-3 overflow-y-scroll border-r pb-52 border-r-black/10 gap-y-5'
                        ref={chatBoxRef}
                    >
                        {activeConversationId &&
                            [...conversations[activeConversationId][0].chats, ...tempChats].map((chat, index) => {
                                let detail: contactType | userType | undefined =
                                    chat.sender_id === useUserStore.getState().user.id
                                        ? useUserStore.getState().user
                                        : targetDetails;

                                return (
                                    <ConversationCard
                                        name={
                                            chat.sender_id === useUserStore.getState().user.id
                                                ? 'You'
                                                : targetDetails.name
                                        }
                                        avatar={detail.avatar}
                                        message={chat.message}
                                        position={chat.sender_id === useUserStore.getState().user.id ? 'RIGHT' : 'LEFT'}
                                        time={chat.sent_at}
                                        key={index}
                                        is_seen={
                                            chat.sender_id === useUserStore.getState().user.id
                                                ? chat.is_seen
                                                : undefined
                                        }
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

                <PrivateSidebar
                    toggleSidebar={() => toggleSidebarHandler()}
                    show={showSidebar}
                    data={{
                        name: targetDetails.name,
                        id: targetDetails.id,
                        description: targetDetails.description,
                        email: targetDetails.email,
                        joined_at: targetDetails.joined_at,
                        status: targetDetails.status,
                        avatar: targetDetails.avatar,
                        is_online: 0,
                        last_seen: 0,
                    }}
                />
            </div>
        );
    }
};

export default PrivateConversation;
