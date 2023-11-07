const getAvatar = ({ oldValue, newValue }: any) => {
    try {
        // Avatar deleted
        if (oldValue && !newValue) {
            throw new Error();
        }

        // Curent avatar null
        if (!oldValue && !newValue) {
            throw new Error();
        }

        // Avatar updated
        if (typeof newValue === 'object') {
            return URL.createObjectURL(newValue);
        }

        // Avatar exist
        if (oldValue) {
            return oldValue;
        }

        throw new Error();
    } catch (error) {
        return '/assets/illustrations/avatar-empty.svg';
    }
};

export default getAvatar;
