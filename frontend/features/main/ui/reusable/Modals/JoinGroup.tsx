import { useFormik } from 'formik';
import Modal from '@/features/main/ui/reusable/Modals';
import Button from '@/features/main/ui/reusable/Button';
import InputGroup from '@/features/main/ui/reusable/InputGroup';

const ModalJoinGroup = ({ show, toggleShow }: { show: boolean; toggleShow: () => void }) => {
    const form = useFormik({
        initialValues: {
            pin: '',
        },
        onSubmit: (values) => submit(values),
    });

    const submit = (values: { pin: string }) => {
        //
    };

    return (
        <Modal
            title='Join a Group'
            show={show}
            toggleShow={toggleShow}
        >
            <form
                className='flex flex-col px-5 pb-5 gap-y-6'
                onSubmit={form.handleSubmit}
            >
                <InputGroup
                    name='pin'
                    label='Insert group pin'
                    placeholder='PIN Number...'
                    type='text'
                    formikObject={form}
                />
                <div className='flex gap-x-5'>
                    <Button
                        displayText='Cancel'
                        variant='BORDER-PRIMARY'
                        action={toggleShow}
                    />
                    <Button
                        displayText='Join'
                        variant='PRIMARY'
                        type='submit'
                        disabled={form.isSubmitting}
                    />
                </div>
            </form>
        </Modal>
    );
};

export default ModalJoinGroup;
