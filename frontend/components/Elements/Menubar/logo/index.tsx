import useAppStore from "@/store/app.store";

const MenubarLogoButton = () => {
    const setShowConversation = useAppStore((state: any) => state.setShowConversation);

    return (
        <button className="w-7" onClick={() => setShowConversation(false)}>
            <img src="/assets/images/rembugan-logo.svg" alt="Rembugan Logo" />
        </button>
    )
}

export default MenubarLogoButton;