interface SubmitButtonProps {
    displayText: string;
    disabled: boolean;
}

const SubmitButton = ({ displayText, disabled }: SubmitButtonProps) => {
    return (
        <button className="bg-primary text-white disabled:bg-gray-400 px-8 py-4 rounded-lg hover:brightness-95 w-full" type="submit" disabled={disabled}>
            {displayText}
        </button>
    );
};

export default SubmitButton;
