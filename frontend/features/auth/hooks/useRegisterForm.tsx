import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation'
import { getCsrfCookie, userRegister } from '@/features/auth/data/api';

type FormInitialValues = {
    name: string;
    email: string;
    password: string;
};

const useRegisterForm = () => {
    const router = useRouter();
    const form:any = useFormik({
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

    const submit:any = async (values: FormInitialValues) => {
        try {
            await getCsrfCookie();
            await userRegister(values);
            router.push('/login');
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
