import { useFormik } from 'formik';
import Modal from '@/features/main/ui/reusable/Modals/';
import Button from '@/features/main/ui/reusable/Button';
import InputGroup from '@/features/main/ui/reusable/InputGroup';

type ModalCreateNewGroupProps = {
  show: boolean;
  toggleShow: () => void;
};

const ModalCreateNewGroup = ({
  show,
  toggleShow,
}: ModalCreateNewGroupProps) => {
  const form = useFormik({
      initialValues: {
          name: '',
          description: '',
      },
      onSubmit: (values) => submit(values),
  });

  const submit = (values: any) => {
      console.log(values);
  };

  return (
      <Modal
          title='Create a New Group'
          show={show}
          toggleShow={toggleShow}
      >
          <form
              className='flex flex-col px-5 pb-5 gap-y-6'
              onSubmit={form.handleSubmit}
          >
              <InputGroup
                  name='name'
                  type='text'
                  label='Group name'
                  placeholder='Group name'
                  formikObject={form}
              />
              <InputGroup
                  name='description'
                  type='text'
                  label='Description'
                  placeholder='Description'
                  formikObject={form}
              />
              <div className='flex gap-x-5'>
                  <Button
                      displayText='Cancel'
                      variant='BORDER-PRIMARY'
                      action={toggleShow}
                  />
                  <Button
                      displayText='Create'
                      variant='PRIMARY'
                      type='submit'
                      disabled={form.isSubmitting}
                  />
              </div>
          </form>
      </Modal>
  );
};

export default ModalCreateNewGroup;