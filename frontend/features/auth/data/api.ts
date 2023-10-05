import axios from 'axios';

axios.defaults.withCredentials = true;

export const getCsrfCookie = async () => {
  await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`
  );
};