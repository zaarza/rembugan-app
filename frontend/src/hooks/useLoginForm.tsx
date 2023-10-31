'use client';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { getCsrfCookie, userLogin } from '@/src/data/fetcher';
import tLoginCredentials from '@/src/types/tLoginCredentials';

const useLoginForm = () => {
    const form = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Email required'),
            password: Yup.string().required('Password required'),
        }),
        onSubmit: (values) => submit(values),
    });

    const submit = async (values: tLoginCredentials) => {
        try {
            await getCsrfCookie();
            await userLogin(values);
            window.location.replace(`http://${window.location.host}`);
        } catch (error: any) {
            switch (error.response?.status) {
                case 401:
                    alert(error.response.data.message);
                    break;
                case 403:
                    error.response.data && form.setErrors(error.response.data.data);
                    break;
                default:
                    alert('An error happen!');
                    break;
            }
        }
    };

    return form;
};

export default useLoginForm;
