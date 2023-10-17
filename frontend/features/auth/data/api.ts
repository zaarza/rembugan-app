import userType from '@/type/userType';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['accept'] = 'application/json';

export const getCsrfCookie = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`);
};

export const userRegister = async ({ name, email, password }: { name: string; email: string; password: string }) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, { name, email, password });
    return response;
};

export const userLogin = async ({ email, password }: { email: string; password: string }) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, { email, password });
    return response;
};

export const validateToken = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/validate`);
    return response;
};

export const getCurrentUserDetails = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/`);
    return response;
};

export const updateCurrentUserDetails = async ({ id, name, email, description, status, avatar }: userType) => {
    const response = await axios.post(
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
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/users/deleteAvatar`);
    return response;
};

export const postFriendRequest = async ({ id, currentUserId }: { id: string; currentUserId: string }) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/inbox`, {
        receiver_id: id,
        content: currentUserId,
        type: 'friend',
    });
    return response;
};

export const getInboxes = async (page: number = 1, show: string = 'all') => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/inbox?page=${page}&show=${show}`);
    return response;
};

export const getUserDetailById = async (id: string) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`);
    return response;
};

export const rejectFriendRequest = async (senderId: string) => {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/contacts/${senderId}/reject`);
    return response;
};

export const acceptFriendRequest = async (senderId: string) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/contacts/${senderId}/accept`);
    return response;
}

export const markInboxSeenMany = async (inboxes_id: string[]) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/inbox/markSeenMany`, {
        inboxes_id
    });
    return response;
}