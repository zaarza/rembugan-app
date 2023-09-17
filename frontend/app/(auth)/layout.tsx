import Carousel from "@/features/auth/ui/Carousel";

const AuthLayout = ({ children }: any) => {
    return (
        <div className="flex flex-col lg:flex-row w-full lg:min-h-screen">
            <Carousel />
            {children}
        </div>
    );
};

export default AuthLayout;
