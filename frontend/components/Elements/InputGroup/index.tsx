import Label from "@/components/Elements/InputGroup/Label";
import Error from "@/components/Elements/InputGroup/Error";
import Input from "@/components/Elements/InputGroup/Input";

type InputGroupProps = {
    formikObject: { [key: string]: any };
    type: string;
    name: string;
    placeholder?: string;
};

const InputGroup = ({ type, name, placeholder, formikObject }: InputGroupProps) => {
    return (
        <div className="form-group flex flex-col gap-y-3">
            <Label htmlFor={name} displayText={name[0].toUpperCase() + name.slice(1)} />
            <Input name={name} placeholder={placeholder} formikObject={formikObject} type={type} />
            <Error message={formikObject.status?.errors[name]} />
        </div>
    );
};

export default InputGroup;
