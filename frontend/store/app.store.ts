import { create } from "zustand";
import Menu from "@/type/Menu";

const useAppStore = create((set) => ({
    activeMenu: Menu.PRIVATE,
    setActiveMenu: (activeMenu: Menu) => set({ activeMenu }),

    showInbox: false,
    setShowInbox: (showInbox: boolean) => set({ showInbox }),

    showConversation: false,
    activeConversationType: "PRIVATE",
    setActiveConversationType: (activeConversationType: "PRIVATE" | "GROUP") => set({ activeConversationType }),
    setShowConversation: (showConversation: boolean) => set({ showConversation }),
    activeConversationId: null,
    setActveConversationId: (activeConversationId: number | null) => set({ activeConversationId }),
}));

export default useAppStore;
