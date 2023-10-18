import { getCurrentUserContacts } from '@/features/auth/data/api';
import contactType from '@/type/contactType';
import { create } from 'zustand';

type useContactsStoreType = {
    contacts: contactType[];
    setContacts: (contacts: contactType[]) => void;
    fetch: (query?: string) => void;
};

const useContactsStore = create<useContactsStoreType>((set) => ({
    contacts: [],
    setContacts: (contacts) => set({ contacts }),
    fetch: async (query?: string) => {
        try {
            const response = await getCurrentUserContacts(query);
            set({ contacts: [...response.data.data] });
        } catch (error: any) {
            console.log('failed get contacts', error.response);
        }
    },
}));

export default useContactsStore;
