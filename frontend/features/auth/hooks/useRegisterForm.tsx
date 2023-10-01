import { useFormik } from "formik";
import * as Yup from "yup";

type FormInitialValues = {
    name: string;
    email: string;
    password: string;
};

const useRegisterForm = () => {
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
        console.log(values);
    };

    return form;
};

export default useRegisterForm;
