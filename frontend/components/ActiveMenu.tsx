import useAppStore from "@/store/app.store";
import ConversationItems from "./ConversationItems";

const ActiveMenu = () => {
    const activeMenu = useAppStore((state: any) => state.activeMenu);
    const setActiveMenu = useAppStore((state: any) => state.setActiveMenu);

    return (
        <div className="active-menu w-full lg:min-w-[320px] lg:max-w-[400px] lg:border-r-black/10 lg:border-r">
            {activeMenu === "PRIVATE" && (
                <div className="flex flex-col w-full h-full">
                    <div className="sticky top-0 z-10 flex flex-col p-6 bg-white gap-y-5">
                        <h1 className="text-xl font-medium text-slate-800">Messages</h1>
                        <div className="flex items-center border rounded-lg bg-background border-black/10 last:focus:border-primary peer">
                            <label htmlFor="searchMessage" className="flex justify-center w-20 h-12 cursor-pointer aspect-square first:fill-black/40">
                                <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
                                </svg>
                            </label>
                            <input type="text" className="w-full text-base bg-transparent focus:outline-none text-black/40 placeholder:text-black/40" placeholder="Search messages..." id="searchMessage" name="searchMessage" />
                        </div>
                    </div>

                    <div className="flex flex-col overflow-auto pb-36">
                        <ConversationItems />
                    </div>
                </div>
            )}

            {activeMenu === "CONTACTS" && <h1>Contacts</h1>}
            {activeMenu === "GROUPS" && <h1>Groups</h1>}
        </div>
    );
};

export default ActiveMenu;
