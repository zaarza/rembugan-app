import { useFormik } from 'formik'
import * as Yup from "yup";

type FormInitialValues = {
    email: string;
    password: string;
};

const useLoginForm = () => {
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
        console.log(values);
        form.setSubmitting(false);
    };

    return form;
}

export default useLoginForm;