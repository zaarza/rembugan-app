import { useFormik } from 'formik';
import { deleteCurrentUserAvatar, updateCurrentUserDetails } from '@/features/auth/data/api';
import useUserStore from '@/store/user.store';
import { ChangeEvent } from 'react';
import tGetUserDataResponse from '@/src/types/tGetUserDataResponse';
import { KeyedMutator } from 'swr';
import logOut from '../utils/logOut';

type tUseModalCurrentUserProfile = {
    data: tGetUserDataResponse | undefined;
    mutator: KeyedMutator<tGetUserDataResponse>;
};

const useModalCurrentUserProfile = (props: tUseModalCurrentUserProfile) => {
    const { data, mutator } = props;

    const form = useFormik({
        initialValues: {
            name: data?.data.data.name || '',
            description: data?.data.data.description || '',
            email: data?.data.data.email || '',
            status: data?.data.data.status || '',
            avatar: data?.data.data.avatar || '',
        },
        enableReinitialize: true,
        onSubmit: (values) => submit(values),
    });

    const submit = async (values: any) => {
        let currentData = data;

        // * Data doesn't change
        if (form.initialValues === form.values) {
            return;
        }

        if (!confirm('Update profile details?')) {
            return;
        }

        try {
            let tempValues = values;

            // * If avatar input not changed
            if (form.initialValues.avatar === values.avatar && values.avatar.length > 0) {
                tempValues['avatar'] = '';
            }

            await updateCurrentUserDetails({ id: data?.data.data.id, ...tempValues });
            alert('Update profile details success!');
        } catch (error: any) {
            mutator(currentData);

            if (error) {
                switch (error.response?.status) {
                    case 401:
                        alert('You are not logged in please login!');
                        logOut();
                        break;
                    case 419:
                        alert('Your session was expired please re-login!');
                        logOut();
                        break;
                    case 403:
                        alert('Failed to update profile, check error message!');
                        error.response.data && form.setErrors(error.response.data.data);
                        break;
                    default:
                        alert('Failed to update profile!');
                        break;
                }
            }
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

    const deleteAvatarHandler = async () => {
        let oldAvatar = data?.data.data.avatar;
        if (!confirm('Are you sure want to delete your profile picture?')) return;

        if (!form.initialValues.avatar) {
            form.setFieldValue('avatar', '');
            return;
        }

        try {
            form.setFieldValue('avatar', null);
            await deleteCurrentUserAvatar();
            mutator({ ...data });
        } catch (error: any) {
            useUserStore.setState((store) => ({ user: { ...store.user, avatar: oldAvatar } }));
        }
    };

    return { form, onChangeProfilePictureInput, deleteAvatarHandler };
};

export default useModalCurrentUserProfile;
