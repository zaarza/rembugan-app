import { getInboxes } from '@/features/auth/data/api';
import inboxType from '@/type/inboxType';
import { create } from 'zustand';

type useInboxesStoreType = {
    inboxes: inboxType[];
    setInboxes: (inboxes: inboxType[]) => void;
    storeInbox: (inbox: inboxType) => void;
    deleteInbox: (inboxId: string) => void;
    markSeenInboxes: () => void;
};

const useInboxesStore = create<useInboxesStoreType>((set) => ({
    inboxes: [],
    setInboxes: (inboxes) => set({inboxes}),
    storeInbox: (inbox) => set((store) => ({ inboxes: [...store.inboxes, inbox] })),
    markSeenInboxes: () => set((store) => ({ inboxes: store.inboxes.map((inboxItem) => ({...inboxItem, is_seen: 1}))})),
    deleteInbox: (inboxId) => set((store) => ({ inboxes: store.inboxes.filter((inboxItem) => (inboxItem.id !== inboxId))})),
}));

export default useInboxesStore;
