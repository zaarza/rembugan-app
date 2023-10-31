'use client';
import AuthTitle from '@/src/components/AuthTitle';
import AuthInput from '@/src/components/AuthInput';
import SubmitButton from '@/src/components/SubmitButton';
import Link from 'next/link';

type TLoginForm = {
    formHandler: any;
};

const LoginForm = (props: TLoginForm) => {
    const { formHandler } = props;

    return (
        <form
            className='flex flex-col gap-y-12 px-8 py-12 lg:px-12 justify-center'
            onSubmit={formHandler.handleSubmit}
        >
            <AuthTitle
                title='Welcome to Rembugan App!'
                subtitle='Login into your account'
            />

            <div className='flex flex-col gap-y-5'>
                <AuthInput
                    name='email'
                    type='text'
                    label='Email address'
                    placeholder='Email address'
                    disabled={formHandler.isSubmitting}
                    formHandler={formHandler}
                />
                <AuthInput
                    name='password'
                    type='password'
                    label='Password'
                    placeholder='Password'
                    disabled={formHandler.isSubmitting}
                    formHandler={formHandler}
                />
            </div>

            <SubmitButton
                displayText='Login'
                disabled={formHandler.isSubmitting}
            />

            <small className='self-center text-base'>
                {"Doesn't"} have an account?{' '}
                <Link
                    className='text-primary'
                    href='/register'
                >
                    Register
                </Link>
            </small>
        </form>
    );
};

export default LoginForm;
