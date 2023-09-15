import AuthCarousel from "@/components/Fragments/AuthCarousel";

type AuthLayoutProps = {
    children: any;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <div className="flex flex-col lg:flex-row w-full lg:min-h-screen">
            <AuthCarousel />
            {children}
        </div>
    );
};

export default AuthLayout;
