import MenuSearchBar from "./MenuSearchBar";

type MenuHeaderProps = {
    title: string;
    submitHandler: (event: React.FormEvent) => void;
    value: string;
    setValue: (event: any) => any;
}

const MenuHeader = ({ title, submitHandler, value, setValue }: MenuHeaderProps) => {
    return (
        <div className="sticky top-0 z-10 flex flex-col p-6 bg-white gap-y-5">
            <h1 className="text-xl font-medium text-slate-800">{title}</h1>
            <MenuSearchBar value={value} setValue={setValue} name="message" placeholder="Search messages..." submitHandler={submitHandler}/>
        </div>
    );
};

export default MenuHeader;
