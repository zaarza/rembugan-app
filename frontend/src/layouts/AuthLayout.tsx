'use client';
import AuthCarousel from '@/src/components/AuthCarousel';
import useAuthenticated from '@/src/hooks/useAuthenticated';

type TAuthLayout = {
    children: React.ReactNode;
};

const AuthLayout = (props: TAuthLayout) => {
    const { children } = props;
    const { isCookieExist } = useAuthenticated('XSRF-TOKEN');

    if (!isCookieExist) {
        return (
            <div className='flex flex-col lg:flex-row lg:max-h-screen overflow-y-hidden'>
                <div className='lg:w-[60%] lg:order-1'>
                    <AuthCarousel />
                </div>
                <div className='max-h-screen overflow-y-scroll'>{children}</div>
            </div>
        );
    } else {
        window.location.replace(`http://${window.location.host}`);
    }
};

export default AuthLayout;
