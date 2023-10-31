'use client';
import Layout from '@/src/layouts/AuthLayout';

type TAuthLayout = {
    children: React.ReactNode;
};

const AuthLayout = (props: TAuthLayout) => {
    const { children } = props;
    return <Layout>{children}</Layout>;
};

export default AuthLayout;
