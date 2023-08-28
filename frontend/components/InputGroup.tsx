const InputGroup = ({label, type, name, placeholder, formikObject}: {
    label?: string,
    type: string,
    name: string,
    placeholder?: string,
    formikObject: any,
}) => {
    return (
        <div className="form-group flex flex-col gap-y-3">
                    <label className="text-base" htmlFor={ name }>{ label || name[0].toUpperCase() + name.slice(1) }</label>
                    <input className={`bg-background focus:outline-primary rounded-lg  py-4 px-8 border ${ formikObject.status?.errors[name] ? "border-red-500" : "border-black/10" }`}
                        type={ type } 
                        name={ name } 
                        id={ name } 
                        placeholder={ placeholder || name[0].toUpperCase() + name.slice(1)} 
                        {...formikObject.getFieldProps(name)} />

                        { 
                            formikObject.status?.errors[name] && <small className="self-end text-red-500 text-base">{ formikObject.status.errors[name] }</small>
                        }
            </div>
    )
}

export default InputGroup;