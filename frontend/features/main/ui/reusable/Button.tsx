const ButtonVariant = {
    PRIMARY: 'bg-primary text-white disabled:bg-gray-400',
    'BORDER-PRIMARY': 'bg-white text-primary border border-primary',
};

interface ButtonProps {
    displayText?: string;
    variant: keyof typeof ButtonVariant;
    type?: 'button' | 'submit';
    disabled?: boolean;
    action?: () => void;
    children?: any;
}

const Button = ({
    displayText,
    variant,
    type = 'button',
    disabled = false,
    action,
    children,
}: ButtonProps) => {
    return (
        <button
            className={`${ButtonVariant[variant]} px-8 py-4 rounded-lg hover:brightness-95 w-full`}
            type={type}
            disabled={disabled}
            onClick={action ? () => action() : () => {}}
        >
            {displayText}
            {children !== undefined && children}
        </button>
    );
};

export default Button;
