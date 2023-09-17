import Searchbar from "@/components/Elements/Menu/Searchbar/";
import Title from "@/components/Elements/Menu/Title/";

type Menu = {
    title: string;
    submitHandler: (event: React.FormEvent) => void;
    query: string;
    setQuery: (event: any) => any;
    placeholder: string;
    children: any;
};

const Menu = ({ title, submitHandler, query, setQuery, placeholder, children }: Menu) => {
    return (
        <div className="sticky top-0 z-10 flex flex-col p-6 bg-white gap-y-5">
            <Title text={title} />
            <Searchbar value={query} setValue={setQuery} name={title} placeholder={placeholder} submitHandler={submitHandler} />
            {children}
        </div>
    );
};

export default Menu;
