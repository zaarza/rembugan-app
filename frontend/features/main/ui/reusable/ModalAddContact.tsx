import { useFormik } from "formik";

import Button from "@/features/main/ui/reusable/Button";
import InputGroup from "@/features/main/ui/reusable/InputGroup";
import Modal from "@/features/main/ui/reusable/Modal";

type ModalAddContactProps = {
    show: boolean;
    toggleShow: () => void;
};

const ModalAddContact = ({ show, toggleShow }: ModalAddContactProps) => {
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

export default ModalAddContact;