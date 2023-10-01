import { useRef, useState, ChangeEvent } from 'react';
import { useFormik } from 'formik';
import useOnClickOutside from '@/features/main/hooks/useOnClickOutside';
import { IconFillPencil } from '@/shared/Icons';
import Modal from '@/features/main/ui/reusable/Modals';
import Button from '@/features/main/ui/reusable/Button';
import InputGroup from '@/features/main/ui/reusable/InputGroup';

type ModalUpdateGroupInfoProps = {
  id: string;
  show: boolean;
  toggleShow: () => void;
};

const ModalUpdateGroupInfo = ({
  id,
  show,
  toggleShow,
}: ModalUpdateGroupInfoProps) => {
  const profilePictureRef: any = useRef(null);
  const profilePictureInputRef: any = useRef(null);
  const [showProfilePictureMenu, setShowProfilePictureMenu] =
      useState<boolean>(false);
  const profilePictureMenuRef: any = useOnClickOutside(() =>
      setShowProfilePictureMenu(false)
  );

  const form = useFormik({
      initialValues: {
          name: '',
          description: '',
          profilePicture: '',
      },
      onSubmit: (values) => submit(values),
  });

  const submit = (values: any) => {
      console.log(values);
  };

  const onChangeProfilePictureInput = (
      event: ChangeEvent<HTMLInputElement>
  ) => {
      const supportedFileFormats = ['image/jpg', 'image/jpeg', 'image/png'];

      if (
          // Check is file exist
          event.target.files &&
          event.target.files.length > 0 &&
          // Check is file type is supported
          supportedFileFormats.indexOf(event.target.files[0].type) > -1
      ) {
          profilePictureRef?.current?.setAttribute(
              'src',
              URL.createObjectURL(event.target.files[0])
          );
          setShowProfilePictureMenu(false);
      } else {
          alert('Unsupported file format!');
          return;
      }
  };

  return (
      <Modal
          title='Group information'
          show={show}
          toggleShow={toggleShow}
      >
          <form
              className='p-5 pt-0 flex flex-col gap-y-6'
              onSubmit={form.handleSubmit}
          >
              <div className='flex flex-col items-center gap-y-1'>
                  <div className='relative cursor-pointer group'>
                      <img
                          className='rounded-full w-20 h-20 border-2 border-transparent group-hover:border-primary'
                          src={'/assets/images/avatar-dummy.png'}
                          alt='Your photo profile'
                          ref={profilePictureRef}
                          onClick={() => setShowProfilePictureMenu(true)}
                      />
                      <input
                          className='hidden'
                          type='file'
                          id='profilePicture'
                          name='profilePicture'
                          accept='image'
                          onChange={(event) =>
                              onChangeProfilePictureInput(event)
                          }
                          ref={profilePictureInputRef}
                      />
                      <button
                          type='button'
                          className='w-6 h-6 bg-primary rounded-full absolute right-0 top-0 flex justify-center items-center'
                          onClick={() => setShowProfilePictureMenu(true)}
                      >
                          <div className='first:fill-white first:w-3'>
                              <IconFillPencil />
                          </div>
                      </button>
                      <div
                          className={`absolute bg-white rounded-lg border left-0 top-[50%] border-black/10 ${
                              showProfilePictureMenu ? 'visible' : 'invisible'
                          }`}
                          ref={profilePictureMenuRef}
                      >
                          <button
                              className='w-full px-5 py-3 bg-white text-slate-800 whitespace-nowrap hover:brightness-95'
                              onClick={() => {
                                  profilePictureInputRef.current.click();
                              }}
                          >
                              Update picture
                          </button>
                          <button className='w-full px-5 py-3 text-center bg-white text-slate-800 whitespace-nowrap hover:brightness-95'>
                              Delete
                          </button>
                      </div>
                  </div>
                  <h1 className='font-medium text-slate-800'>Lorem</h1>
                  <small className='text-xs text-slate-500'>
                      @loremipsu123
                  </small>
              </div>
              <div className='flex flex-col gap-y-6 max-h-[250px] overflow-y-auto'>
                  <InputGroup
                      name='name'
                      type='text'
                      formikObject={form}
                      label='Group Name'
                  />
                  <InputGroup
                      name='description'
                      type='text'
                      formikObject={form}
                      label='Description'
                  />
              </div>
              <div className='flex gap-x-4'>
                  <Button
                      displayText='Cancel'
                      variant='BORDER-PRIMARY'
                      action={toggleShow}
                  />
                  <Button
                      displayText='Submit'
                      variant='PRIMARY'
                      type='submit'
                  />
              </div>
          </form>
      </Modal>
  );
};

export default ModalUpdateGroupInfo;

