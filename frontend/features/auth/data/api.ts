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

export const getInboxes = async (page: number = 1) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/inbox?page=${page}`);
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

export const getCurrentUserContacts = async (query: string = "") => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/contacts?name=${query}`);
    return response;
}

export const getConversations = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/conversations`);
    return response;
}

export const postConversationChat = async (data: { message: string, receiver_id?: string }, conversationId?: string ) => {
    if (conversationId) {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/conversations/${conversationId}`, data);
        return response;
    } else {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/conversations`, data);
        return response;
    }
};

export const deleteContactById = async (id: string, conversationId?: string | null) => {
    const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/contacts/${id}?conversation_id=${conversationId ? conversationId : ""}`);
    return response;
}