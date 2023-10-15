import { useFormik } from 'formik'
import * as Yup from "yup";
import { getCsrfCookie, userLogin, validateToken } from '../data/api';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type FormInitialValues = {
    email: string;
    password: string;
};

const useLoginForm = () => {
    const router = useRouter();

    const form = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Email required'),
            password: Yup.string().required('Password required'),
        }),
        onSubmit: (values) => submit(values),
    });

    const submit = async (values: FormInitialValues) => {
        try {
            await getCsrfCookie();
            await userLogin(values);
            router.push('/');
        } catch (error: any) {
            switch (error.response?.status) {
                case 401:
                    alert(error.response.data.message)
                    break;
                case 403:
                    error.response.data && form.setErrors(error.response.data.data);
                    break;
                default:
                    alert('An error happen!')
                    break;
            }
        }
    };

    return form;
}

export default useLoginForm;