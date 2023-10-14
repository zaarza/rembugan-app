import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.headers.common['accept'] = 'application/json';

export const getCsrfCookie = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`);
};

export const userRegister = async ({
    name,
    email,
    password,
}: {
    name: string;
    email: string;
    password: string;
}) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
        { name, email, password }
    );
    return response;
};

export const userLogin = async ({email, password}: {email: string, password: string}) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {email, password})
    return response;
};

export const validateToken = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/validate`);
    return response;
}