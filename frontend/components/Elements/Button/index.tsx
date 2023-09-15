const ButtonVariant = {
    PRIMARY: "bg-primary text-white disabled:bg-gray-400",
};

interface ButtonProps {
    displayText: string;
    variant: keyof typeof ButtonVariant;
    type?: "button" | "submit";
    disabled?: boolean;
    action?: () => void;
}

const Button = ({ displayText, variant, type = "button", disabled = false, action }: ButtonProps) => {
    return (
        <button className={`${ButtonVariant[variant]} px-8 py-4 rounded-lg hover:brightness-95`} type={type} disabled={disabled} {...(action ? () => action() : () => {})}>
            {displayText}
        </button>
    );
};

export default Button;
