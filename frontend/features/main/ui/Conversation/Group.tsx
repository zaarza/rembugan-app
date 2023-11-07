'use client';
import { useEffect, useRef, useState } from 'react';
import useAppStore from '@/store/app.store';
import ConversationCard from '@/features/main/ui/Conversation/Card';
import ConversationHeader from '@/features/main/ui/Conversation/Header';
import ConversationNull from '@/features/main/ui/Conversation/Null';
import useConversationsStore from '@/store/conversations.store';
import useUserStore from '@/store/user.store';
import useContactsStore from '@/store/contacts.store';
import contactType from '@/type/contactType';
import userType from '@/type/userType';
import { IconFillPaperPlane } from '@/shared/Icons';
import ButtonIcon from '../reusable/ButtonIcon';
import { postGroupMessage } from '@/features/auth/data/api';
import useGroupsStore from '@/store/groups.store';
import groupChatType from '@/type/groupChatType';
import groupType from '@/type/groupType';
import GroupSidebar from './GroupSidebar';

const initialTargetDetails: groupType = {
    id: '',
    avatar: null,
    created_at: 0,
    created_by: '',
    description: null,
    members: [],
    messages: [],
    name: '',
};

type chatType = {
    id?: string;
    conversation_id?: string;
    sender_id: string;
    message: string;
    sent_at: number;
    is_seen: 0 | 1;
};

const GroupConversation = () => {
    const { activeConversationType, showConversation, activeConversationId, activeTargetId } = useAppStore((state) => ({
        activeConversationType: state.activeConversationType,
        showConversation: state.showConversation,
        activeConversationId: state.activeConversationId,
        activeTargetId: state.activeTargetId,
    }));

    const [tempChats, setTempChats] = useState<groupChatType[]>([]);
    const [showSidebar, setShowSidebar] = useState<boolean>(false);
    const [chatForm, setChatForm] = useState<string>('');
    const chatBoxRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    };

    useGroupsStore.subscribe(() => scrollToBottom());

    useEffect(() => {
        if (activeTargetId && showConversation) {
            // TODO: Join presence channel
            window.Echo.join(`group.${activeTargetId}`).listen('.GroupMessageSent', (message: groupChatType) => {
                if (message.sender_id === useUserStore.getState().user.id) return;
                useGroupsStore.getState().addGroupMessage(activeTargetId, message);
            });
        }

        return () => {
            setTempChats([]);
        };
    }, [showConversation]);

    const onSubmitChatFormHandler = async (event: any) => {
        event.preventDefault();
        if (chatForm.length === 0) return;
        if (!activeTargetId) return;
        const currentChatForm = chatForm;
        const currentTempChats = tempChats;
        setChatForm('');

        const newChat: groupChatType = {
            content: currentChatForm,
            group_id: '',
            id: '',
            sender_id: useUserStore.getState().user.id,
            sent_at: new Date().getTime(),
        };

        setTempChats([...currentTempChats, newChat]);

        try {
            const response = await postGroupMessage(activeTargetId, currentChatForm);
            useGroupsStore.getState().addGroupMessage(activeTargetId, response.data.data);
        } catch (error: any) {
            alert('Failed to send message');
            setChatForm(currentChatForm);
        } finally {
            setTempChats(currentTempChats);
        }
    };

    const toggleSidebarHandler = () => {
        useAppStore.getState().reset();
        setShowSidebar(false);
    };

    if (activeTargetId) {
        return (
            <div
                className={`absolute top-0 left-0 z-10 flex w-full h-full conversation lg:relative bg-background min-w-[380px] ${
                    !showConversation && 'top-full'
                }`}
            >
                <div className='w-full'>
                    <ConversationHeader
                        toggleConversation={() => toggleSidebarHandler()}
                        name={useGroupsStore.getState().groups[activeTargetId][0].name}
                        status={`${useGroupsStore.getState().groups[activeTargetId][0].members.length} members`}
                        showSidebarHandler={() => setShowSidebar(true)}
                        profilePicturePath={useGroupsStore.getState().groups[activeTargetId][0].avatar}
                    />
                    <div
                        className='flex flex-col h-full px-5 pt-3 overflow-y-scroll border-r pb-52 border-r-black/10 gap-y-5'
                        ref={chatBoxRef}
                    >
                        {activeTargetId &&
                            [...useGroupsStore.getState().groups[activeTargetId][0].messages, ...tempChats].map(
                                (message, index) => {
                                    return (
                                        <ConversationCard
                                            name={
                                                message.sender_id === useUserStore.getState().user.id
                                                    ? 'You'
                                                    : message.sender_id
                                            }
                                            avatar={null}
                                            message={message.content}
                                            position={
                                                message.sender_id === useUserStore.getState().user.id ? 'RIGHT' : 'LEFT'
                                            }
                                            time={message.sent_at}
                                            key={index}
                                        />
                                    );
                                }
                            )}
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
                                onChange={(event) => setChatForm(event.target.value)}
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
                <GroupSidebar
                    toggleSidebar={() => setShowSidebar(!showSidebar)}
                    show={showSidebar}
                    data={{
                        avatar: null,
                        membership: useGroupsStore.getState().groups[activeTargetId][0].members.length,
                        name: useGroupsStore.getState().groups[activeTargetId][0].name,
                        id: useGroupsStore.getState().groups[activeTargetId][0].id,
                        description: useGroupsStore.getState().groups[activeTargetId][0].description,
                        createdAt: useGroupsStore.getState().groups[activeTargetId][0].created_at,
                        created_by: useGroupsStore.getState().groups[activeTargetId][0].created_by,
                    }}
                />
            </div>
        );
    }
};

export default GroupConversation;
