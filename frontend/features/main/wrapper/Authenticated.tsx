'use client';
import { useEffect, useState } from 'react';
import checkAuth from '@/features/main/utils/checkAuth';
import { useRouter } from 'next/navigation';
import useUserStore from '@/store/user.store';

const Authenticated = ({ children }: any) => {
    const { isLoggedIn, logIn, logOut } = useUserStore((state) => ({
        isLoggedIn: state.isLoggedIn,
        logIn: state.logIn,
        logOut: state.logOut,
    }));
    const router = useRouter();

    useEffect(() => {
        checkAuth().then((result) => {
            if (result === false) {
                logOut(false);
                router.push('/login');
            } else {
                logIn();  
            }
        });
    }, [isLoggedIn]);

    if (isLoggedIn) {
        return children;
    }
};

export default Authenticated;
