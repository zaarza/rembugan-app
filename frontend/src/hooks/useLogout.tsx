'use client';
import { useEffect } from 'react';
import deleteCookieByKey from '../utils/deleteCookieByKey';
import { useRouter } from 'next/navigation';

const useLogout = () => {
    const router = useRouter();

    useEffect(() => {
        deleteCookieByKey('XSRF-TOKEN');
        router.push('/login');
    }, []);
};

export default useLogout;
