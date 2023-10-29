import { useFormik } from 'formik';
import { deleteCurrentUserAvatar, updateCurrentUserDetails } from '@/features/auth/data/api';
import useUserStore from '@/store/user.store';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

const useUpdateProfileForm = (callbacks: (() => void)[]) => {
    const { user, setUser, logOut } = useUserStore((state) => ({
        user: state.user,
        setUser: state.setUser,
        logOut: state.logOut,
    }));

    const form = useFormik({
        initialValues: {
            name: user.name || '',
            description: user.description || '',
            email: user.email || '',
            status: user.status || '',
            avatar: user.avatar || '',
        },
        enableReinitialize: true,
        onSubmit: (values) => submit(values),
    });

    const submit = async (values: any) => {
        let originalUser = user;

        // * Data doesn't change
        if (form.initialValues === form.values) {
            callbacks.every((callback) => callback());
            return;
        }

        if (!confirm('Update profile details?')) {
            return;
        }

        try {
            let tempValues = values;

            // * If avatar input not changed
            if (form.initialValues.avatar === values.avatar) {
                tempValues['avatar'] = '';
            }
            setUser(tempValues);
            await updateCurrentUserDetails({ id: user.id, ...tempValues });
            alert('Update profile details success!');
            callbacks.every((callback) => callback());
        } catch (error: any) {
            setUser(originalUser);

            switch (error.response?.status) {
                case 401:
                    alert('You are not logged in please login!');
                    logOut();
                    break;
                case 419:
                    alert('Your session was expired please re-login!');
                    logOut(false);
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
        let oldAvatar = user.avatar;
        if (!confirm('Are you sure want to delete your profile picture?')) return;

        if (!form.initialValues.avatar) {
            form.setFieldValue('avatar', '');
            return;
        }

        try {
            form.setFieldValue('avatar', null);
            await deleteCurrentUserAvatar();
            useUserStore.setState((store) => ({ user: { ...store.user, avatar: null } }));
        } catch (error: any) {
            useUserStore.setState((store) => ({ user: { ...store.user, avatar: oldAvatar } }));
        }
    };

    return { form, onChangeProfilePictureInput, deleteAvatarHandler };
};

export default useUpdateProfileForm;
