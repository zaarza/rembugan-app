import { postFriendRequest } from '@/features/auth/data/api';
import useUserStore from '@/store/user.store';
import { useFormik } from 'formik';

const useAddContactForm = (callbacks: (() => void)[]) => {
    const { user } = useUserStore((state) => ({ user: state.user }));
    const form = useFormik({
        initialValues: {
            pin: '',
        },
        enableReinitialize: true,
        onSubmit: (values: { pin: string }) => submit(values),
    });

    const submit = async (values: any) => {
        try {
            await postFriendRequest({ id: values.pin, currentUserId: user.id || '' });
            alert('Friend request sent!');
            form.resetForm();
            callbacks.every((callback) => callback());
        } catch (error: any) {
            switch (error.response?.status) {
                case 404:
                    form.setErrors({ pin: 'User not found!' });
                    break;
                default:
                    alert('Add friend request failed!');
                    break;
            }
        }
    };

    return { form };
};

export default useAddContactForm;
