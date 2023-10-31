'use client';
import Link from 'next/link';
import AuthTitle from '@/src/components/AuthTitle';
import Input from '@/features/auth/ui/Input';
import SubmitButton from '@/features/auth/ui/SubmitButton';

type TRegisterForm = {
    formHandler: any;
};

const RegisterForm = (props: TRegisterForm) => {
    const { formHandler } = props;

    return (
        <form
            className='flex flex-col gap-y-12 px-8 py-12 lg:px-12 justify-center'
            onSubmit={formHandler.handleSubmit}
        >
            <AuthTitle
                title='Welcome to Rembugan App!'
                subtitle='Create a new account and get started'
            />
            <div className='flex flex-col gap-y-5'>
                <Input
                    name='name'
                    type='text'
                    label='Name'
                    placeholder='Name'
                    disabled={formHandler.isSubmitting}
                    formikObject={formHandler}
                />
                <Input
                    name='email'
                    type='text'
                    label='Email address'
                    placeholder='Email address'
                    disabled={formHandler.isSubmitting}
                    formikObject={formHandler}
                />
                <Input
                    name='password'
                    type='password'
                    label='Password'
                    placeholder='Password'
                    disabled={formHandler.isSubmitting}
                    formikObject={formHandler}
                />
            </div>

            <SubmitButton
                displayText='Register'
                disabled={formHandler.isSubmitting}
            />

            <small className='self-center text-base'>
                Already have an account?{' '}
                <Link
                    className='text-primary'
                    href='/login'
                >
                    Login
                </Link>
            </small>
        </form>
    );
};

export default RegisterForm;
