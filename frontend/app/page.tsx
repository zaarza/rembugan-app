import Menu from "@/features/main/ui/Menu";
import Conversation from "@/features/main/ui/Conversation";
import Navbar from "@/features/main/ui/Navbar";

const MainLayout = ({ children }: any) => {
    return <div className="relative h-screen max-w-screen-2xl mx-auto flex overflow-hidden">{children}</div>;
};

const Main = () => {
    return (
        <MainLayout>
            <Navbar />
            <Menu />
            <Conversation />
        </MainLayout>
    );
};

export default Main;
