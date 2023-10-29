import groupType from '@/type/groupType';
import userType from '@/type/userType';
import axios from 'axios';
import useSWR from 'swr';

const Axios = axios.create({
    withCredentials: true,
    baseURL: process.env.NEXT_PUBLIC_API_URL,
});
Axios.defaults.headers.common['accept'] = 'appication/json';

export const getCsrfCookie = async () => {
    await Axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`);
};

export const userRegister = async ({ name, email, password }: { name: string; email: string; password: string }) => {
    const response = await Axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, { name, email, password });
    return response;
};

export const userLogin = async ({ email, password }: { email: string; password: string }) => {
    const response = await Axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, { email, password });
    return response;
};

export const validateToken = async () => {
    const response = await Axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/validate`);
    return response;
};

export const getCurrentUserDetails = async () => {
    const response = await Axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/`);
    return response;
};

export const updateCurrentUserDetails = async ({ id, name, email, description, status, avatar }: userType) => {
    const response = await Axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`,
        {
            id,
            name,
            email,
            description,
            status,
            avatar,
        },
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );
    return response;
};

export const deleteCurrentUserAvatar = async () => {
    const response = await Axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/users/deleteAvatar`);
    return response;
};

export const postFriendRequest = async ({ id, currentUserId }: { id: string; currentUserId: string }) => {
    const response = await Axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/inbox`, {
        receiver_id: id,
        content: currentUserId,
        type: 'friend',
    });
    return response;
};

export const getInboxes = async (page: number = 1) => {
    const response = await Axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/inbox?page=${page}`);
    return response;
};

export const getUserDetailById = async (id: string) => {
    const response = await Axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`);
    return response;
};

export const rejectFriendRequest = async (senderId: string) => {
    const response = await Axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/contacts/${senderId}/reject`);
    return response;
};

export const acceptFriendRequest = async (senderId: string) => {
    const response = await Axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/contacts/${senderId}/accept`);
    return response;
};

export const getCurrentUserContacts = async (query: string = '') => {
    const response = await Axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/contacts?name=${query}`);
    return response;
};

export const getConversations = async () => {
    const response = await Axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/conversations`);
    return response;
};

export const postConversationChat = async (
    data: { message: string; receiver_id?: string },
    conversationId: string | null
) => {
    if (conversationId) {
        const response = await Axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/conversations/${conversationId}`,
            data
        );
        return response;
    } else {
        const response = await Axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/conversations`, data);
        return response;
    }
};

export const deleteContactById = async (id: string, conversationId?: string | null) => {
    const response = await Axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/contacts/${id}?conversation_id=${conversationId ? conversationId : ''}`
    );
    return response;
};

export const getAllGroups = async () => {
    const response = await Axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/groups`);
    return response;
};

export const createNewGroup = async ({ name, description }: { name: string; description?: string }) => {
    const response = await Axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/groups`, { name, description });
    return response;
};

export const postGroupMessage = async (groupId: string, message: string) => {
    const response = await Axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/groupMessages/${groupId}`, { message });
    return response;
};

export const postGroupInvitation = async (groupId: string, users_id: string[]) => {
    const response = await Axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/groups/${groupId}/invite`, { users_id });
    return response;
};

export const useUser = (userId: string) => {
    const fetcher = (userId: string): Promise<{ data: userType }> =>
        Axios.get(`${Axios.defaults.baseURL}/api/users/${userId}`).then((result) => result.data);
    const { data, isLoading, error } = useSWR(userId, fetcher, { revalidateIfStale: false });

    return {
        data,
        isLoading,
        error,
    };
};

export const getGroupDetails = async (groupId: string) => {
    const response = await Axios.get(`${Axios.defaults.baseURL}/api/groups/${groupId}`);
    return response;
};
export const useGroup = (groupId: string) => {
    const fetcher = (groupId: string): Promise<groupType> =>
        Axios.get(`${Axios.defaults.baseURL}/api/groups/${groupId}`).then((result) => result.data.data);
    const { data, isLoading, error, mutate } = useSWR(groupId, fetcher, { revalidateIfStale: false });

    return {
        data,
        isLoading,
        error,
        mutate,
    };
};

export const updateGroupDetails = async (
    groupId: string,
    data: { name?: string; description?: string; avatar?: string }
) => {
    const response = await Axios.post(`${Axios.defaults.baseURL}/api/groups/${groupId}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response;
};

export const deleteGroupAvatar = async (groupId: string) => {
    const response = await Axios.delete(`${Axios.defaults.baseURL}/api/groups/${groupId}/deleteAvatar`);
    return response;
};

export const leaveGroup = async (groupId: string) => {
    const response = await Axios.delete(`${Axios.defaults.baseURL}/api/groups/${groupId}/leave`);
    return response;
};

export const acceptGroupInvitation = async (inboxId: string) => {
    const response = await Axios.post(`${Axios.defaults.baseURL}/api/groups/${inboxId}/acceptInvite`);
    return response;
};

export const rejectGroupInvitation = async (inboxId: string) => {
    const response = await Axios.post(`${Axios.defaults.baseURL}/api/groups/${inboxId}/rejectInvite`);
    return response;
};

export const kickMemberFromGroup = async (groupId: string, userId: string) => {
    const response = await Axios.delete(`${Axios.defaults.baseURL}/api/groupMembers/${groupId}/${userId}/kick`);
    return response;
};

export const setMemberAsAnAdmin = async (groupId: string | null, userId: string) => {
    if (!groupId) return;
    const response = await Axios.post(`${Axios.defaults.baseURL}/api/groupMembers/${groupId}/${userId}/setAdmin`);
    return response;
};
