type MenubarInboxCategoryButtonProps = {
    text: string;
    active: boolean;
    action: () => void;
};

const MenubarInboxCategoryButton = ({ text, active, action }: MenubarInboxCategoryButtonProps) => {
    return (
        <button className={`rounded-lg px-4 text-xs py-2 border border-black/10 hover:brightness-95 ${active ? "bg-primary text-white" : "bg-white text-slate-800"}`} onClick={() => action()}>
            {text}
        </button>
    );
};

export default MenubarInboxCategoryButton;
