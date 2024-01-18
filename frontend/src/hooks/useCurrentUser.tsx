'use client';
import useSWR from 'swr';
import { getCurrentUserDetails } from '@/src/data/fetcher';
import logOut from '@/src/utils/logOut';

const useCurrentUser = () => {
    const { data, isLoading, error, mutate } = useSWR('current-user', getCurrentUserDetails, {
        revalidateOnFocus: false,
        shouldRetryOnError: true,
        errorRetryCount: 3,
    });

    if (error && error.response?.status !== undefined) {
        switch (error.response.status) {
            case 401:
                logOut();
                break;
            default:
                break;
        }
    }

    return {
        data,
        isLoading,
        error,
        mutate,
    };
};

export default useCurrentUser;
