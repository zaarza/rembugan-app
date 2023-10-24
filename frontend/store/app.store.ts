import { create } from 'zustand';
import confirmRequestType from '@/features/main/type/confirmRequest';
import menuType from '@/type/menu';

type useAppStoreType = {
    activeMenu: menuType;
    setActiveMenu: (activeMenu: menuType) => void;
    inbox: confirmRequestType[];
    setInbox: (inboxItem: confirmRequestType) => void;
    activeConversationType: 'PRIVATE' | 'GROUP';
    setActiveConversationType: (activeConversationType: 'PRIVATE' | 'GROUP') => void;
    activeTargetId: string | null;
    setActiveTargetId: (id: string | null) => void;
    activeConversationId?: string | null;
    setActiveConversationId: (activeConversationId: string | null | undefined) => void;
    showConversation: boolean;
    setShowConversation: (showConversation: boolean) => void;
    initialLoading: boolean;
    setInitialLoading: (initialLoad: any) => void;
    reset: () => void;
};

const useAppStore = create<useAppStoreType>((set) => ({
    activeMenu: 'PRIVATE',
    setActiveMenu: (activeMenu) => set({ activeMenu }),
    activeConversationId: null,
    setActiveConversationId: (activeConversationId) => set({ activeConversationId }),
    activeConversationType: 'PRIVATE',
    setActiveConversationType: (activeConversationType) => set({ activeConversationType }),
    showConversation: false,
    setShowConversation: (showConversation) => set({ showConversation }),
    reset: () => set({ activeConversationId: null, showConversation: false, activeTargetId: null}),

    inbox: [],
    setInbox: (inbox) => set((store) => ({ inbox: [...store.inbox, inbox] })),

    initialLoading: true,
    setInitialLoading: (initialLoading) => set({ initialLoading }),

    activeTargetId: null,
    setActiveTargetId: (activeTargetId) => set({ activeTargetId }),
}));

export default useAppStore;
