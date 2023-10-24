import { getCurrentUserContacts, getUserDetailById } from '@/features/auth/data/api';
import contactType from '@/type/contactType';
import { create } from 'zustand';

type useContactsStoreType = {
    contacts: contactType[];
    loadingContacts: boolean;
    fetchContacts: (query?: string) => void;
    findContact: (userId: string) => contactType | undefined;
    addContact: (contact: contactType) => void;
    setContacts: (contacts: contactType[]) => void;
    deleteContact: (id: string) => void;
};

const useContactsStore = create<useContactsStoreType>((set, get) => ({
    contacts: [],
    loadingContacts: true,
    findContact: (userId) => get().contacts.find((contactItem) => contactItem.user_id === userId),
    addContact: (contact) => set((store) => ({ contacts: [...store.contacts, contact] })),
    setContacts: (contacts) => set({ contacts }),
    deleteContact: (id) =>
        set((store) => ({ contacts: store.contacts.filter((contactItem) => contactItem.details.id !== id) })),
    fetchContacts: async (query?: string) => {
        try {
            get().loadingContacts === false && set({ loadingContacts: true });
            const response = await getCurrentUserContacts(query);
            set({ contacts: [...response.data.data] });
        } catch (error: any) {
            console.error('Failed get contacts', error.response);
        } finally {
            set({ loadingContacts: false });
        }
    },
}));

export default useContactsStore;
