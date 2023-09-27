import { IconLineSearch } from '@/shared/Icons';

type SearchbarProps = {
    name: string;
    placeholder: string;
    submitHandler: (event: React.FormEvent) => void;
    value: string;
    setValue: (event: any) => any;
};

const Searchbar = ({ name, placeholder, submitHandler, value, setValue }: SearchbarProps) => {
    return (
        <form onSubmit={(event) => submitHandler(event)}>
            <div className="flex items-center border rounded-lg bg-background border-black/10 last:focus:border-primary peer">
                <label htmlFor="menu-search-bar" className="flex justify-center w-20 h-12 cursor-pointer aspect-square first:fill-black/40">
                    <IconLineSearch />
                </label>
                <input value={value} onInput={(event) => setValue(event)} type="text" className="w-full text-base bg-transparent focus:outline-none text-black/40 placeholder:text-black/40" placeholder={placeholder} id="menu-search-bar" name={name} />
            </div>
        </form>
    );
};

export default Searchbar;