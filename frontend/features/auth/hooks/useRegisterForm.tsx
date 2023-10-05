import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation'

type FormInitialValues = {
    name: string;
    email: string;
    password: string;
};

const useRegisterForm = () => {
    axios.defaults.withCredentials = true;
    const router = useRouter();

    const form = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required(),
            email: Yup.string().required(),
            password: Yup.string().required(),
        }),
        onSubmit: (values) => submit(values),
    });

    const submit = async (values: FormInitialValues) => {
        let result;
        const userRegister = async ({
            name,
            email,
            password,
        }: FormInitialValues) => {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
                { name, email, password }
            );
            return response;
        };

        const generateCsrfCookie = async () => {
            await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`
            );
        };

        try {
            await generateCsrfCookie();
            result = await userRegister(values);
            router.push('/login');
        } catch (error: any) {
            form.setErrors(error.response.data.data);
        }
    };

    return form;
};

export default useRegisterForm;
