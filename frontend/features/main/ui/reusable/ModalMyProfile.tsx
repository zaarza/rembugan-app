import Modal from "@/features/main/ui/reusable/Modal";
import InputGroup from "@/features/main/ui/reusable/InputGroup";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Button from "./Button";

type ModalMyProfileProps = {
    show: boolean;
    toggleShow: () => void;
};

const ModalMyProfile = ({ show, toggleShow }: ModalMyProfileProps) => {
    const form = useFormik({
        initialValues: {
            description: "",
            email: "",
            status: "",
        },
        onSubmit: (values) => submit(values),
    });

    const submit = (values: any) => {
        console.log(values);
    };

    return (
        <Modal title="Your profile" show={show} toggleShow={toggleShow}>
            <form className="p-5 pt-0 flex flex-col gap-y-6" onSubmit={form.handleSubmit}>
                <div className="flex flex-col items-center gap-y-1">
                    <img className="rounded-full w-20" src="/assets/images/avatar-dummy.png" alt="Your photo profile" />
                    <h1 className="font-medium text-slate-800">Lorem</h1>
                    <small className="text-xs text-slate-500">@loremipsu123</small>
                </div>
                <div className="flex flex-col gap-y-6 max-h-[250px] overflow-y-auto">
                    <InputGroup name="description" type="text" formikObject={form} label="Description" />
                    <InputGroup name="email" type="text" formikObject={form} label="Email" />
                    <InputGroup name="status" type="text" formikObject={form} label="Status" />
                </div>
                <div className="flex gap-x-4">
                    <Button displayText="Cancel" variant="BORDER-PRIMARY" action={toggleShow} />
                    <Button displayText="Submit" variant="PRIMARY" type="submit" />
                </div>
            </form>
        </Modal>
    );
};

export default ModalMyProfile;
