type TSubmitButton = {
    displayText: string;
    disabled: boolean;
};

const SubmitButton = (props: TSubmitButton) => {
    const { displayText, disabled } = props;

    return (
        <button
            className='bg-primary text-white disabled:bg-gray-400 px-8 py-4 rounded-lg hover:brightness-95 w-full'
            type='submit'
            disabled={disabled}
        >
            {displayText}
        </button>
    );
};

export default SubmitButton;
