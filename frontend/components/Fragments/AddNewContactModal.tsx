import { useFormik } from "formik";

import Modal from "@/components/Elements/Modal";
import InputGroup from "@/components/Elements/InputGroup";
import Button from "@/components/Elements/Button";

type AddNewContactModalProps = {
    show: boolean;
    toggleShow: () => void;
}

const AddNewContactModal = ({show, toggleShow}: AddNewContactModalProps) => {
    const form = useFormik({
        initialValues: {
            pin: "",
        },
        onSubmit: (values) => submit(values),
    });

    const submit = (values: any) => {
        console.log(values);
        toggleShow();
        form.setSubmitting(false);
    };

    return (
        <Modal title="Add New Contact" show={show} toggleShow={toggleShow}>
            <form className="flex px-5 pb-5 flex-col gap-y-6" onSubmit={form.handleSubmit}>
                <InputGroup name="pin" label="Insert contact pin" placeholder="PIN Number..." type="text" formikObject={form} />
                <div className="flex gap-x-5">
                    <Button displayText="Cancel" variant="BORDER-PRIMARY" action={toggleShow} />
                    <Button displayText="Send" variant="PRIMARY" type="submit" disabled={form.isSubmitting} />
                </div>
            </form>
        </Modal>
    );
};

export default AddNewContactModal;
