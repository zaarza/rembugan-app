type InputProps = {
    name: string;
    type: string;
    placeholder: string;
    label: string;
    formikObject: { [key: string]: any };
    disabled: boolean;
};

const Input = ({ name, type, placeholder, formikObject, label, disabled }: InputProps) => {
    return (
        <div className="form-group flex flex-col gap-y-3">
            <label className="text-base text-slate-800" htmlFor={name}>
                {label}
            </label>
            <input className={`bg-background focus:outline-primary rounded-lg py-4 px-8 border ${formikObject.status?.errors[name] ? "border-red-500" : "border-black/10"}`} type={type} name={name} id={name} placeholder={placeholder} disabled={disabled} {...formikObject.getFieldProps(name)}/>
            {formikObject.errors[name] && <small className="self-end text-red-500 text-base">{formikObject.errors[name]}</small>}
        </div>
    );
};

export default Input;
