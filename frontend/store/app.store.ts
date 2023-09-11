import { create } from "zustand";
import Menu from "@/app/type/Menu";

const useAppStore = create((set) => ({
    activeMenu: Menu.PRIVATE,
    setActiveMenu: (activeMenu: Menu) => set({ activeMenu }),

    showInbox: false,
    setShowInbox: (showInbox: boolean) => set({ showInbox }),

    showConversation: false,
    setShowConversation: (showConversation: boolean) => set({ showConversation }),
    activeConversationId: null,
    setActveConversationId: (activeConversationId: number | null) => set({ activeConversationId }),
}))

export default useAppStore;