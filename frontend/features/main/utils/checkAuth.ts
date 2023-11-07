import { validateToken } from '@/features/auth/data/api';

/**
 * Validate user authentication.
 */
const checkAuth: () => Promise<boolean> = async () => {
    // Get value from cookie storage named XSRF-TOKEN
    const cookie: string | undefined = document.cookie
        .split('; ')
        .find((row) => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];

    // TODO: Validate cookie token
    if (cookie) {
        try {
            const result = await validateToken();

            // * Token valid
            if (result.status === 200) {
                return true;
            } else {
                throw new Error();
            }
        } catch (error) {
            // Remove XSRF-TOKEN cookie from storage
            document.cookie =
                'XSRF-TOKEN=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
            return false;
        }
    } else {
        return false;
    }
};

export default checkAuth;
