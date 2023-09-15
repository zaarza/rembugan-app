import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";

import InputGroup from "@/components/Elements/InputGroup";
import Button from "@/components/Elements/Button";
import AuthTitle from "@/components/Elements/AuthTitle";

type FormInitialValues = {
    email: string;
    password: string;
};

const LoginForm = () => {
    const form = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().required(),
            password: Yup.string().required(),
        }),
        onSubmit: (values) => submit(values),
    });

    const submit = (values: FormInitialValues) => {
        //  TODO: API Intregation
        //  TODO: Set formik errors if exist
        //  TODO: Redirect to main page

        setTimeout(() => {
            form.setSubmitting(false);
        }, 2000);
    };

    return (
        <form className="credentials flex flex-col gap-y-12 px-8 py-12 lg:w-full lg:max-w-[40%] lg:px-12 justify-center" onSubmit={form.handleSubmit}>
            <AuthTitle subtitle="Login into your account" />

            <div className="flex flex-col gap-y-5">
                <InputGroup name="email" type="text" formikObject={form} />
                <InputGroup name="password" type="password" formikObject={form} />
            </div>

            <Button displayText="Login" type="submit" variant="PRIMARY" disabled={form.isSubmitting} />
            <small className="self-center text-base">Doesn't have an account?{" "}<Link className="text-primary" href="/register">Register</Link></small>
        </form>
    );
};

export default LoginForm;
