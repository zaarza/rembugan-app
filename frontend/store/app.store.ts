import { create } from 'zustand';
import confirmRequestType from '@/features/main/type/confirmRequest';
import menuType from '@/type/menu';

type useAppStoreType = {
    activeMenu: menuType,
    setActiveMenu: (activeMenu: menuType) => void;
    inbox: confirmRequestType[];
    setInbox: (inboxItem: confirmRequestType) => void;
    activeConversationType: 'PRIVATE' | 'GROUPS';
    setActiveConversationType: (
        activeConversationType: 'PRIVATE' | 'GROUPS'
    ) => void;
    activeConversationId: string | null;
    setActiveConversationId: (activeConversationId: string | null) => void;
    showConversation: boolean,
    setShowConversation: (showConversation: boolean) => void,
};

const useAppStore = create<useAppStoreType>((set) => ({
    activeMenu: "PRIVATE",
    setActiveMenu: (activeMenu) => set({ activeMenu }),
    activeConversationId: null,
    setActiveConversationId: (activeConversationId) => set({activeConversationId}),
    activeConversationType: 'PRIVATE',
    setActiveConversationType: (activeConversationType) => set({ activeConversationType }),
    showConversation: false,
    setShowConversation: (showConversation) => set({showConversation}),

    inbox: [],
    setInbox: (inbox) => set((store) => ({ inbox: [...store.inbox, inbox] })),
}));

export default useAppStore;
