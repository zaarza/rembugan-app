import { useFormik } from 'formik';
import * as yup from 'yup';

const useAuthInputForm = () => {
    const form = useFormik({
        initialValues: {
            name: 'Initial value',
        },
        validationSchema: yup.object({
            name: yup.string().required(),
        }),
        onSubmit: () => {},
    });

    return form;
};

export default useAuthInputForm;
