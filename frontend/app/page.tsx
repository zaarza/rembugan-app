'use client';

import Menu from '@/features/main/ui/Menu';
import Conversation from '@/features/main/ui/Conversation';
import Navbar from '@/features/main/ui/Navbar';
import Authenticated from '@/features/main/wrapper/Authenticated';
import { useEffect } from 'react';
import useContactsStore from '@/store/contacts.store';
import useMessagesStore from '@/store/conversations.store';
import useUserStore from '@/store/user.store';
import Echo from 'laravel-echo';
import axios from 'axios';
import useConversationStore from '@/store/conversations.store';
import pusherJs from 'pusher-js';
import useInboxesStore from '@/store/inboxes.store';
import chatType from '@/type/chatType';
import useAppStore from '@/store/app.store';

declare global {
    interface Window {
        Pusher: any;
        Echo: Echo;
    }
}

const MainLayout = ({ children }: any) => {
    return (
        <div className='relative h-screen max-w-screen-2xl mx-auto flex overflow-hidden min-w-[350px]'>{children}</div>
    );
};

const Main = () => {
    const { fetchContacts } = useContactsStore((state) => ({ fetchContacts: state.fetchContacts }));
    const { fetchUser, user } = useUserStore((state) => ({ fetchUser: state.fetchUser, user: state.user }));
    const { fetchConversations } = useMessagesStore((state) => ({ fetchConversations: state.fetchConversations }));
    const audio = new Audio('/assets/audio/pop.mp3');
    const Pusher = pusherJs;

    useEffect(() => {
        fetchUser();
        fetchContacts();
        fetchConversations();
    }, []);

    useEffect(() => {
        if (window.Echo === undefined) {
            window.Echo = new Echo({
                broadcaster: 'pusher',
                key: 'rembugan',
                wsHost: process.env.NEXT_PUBLIC_BACKEND_URL,
                wsPort: 6001,
                enabledTransports: ['ws'],
                forceTLS: false,
                cluster: 'mt1',
                authorizer: (channel: any, options: any) => {
                    return {
                        authorize: (socketId: any, callback: any) => {
                            axios
                                .post(
                                    `${process.env.NEXT_PUBLIC_API_URL}/broadcasting/auth`,
                                    {
                                        socket_id: socketId,
                                        channel_name: channel.name,
                                    },
                                    {
                                        withCredentials: true,
                                        headers: {
                                            Accept: 'application/json',
                                        },
                                    }
                                )
                                .then((response) => {
                                    callback(null, response.data);
                                })
                                .catch((error) => {
                                    console.log('unauthorized');
                                    callback(error);
                                });
                        },
                    };
                },
            });
        }

        if (user.id.length > 0) {
            window.Echo.join(`chat.${user.id}`)
            .listen('.PrivateMessageSent', (event: chatType[]) => {
                audio.play();
                console.log('ok');
                const conversations = useConversationStore.getState().conversations;

                event.forEach((chatItem) => {
                    if (useAppStore.getState().activeTargetId === chatItem.sender_id) {
                        useAppStore.setState({ activeConversationId: chatItem.conversation_id });
                    }

                    if (conversations[chatItem.conversation_id] !== undefined) {
                        conversations[event[0].conversation_id][0].chats.push(...event);
                    } else {
                        conversations[chatItem.conversation_id] = [
                            {
                                participants: [
                                    {
                                        id: '1',
                                        user_id: chatItem.sender_id,
                                        conversation_id: chatItem.conversation_id,
                                    },
                                    {
                                        id: '2',
                                        user_id: user.id,
                                        conversation_id: chatItem.conversation_id,
                                    },
                                ],
                                chats: [chatItem],
                            },
                        ];
                    }
                });

                useConversationStore.setState({ conversations });
            })

            window.Echo.channel(user.id)
                .listen('.InboxSent', (event: any) => {
                    audio.play();
                    useInboxesStore.setState((store) => ({ inboxes: [...store.inboxes, ...event] }));
                })
                .listen('.FriendRequestAccepted', (event: any) => {
                    audio.play();
                    useContactsStore.setState((store) => ({ contacts: [...store.contacts, ...event] }));
                })
                .listen('.ContactDeleted', (event: { conversation_id: string | null, contact_id: string }) => {

                    useContactsStore.setState((store) => ({
                        contacts: [...store.contacts.filter((contact) => contact.user_id !== event.contact_id)],
                    }));

                    if (useAppStore.getState().activeConversationId === event.conversation_id || useAppStore.getState().activeTargetId === event.contact_id) {
                        useAppStore.getState().reset()
                    }

                    if (event.conversation_id) {
                        const conversations = useConversationStore.getState().conversations;
                        if (conversations[event.conversation_id] !== undefined) {
                            delete conversations[event.conversation_id];
                            useConversationStore.setState({ conversations });
                        }
                    }
                });
        }

        return () => {
            window.Echo.leaveAllChannels();
        };
    }, [user]);

    return (
        <Authenticated>
            <MainLayout>
                <Navbar />
                <Menu />
                <Conversation />
            </MainLayout>
        </Authenticated>
    );
};

export default Main;
