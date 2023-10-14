'use client';
import Carousel from "@/features/auth/ui/Carousel";
import Guest from '@/features/auth/wrapper/Guest';

const AuthLayout = ({ children }: any) => {
    return (
        <Guest>
            <div className="flex flex-col lg:flex-row w-full lg:min-h-screen">
                <Carousel />
                {children}
            </div>
        </Guest>
    )
};

export default AuthLayout;
