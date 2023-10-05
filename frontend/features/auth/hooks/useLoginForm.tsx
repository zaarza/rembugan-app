import axios from 'axios';
import { useFormik } from 'formik'
import * as Yup from "yup";
import { getCsrfCookie } from '../data/api';
import { useRouter } from 'next/navigation';

type FormInitialValues = {
    email: string;
    password: string;
};

const useLoginForm = () => {
    axios.defaults.withCredentials = true;
    const router = useRouter();

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

    const submit = async (values: FormInitialValues) => {
        const userLogin = async ({email, password}: {email: string, password: string}) => {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {email, password})
            return response;
        };

        try {
            await getCsrfCookie();
            await userLogin(values);
            router.push('/');
        } catch (error: any) {
            if (error.response.data.status === 401) {
                alert(error.response.data.message)
            } else {
                form.setErrors(error.response.data.data);
            }
        }
    };

    return form;
}

export default useLoginForm;