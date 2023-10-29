import { useRef, useState, ChangeEvent } from 'react';
import { useFormik } from 'formik';
import useOnClickOutside from '@/features/main/hooks/useOnClickOutside';
import { IconFillPencil } from '@/shared/Icons';
import Modal from '@/features/main/ui/reusable/Modals';
import Button from '@/features/main/ui/reusable/Button';
import InputGroup from '@/features/main/ui/reusable/InputGroup';
import { deleteGroupAvatar, updateGroupDetails, useGroup } from '@/features/auth/data/api';
import getAvatar from '@/features/main/utils/getAvatar';
import useGroupsStore from '@/store/groups.store';

type ModalUpdateGroupInfoProps = {
    id: string;
    show: boolean;
    toggleShow: () => void;
};

const ModalUpdateGroupInfo = ({ id, show, toggleShow }: ModalUpdateGroupInfoProps) => {
    const { data, isLoading, error, mutate } = useGroup(id);
    const [showProfilePictureMenu, setShowProfilePictureMenu] = useState<boolean>(false);
    const avatarRef = useRef(null);
    const avatarInputRef: any = useRef(null);
    const avatarMenuRef: any = useOnClickOutside(() => setShowProfilePictureMenu(false));

    const form = useFormik({
        initialValues: {
            name: data?.name || '',
            description: data?.description || '',
            avatar: data?.avatar || '',
        },
        enableReinitialize: true,
        onSubmit: (values) => submit(values),
    });

    const submit = async (values: { name: string; description: string; avatar?: string }) => {
        let { name, description, avatar } = useGroupsStore.getState().groups[id][0];

        // * Data doesn't change
        if (form.initialValues === form.values) {
            toggleShow();
            return;
        }

        if (!confirm('Update profile details?')) {
            return;
        }

        try {
            let tempValues = values;

            // * If avatar input not changed
            if (form.initialValues.avatar === values.avatar) {
                delete tempValues.avatar;
            }
            useGroupsStore.getState().updateGroupDetails(id, tempValues);
            await updateGroupDetails(id, form.values);

            alert('Update profile details success!');
            toggleShow();
        } catch (error: any) {
            useGroupsStore.getState().updateGroupDetails(id, { name, description, avatar });
        }
    };

    const onChangeProfilePictureInput = (event: ChangeEvent<HTMLInputElement>) => {
        const supportedFileFormats = ['image/jpg', 'image/jpeg', 'image/png'];

        if (
            // Check is file exist
            event.target.files &&
            event.target.files.length > 0 &&
            // Check is file type is supported
            supportedFileFormats.indexOf(event.target.files[0].type) > -1
        ) {
            form.setFieldValue('avatar', event.target.files[0]);
        } else {
            alert('Unsupported file format!');
            return;
        }
    };

    const deleteAvatarHandler = async (groupId: string) => {
        let oldAvatar = data?.avatar;

        if (!confirm('Are you sure want to delete your profile picture?')) {
            return;
        }

        if (!form.initialValues.avatar) {
            form.setFieldValue('avatar', '');
            return;
        }

        try {
            form.setFieldValue('avatar', null);
            await deleteGroupAvatar(id);
            useGroupsStore.getState().updateGroupDetails(id, { avatar: null });
            mutate(id);
        } catch (error: any) {}
    };

    if (data && !isLoading && !error) {
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
                                        onClick={() => deleteAvatarHandler(id)}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                        <h1 className='font-medium text-slate-800'>{data.name}</h1>
                        <small className='text-xs text-slate-500'>@{data.id}</small>
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

export default ModalUpdateGroupInfo;
