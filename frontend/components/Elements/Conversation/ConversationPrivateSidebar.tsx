import useOnClickOutside from "@/hooks/useOnClickOutside";
import { useState } from "react";

type ConversationPrivateSidebarData = {
    name: string;
    id: string;
    description: string;
    email: string;
    joinedAt: number;
    status: string;
};

type ConversationPrivateSidebarProps = {
    show: boolean;
    setShow: () => void;
    data: ConversationPrivateSidebarData;
};

const ConversationPrivateSidebar = ({ show, setShow, data }: ConversationPrivateSidebarProps) => {
    const [showAction, setShowAction] = useState<boolean>(false);

    const actionRef = useOnClickOutside(() => setShowAction(false));
    return (
        <div className={`flex fixed h-full flex-col gap-y-10 p-3 md:static right-0 top-0 border-l border-l-black/10 md:border-0 bg-white w-[80%] max-w-[340px] z-20 ${show ? "-mr-0 duration-300" : "-mr-[9999px] duration-300"}`}>
            {/* TITLE */}
            <div className="flex items-center justify-between title">
                <button className="h-full pr-3 group flex" onClick={() => setShow()}>
                    <svg className="group-hover:fill-primary w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
                    </svg>
                </button>
                <div className="flex flex-col gap-y-1">
                    <h1 className="text-sm font-semibold text-slate-800">Contact Information</h1>
                    <h2 className="text-xs text-slate-800">Detail information about this contact</h2>
                </div>
                <button type="button" className="h-full pr-3 group flex" onClick={() => setShowAction(!showAction)}>
                    <svg className="group-hover:fill-primary w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"></path>
                    </svg>
                    <div className={`bg-white overflow-hidden rounded-lg border border-black/10 absolute right-0 top-[50px] ${showAction ? "block" : "hidden"}`} ref={actionRef}>
                        <div className="py-3 px-5 text-red-500 whitespace-nowrap bg-white hover:brightness-95">Delete Contact</div>
                    </div>
                </button>
            </div>
            {/* PROFILE */}
            <div className="flex flex-col gap-y-3">
                <img className="rounded-lg self-center max-w-[100px] w-full min-w-[24px]" src="/assets/images/avatar2-dummy.png" alt="" />
                <div className="flex flex-col items-center gap-y-1">
                    <h1 className="font-semibold text-slate-800">{data.name}</h1>
                    <h2 className="text-xs text-slate-800">{data.id}</h2>
                </div>
            </div>
            <div className="flex flex-col gap-y-1">
                <h1 className="font-medium text-sm text-slate-800">Profile Description</h1>
                <h2 className="text-xs text-slate-800">{data.description}</h2>
            </div>
            <div className="flex flex-col gap-y-1">
                <h3 className="font-medium text-sm text-slate-800">More Information</h3>
                <div className="flex flex-col gap-y-2">
                    <span title="Email address" className="flex items-center gap-x-3">
                        <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM12.0606 11.6829L5.64722 6.2377L4.35278 7.7623L12.0731 14.3171L19.6544 7.75616L18.3456 6.24384L12.0606 11.6829Z"></path>
                        </svg>
                        <p className="text-xs text-slate-800">{data.email}</p>
                    </span>
                    <span title="Joined at" className="flex items-center gap-x-3">
                        <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM13 12V7H11V14H17V12H13Z"></path>
                        </svg>
                        <p className="text-xs text-slate-800">{data.joinedAt}</p>
                    </span>
                    <span title="Status" className="flex items-center gap-x-3">
                        <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12H15C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12H7Z"></path>
                        </svg>
                        <p className="text-xs text-slate-800">{data.status}</p>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ConversationPrivateSidebar;
