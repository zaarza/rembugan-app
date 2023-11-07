import React from 'react';
import useLoginForm from '@/src/hooks/useLoginForm';
import LoginForm from '@/src/components/LoginForm';

const ConnectedLoginForm = () => {
    const formHandler = useLoginForm();

    return <LoginForm formHandler={formHandler} />;
};

export default ConnectedLoginForm;
