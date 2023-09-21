import { create } from "zustand";
import menuType from "@/type/menu";

const useAppStore = create((set) => ({
    activeMenu: menuType.PRIVATE,
    setActiveMenu: (activeMenu: menuType) => set({ activeMenu }),

    showConversation: false,
    setShowConversation: (showConversation: boolean) => set({ showConversation }),
    activeConversationType: "PRIVATE",
    setActiveConversationType: (activeConversationType: "PRIVATE" | "GROUP") => set({ activeConversationType }),
    
    activeConversationId: null,
    setActiveConversationId: (activeConversationId: number | null) => set({ activeConversationId }),
}));

export default useAppStore;
