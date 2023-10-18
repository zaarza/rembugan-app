import Menu from '@/features/main/ui/Menu';
import Conversation from '@/features/main/ui/Conversation';
import Navbar from '@/features/main/ui/Navbar';
import Authenticated from '@/features/main/wrapper/Authenticated';
import { useEffect } from 'react';

const MainLayout = ({ children }: any) => {
    return (
        <div className='relative h-screen max-w-screen-2xl mx-auto flex overflow-hidden min-w-[350px]'>
            {children}
        </div>
    );
};

const Main = () => {
    return (
        <Authenticated>
            <MainLayout>
                <Navbar />
                <Menu />
                <Conversation />
            </MainLayout>
        </Authenticated>
    );
};

export default Main;
