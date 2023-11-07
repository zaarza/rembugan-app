type InputGroupProps = {
    formikObject: { [key: string]: any };
    type: string;
    name: string;
    placeholder?: string;
    label?: string;
};

const InputGroup = ({ type, name, placeholder, formikObject, label }: InputGroupProps) => {
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
                    formikObject.errors[name] ? 'border-red-500' : 'border-black/10'
                }`}
                type={type}
                name={name}
                id={name}
                placeholder={placeholder || name[0].toUpperCase() + name.slice(1)}
                {...formikObject.getFieldProps(name)}
                disabled={formikObject.isSubmitting}
            />
            {formikObject.errors[name] && (
                <small className='self-end text-red-500 text-base'>{formikObject.errors[name]}</small>
            )}
        </div>
    );
};

export default InputGroup;
