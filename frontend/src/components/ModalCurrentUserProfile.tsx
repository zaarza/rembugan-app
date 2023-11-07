import { useState, useRef } from 'react';
import useOnClickOutside from '@/features/main/hooks/useOnClickOutside';
import { IconFillPencil } from '@/shared/Icons';
import Modal from '@/features/main/ui/reusable/Modals';
import Button from '@/features/main/ui/reusable/Button';
import InputGroup from '@/features/main/ui/reusable/InputGroup';
import useUpdateProfileForm from '@/features/main/hooks/useUpdateProfileForm';
import getAvatar from '@/features/main/utils/getAvatar';
import useCurrentUser from '@/src/hooks/useCurrentUser';
import useModalCurrentUserProfile from '../hooks/useModalCurrentUserProfile';

type tModalCurrentUserProfile = {
    show: boolean;
    toggleShow: () => void;
};

const ModalCurrentUserProfile = (props: tModalCurrentUserProfile) => {
    const { show, toggleShow } = props;
    const [showProfilePictureMenu, setShowProfilePictureMenu] = useState<boolean>(false);
    const avatarRef = useRef(null);
    const avatarInputRef: any = useRef(null);
    const avatarMenuRef: any = useOnClickOutside(() => setShowProfilePictureMenu(false));
    const { data, mutate } = useCurrentUser();
    const { form, onChangeProfilePictureInput, deleteAvatarHandler } = useModalCurrentUserProfile({
        data,
        mutator: mutate,
    });

    if (data) {
        return (
            <Modal
                title='Your profile'
                show={show}
                toggleShow={toggleShow}
            >
                <form
                    className='p-5 pt-0 flex flex-col gap-y-6 max-w-[400px]'
                    onSubmit={form.handleSubmit}
                >
                    <div className='flex flex-col items-center gap-y-1'>
                        <div className='relative cursor-pointer group'>
                            <img
                                className='rounded-full w-20 h-20 border-2 border-transparent group-hover:border-primary'
                                src={getAvatar({ oldValue: form.initialValues.avatar, newValue: form.values.avatar })}
                                alt='Your photo profile'
                                ref={avatarRef}
                                onClick={() => setShowProfilePictureMenu(true)}
                            />
                            <input
                                className='hidden'
                                type='file'
                                id='avatar'
                                name='avatar'
                                accept='image/png, image/jpeg, image/jpg'
                                onChange={(event) => {
                                    onChangeProfilePictureInput(event);
                                    setShowProfilePictureMenu(false);
                                }}
                                ref={avatarInputRef}
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
                                ref={avatarMenuRef}
                            >
                                <button
                                    type='button'
                                    className='w-full px-5 py-3 bg-white text-slate-800 whitespace-nowrap hover:brightness-95'
                                    onClick={() => {
                                        avatarInputRef.current.click();
                                    }}
                                >
                                    Update picture
                                </button>
                                {form.values.avatar && (
                                    <button
                                        type='button'
                                        className='w-full px-5 py-3 text-center bg-white text-slate-800 whitespace-nowrap hover:brightness-95'
                                        onClick={() => deleteAvatarHandler()}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                        <h1 className='font-medium text-slate-800'>{data.data.data.name}</h1>
                        <small className='text-xs text-slate-500'>@{data.data.data.id}</small>
                    </div>
                    <div className='flex flex-col gap-y-6 max-h-[250px] overflow-y-auto px-3 pb-2'>
                        <InputGroup
                            name='name'
                            type='text'
                            formikObject={form}
                            label='Name'
                        />
                        <InputGroup
                            name='description'
                            type='text'
                            formikObject={form}
                            label='Description'
                        />
                        <InputGroup
                            name='email'
                            type='text'
                            formikObject={form}
                            label='Email'
                        />
                        <InputGroup
                            name='status'
                            type='text'
                            formikObject={form}
                            label='Status'
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
                            disabled={form.isSubmitting}
                        />
                    </div>
                </form>
            </Modal>
        );
    }
};

export default ModalCurrentUserProfile;
