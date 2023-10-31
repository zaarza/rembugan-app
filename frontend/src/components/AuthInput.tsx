interface IAuthInput extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    type: string;
    placeholder: string;
    label: string;
    formHandler: { [key: string]: any };
    disabled: boolean;
}

const AuthInput = (props: IAuthInput) => {
    const { name, type, placeholder, formHandler, label, disabled, ...restProps } = props;

    return (
        <div className='form-group flex flex-col gap-y-3'>
            <label
                className='text-base text-slate-800'
                htmlFor={name}
            >
                {label}
            </label>
            <input
                className={`bg-background focus:outline-primary rounded-lg py-4 px-8 border ${
                    formHandler.status?.[name] ? 'border-red-500' : 'border-black/10'
                }`}
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                disabled={disabled}
                {...formHandler.getFieldProps(name)}
                {...restProps}
            />
            {formHandler.errors[name] && (
                <small className='self-end text-red-500 text-base'>{formHandler.errors[name]}</small>
            )}
        </div>
    );
};

export default AuthInput;
