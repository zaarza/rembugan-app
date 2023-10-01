import { useFormik } from "formik";

type initialValuesType = {
    content: string;
};

const useConversationForm = () => {
    const form = useFormik({
        initialValues: {
            content: "",
        },
        onSubmit: (values) => submit(values),
    });

    const submit = (values: initialValuesType) => {
        console.log(values);
        form.setSubmitting(false);
    };

    return form;
};

export default useConversationForm;
