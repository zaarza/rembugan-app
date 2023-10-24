import { create } from 'zustand';
import { getCurrentUserDetails } from '@/features/auth/data/api';
import deleteAuthToken from '@/features/main/utils/deleteAuthToken';
import userType from '@/type/userType';

type useUserStoreType = {
    user: userType;
    fetchUser: () => Promise<void>;
    setUser: (data: userType) => void;
    isLoggedIn: boolean;
    logOut: (showConfirm?: boolean) => void;
    logIn: () => void;
};

const useUserStore = create<useUserStoreType>((set) => ({
    user: {
        id: '',
        name: '',
        email: '',
        description: '',
        status: '',
        avatar: '',
        is_online: 0,
        last_seen: 0,
        joined_at: 0,
    },
    isLoggedIn: false,
    fetchUser: async () => {
        try {
            const response = await getCurrentUserDetails();
            set({ user: { ...response.data.data } });
        } catch (error) {
            return;
        }
    },
    setUser: (data) => set((store) => ({ user: { ...store.user, ...data } })),
    logOut: (showConfirm = true) => {
        if (showConfirm && !confirm('Logout?')) {
            return;
        }
        deleteAuthToken();
        set({ isLoggedIn: false });
    },
    logIn: () => set({ isLoggedIn: true }),
}));

export default useUserStore;
