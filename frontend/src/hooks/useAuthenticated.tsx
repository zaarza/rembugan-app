'use client';
import { useEffect, useState } from 'react';
import getCookieByKey from '@/src/utils/getCookieByKey';

const useAuthenticated = (key: string) => {
    const [isCookieExist, setIsCookieExist] = useState<boolean>(false);

    useEffect(() => {
        const cookie = getCookieByKey(key);
        cookie !== undefined && setIsCookieExist(true);
    }, []);

    return { isCookieExist };
};

export default useAuthenticated;
