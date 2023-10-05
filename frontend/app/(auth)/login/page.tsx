"use client";

import Link from "next/link";

import useLoginForm from "@/features/auth/hooks/useLoginForm";
import Title from "@/features/auth/ui/Title";
import Input from "@/features/auth/ui/Input";
import SubmitButton from "@/features/auth/ui/SubmitButton";

const Login = () => {
    const form = useLoginForm();

    return (
        <form className="credentials flex flex-col gap-y-12 px-8 py-12 lg:w-full lg:max-w-[40%] lg:px-12 justify-center" onSubmit={form.handleSubmit}>
            <Title subtitle="Login into your account" />

            <div className="flex flex-col gap-y-5">
                <Input name="email" type="text" label="Email address" placeholder="Email address" disabled={form.isSubmitting} formikObject={form} />
                <Input name="password" type="password" label="Password" placeholder="Password" disabled={form.isSubmitting} formikObject={form} />
            </div>

            <SubmitButton displayText="Login" disabled={form.isSubmitting} />

            <small className="self-center text-base">
                {"Doesn't"} have an account?{" "}
                <Link className="text-primary" href="/register">
                    Register
                </Link>
            </small>
        </form>
    );
};

export default Login;
