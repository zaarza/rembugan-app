import { create } from "zustand";
import Menu from "@/type/Menu";

const useAppStore = create((set) => ({
    activeMenu: Menu.PRIVATE,
    setActiveMenu: (activeMenu: Menu) => set({ activeMenu }),

    showConversation: false,
    setShowConversation: (showConversation: boolean) => set({ showConversation }),
    activeConversationType: "PRIVATE",
    setActiveConversationType: (activeConversationType: "PRIVATE" | "GROUP") => set({ activeConversationType }),
    
    activeConversationId: null,
    setActveConversationId: (activeConversationId: number | null) => set({ activeConversationId }),
}));

export default useAppStore;
