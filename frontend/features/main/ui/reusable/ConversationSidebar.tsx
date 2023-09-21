import { useState } from "react";

import ArrowLeftSvg from "@/shared/icons/ArrowLeft";
import useOnClickOutside from "@/features/main/hooks/useOnClickOutside";
import ButtonIcon from "@/features/main/ui/reusable/ButtonIcon";
import MenuListSvg from "@/shared/icons/MenuList";
import MailFillSvg from "@/shared/icons/Mail.Fill";
import ClockFillSvg from "@/shared/icons/Clock.Fill";
import SmileFillSvg from "@/shared/icons/Smile.Fill";

type ConversationSidebarProps = {
    data: {
        name: string;
        id: number;
        description: string;
        email: string;
        joinedAt: number;
        status: string;
    };
    show: boolean;
    toggleSidebar: () => void;
};

const ConversationSidebar = ({ data, show, toggleSidebar }: ConversationSidebarProps) => {
    const [showAction, setShowAction] = useState<boolean>(false);
    const actionRef = useOnClickOutside(() => setShowAction(false));

    return (
        <div className={`flex fixed h-full flex-col gap-y-10 p-3 md:static right-0 top-0 border-l border-l-black/10 md:border-0 bg-white w-[80%] max-w-[340px] z-20 ${show ? "-mr-0 duration-300" : "-mr-[9999px] duration-300"}`}>
            {/* TITLE */}
            <div className="flex items-center justify-between title">
                <ButtonIcon icon={<ArrowLeftSvg />} action={() => toggleSidebar()} />
                <div className="flex flex-col gap-y-1">
                    <h1 className="text-sm font-semibold text-slate-800">Contact Information</h1>
                    <h2 className="text-xs text-slate-800">Detail information about this contact</h2>
                </div>
                <div className="relative">
                    <ButtonIcon icon={<MenuListSvg />} action={() => setShowAction(!showAction)} />
                    <div className={`bg-white overflow-hidden rounded-lg border border-black/10 absolute right-0 top-[50px] ${showAction ? "block" : "hidden"}`} ref={actionRef}>
                        <div className="py-3 px-5 text-red-500 whitespace-nowrap bg-white hover:brightness-95">Delete Contact</div>
                    </div>
                </div>
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
                        <div className="w-5 first:fill-slate-800">
                            <MailFillSvg />
                        </div>
                        <p className="text-xs text-slate-800">{data.email}</p>
                    </span>
                    <span title="Joined at" className="flex items-center gap-x-3">
                        <div className="w-5 first:fill-slate-800">
                            <ClockFillSvg />
                        </div>
                        <p className="text-xs text-slate-800">{data.joinedAt}</p>
                    </span>
                    <span title="Status" className="flex items-center gap-x-3">
                        <div className="w-5 first:fill-slate-800">
                            <SmileFillSvg />
                        </div>
                        <p className="text-xs text-slate-800">{data.status}</p>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ConversationSidebar;
