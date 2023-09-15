import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";

import AuthTitle from "@/components/Elements/AuthTitle";
import InputGroup from "@/components/Elements/InputGroup";
import Button from "@/components/Elements/Button";

type FormInitialValues = {
    name: string;
    email: string;
    password: string;
};

const RegisterForm = () => {
    const form = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required(),
            email: Yup.string().required(),
            password: Yup.string().required(),
        }),
        onSubmit: (values) => submit(values),
    });

    const submit = (values: FormInitialValues) => {
        //  TODO: api integration
        //  TODO: set errors message from response if any
        //  TODO: redirect to login page if success register
        setTimeout(() => {
            form.setSubmitting(false);
        }, 2000);
    };

    return (
        <form className="credentials overflow-auto lg:max-h-screen flex flex-col gap-y-12 px-8 py-12 lg:w-full lg:max-w-[40%] lg:px-12" onSubmit={form.handleSubmit}>
            <AuthTitle subtitle="Create an account and get started!" />

            <div className="flex flex-col gap-y-5">
                <InputGroup name="name" type="text" formikObject={form} />
                <InputGroup name="email" type="text" formikObject={form} />
                <InputGroup name="password" type="text" formikObject={form} />
            </div>

            <Button displayText="Register" variant="PRIMARY" disabled={form.isSubmitting} type="submit" />
            <div className="self-center"><small className="text-base">Already have an account?{" "}<Link className="text-primary" href="/login">Login</Link></small></div>
        </form>
    );
};

export default RegisterForm;
