type InputProps = {
    name: string;
    placeholder?: string;
    formikObject: { [key: string]: any };
    disabled?: boolean;
    type: string;
};

const Input = ({ name, placeholder, formikObject, disabled, type }: InputProps) => {
    return <input className={`bg-background focus:outline-primary rounded-lg py-4 px-8 border ${formikObject.status?.errors[name] ? "border-red-500" : "border-black/10"}`} type={type} name={name} id={name} placeholder={placeholder || name[0].toUpperCase() + name.slice(1)} {...formikObject.getFieldProps(name)} disabled={disabled} />;
};

export default Input;
