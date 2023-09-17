type MenubarLogoButtonProps = {
    action: () => void;
};

const MenubarLogoButton = ({ action }: MenubarLogoButtonProps) => {
    return (
        <button className="w-7" onClick={() => action()}>
            <img src="/assets/images/rembugan-logo.svg" alt="Rembugan Logo" />
        </button>
    );
};

export default MenubarLogoButton;
