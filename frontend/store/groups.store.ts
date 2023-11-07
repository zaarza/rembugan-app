import { getAllGroups } from '@/features/auth/data/api';
import groupType from '@/type/groupType';
import { create } from 'zustand';
import { produce } from 'immer';
import groupChatType from '@/type/groupChatType';
import { subscribeWithSelector } from 'zustand/middleware';

type useGroupsStoreType = {
    groups: {
        [key: string]: [groupType];
    };
    fetchGroups: () => Promise<void>;
    addGroupMessage: (groupId: string, message: groupChatType) => void;
    updateGroupDetails: (
        groupId: string,
        data: { name?: string; description?: string | null; avatar?: string | null }
    ) => void;
    addGroup: (group: groupType) => void;
    isAdmin: (userId: string, groupId: string | null) => boolean;
    removeMember: (groupId: string, userId: string) => void;
    setMemberAsAdmin: (groupId: string | null, userId: string) => void;
    deleteAdmin: (groupId: string | null, userId: string) => void;
};

const useGroupsStore = create<useGroupsStoreType>((set, get) => ({
    groups: {},
    isAdmin: (userId, groupId) => {
        if (!groupId) return false;
        const group = get().groups[groupId];
        if (!group) return false;

        const isAdmin = group[0].members.find((member) => member.is_admin === 1 && member.user_id === userId);
        return isAdmin !== undefined ? true : false;
    },
    removeMember: (groupId, userId) =>
        set(
            produce((state: useGroupsStoreType) => {
                state.groups[groupId][0].members = state.groups[groupId][0].members.filter(
                    (member) => member.user_id !== userId
                );
            })
        ),
    addGroup: (group) => {
        set(
            produce((state) => {
                state.groups = { ...state.groups, [group.id]: [group] };
            })
        );
    },
    updateGroupDetails: (groupId, data) =>
        set(
            produce((state) => {
                state.groups[groupId][0] = { ...state.groups[groupId][0], ...data };
            })
        ),
    fetchGroups: async () => {
        try {
            const response = await getAllGroups();
            set({ groups: response.data.data });
        } catch (error: any) {
            return;
        }
    },
    addGroupMessage: (groupId, message) => {
        const currentGroups = get().groups;
        currentGroups[groupId][0].messages.push(message);
        set({ groups: currentGroups });
    },
    setMemberAsAdmin: (groupId, userId) => {
        if (!groupId) return;
        const members = get().groups[groupId][0].members;
        const index = members.findIndex((member) => member.user_id === userId);
        if (index === -1) return;

        set(
            produce((store: useGroupsStoreType) => {
                store.groups[groupId][0].members[index] = { ...store.groups[groupId][0].members[index], is_admin: 1 };
            })
        );
    },
    deleteAdmin: (groupId, userId) => {
        if (!groupId) return;
        const members = get().groups[groupId][0].members;
        const index = members.findIndex((member) => member.user_id === userId);
        if (index === -1) return;

        set(
            produce((store: useGroupsStoreType) => {
                store.groups[groupId][0].members[index] = { ...store.groups[groupId][0].members[index], is_admin: 0 };
            })
        );
    },
}));

export default useGroupsStore;
