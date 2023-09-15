type LabelProps = {
    displayText: string;
    htmlFor: string;
};

const Label = ({ displayText, htmlFor }: LabelProps) => {
    return (
        <label className="text-base text-slate-800" htmlFor={htmlFor}>
            {displayText}
        </label>
    );
};

export default Label;
