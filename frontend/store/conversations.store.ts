import { getConversations } from '@/features/auth/data/api';
import chatType from '@/type/chatType';
import { create } from 'zustand';
import { produce } from 'immer';

type conversationType = {
    participants: {
        id?: string;
        user_id: string;
        conversation_id: string;
    }[];
    chats: chatType[];
};
type useConversationStoreType = {
    conversations: {
        [key: string]: [conversationType];
    };
    loadingConversations: boolean;
    fetchConversations: () => Promise<void>;
    deletePersonConversation: (conversationId: string) => void;
    addChatToExistConversation: (conversationId: string, chat: chatType) => void;
    addConversation: (conversationId: string, conversation: conversationType) => void;
};

const useConversationStore = create<useConversationStoreType>((set, get) => ({
    conversations: {},
    addConversation: (conversationId, conversation) => {
        const currentConversation = get().conversations;
        currentConversation[conversationId][0] = conversation;
        set({ conversations: currentConversation });
    },
    deletePersonConversation: (conversationId) => {
        const filtered = get().conversations;
        delete filtered[conversationId];
        set({ conversations: filtered });
    },
    addChatToExistConversation: (conversationId, chat) =>
        set(
            produce((state) => {
                state.conversations[conversationId][0].chats = [...state.conversations[conversationId][0].chats, chat];
            })
        ),
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
