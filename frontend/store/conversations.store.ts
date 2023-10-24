import { getConversations } from '@/features/auth/data/api';
import chatType from '@/type/chatType';
import { create } from 'zustand';

type useConversationStoreType = {
    conversations: {
        [key: string]: [
            {
                participants: {
                    id?: string;
                    user_id: string;
                    conversation_id: string;
                }[];
                chats: chatType[];
            }
        ];
    };
    loadingConversations: boolean;
    fetchConversations: () => Promise<void>;
    deletePersonConversation: (conversationId: string) => void;
};

const useConversationStore = create<useConversationStoreType>((set, get) => ({
    conversations: {},
    deletePersonConversation: (conversationId) => {
        const filtered = get().conversations;
        delete filtered[conversationId];
        set({ conversations: filtered });
    },
    addChat: (conversationId: string, chat: chatType) => {
        const conversations = get().conversations;

        if (conversations[conversationId] !== undefined) {
            Array.isArray(chat) ? conversations[conversationId][0].chats.push(...chat) : conversations[conversationId][0].chats.push(chat);
        }
    },
    loadingConversations: true,
    fetchConversations: async () => {
        try {
            get().loadingConversations === false && set({ loadingConversations: true });
            const response = await getConversations();
            set({ conversations: response.data.data });
        } catch (error: any) {
            console.error(error.response.data);
        } finally {
            set({ loadingConversations: false });
        }
    },
}));

export default useConversationStore;
