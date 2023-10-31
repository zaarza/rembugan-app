'use client';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { getCsrfCookie, userRegister } from '@/features/auth/data/api';
import tRegisterCredentials from '@/src/types/tRegisterCredentials';

const useRegisterForm = () => {
    const form = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name required'),
            email: Yup.string().required('Email required'),
            password: Yup.string().required('Password required'),
        }),
        onSubmit: (values) => submit(values),
    });

    const submit: any = async (values: tRegisterCredentials) => {
        try {
            await getCsrfCookie();
            await userRegister(values);
            window.location.replace(`http://${window.location.host}/login`);
        } catch (error: any) {
            // TODO: Set Formik error if status code is 403/ invalid credentials
            if (error.response?.status === 403) {
                form.setErrors(error.response.data.data);
            }
        }
    };

    return form;
};

export default useRegisterForm;
