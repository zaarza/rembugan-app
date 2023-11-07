import { useEffect, useState } from 'react';
import checkAuth from '../utils/checkAuth';
import { useRouter } from 'next/navigation';

const Guest = ({ children }: any) => {
    const [guest, setGuest] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        checkAuth().then((result) => {
            if (result === true) {
                router.push('/');
            } else {
                setGuest(!result);
            }
        });
    }, []);

    if (guest === true) {
        return children;
    }
};

export default Guest;
