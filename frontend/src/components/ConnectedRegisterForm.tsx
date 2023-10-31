'use client';
import useRegisterForm from '@/src/hooks/useRegisterForm';
import RegisterForm from '@/src/components/RegisterForm';

const ConnectedRegisterForm = () => {
    const formHandler = useRegisterForm();

    return <RegisterForm formHandler={formHandler} />;
};

export default ConnectedRegisterForm;
