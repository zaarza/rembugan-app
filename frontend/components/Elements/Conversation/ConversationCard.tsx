import React from "react";

type ConversationCardProps = { 
    name: string; 
    content: string; 
    time: number; 
    avatar: string; 
    is_readed?: boolean; 
    position: "LEFT" | "RIGHT"
};

const ConversationCard = ({ name, content, time, avatar, is_readed, position }: ConversationCardProps) => {
    return (
        <div className={`flex flex-col ${position === "RIGHT" && "items-end"}`}>
            <div className="grid grid-cols-[auto_auto_auto] grid-rows-2 w-fit gap-x-4 gap-y-1">
                <div className={`flex gap-x-3 self-end place-self-end col-start-2 items-center ${position === "LEFT" && "flex-row-reverse"}`}>
                    <small className="text-xs text-black/40">{time}</small>
                    <small className="text-base font-medium">{name}</small>
                </div>
                {is_readed !== undefined && (
                    <div className={`place-self-end w-5 row-start-2 ${position === "LEFT" ? "col-start-3" : "col-start-1"}`}>
                        <svg className={`${is_readed ? "fill-primary" : "fill-slate-500"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M11.602 13.7599L13.014 15.1719L21.4795 6.7063L22.8938 8.12051L13.014 18.0003L6.65 11.6363L8.06421 10.2221L10.189 12.3469L11.6025 13.7594L11.602 13.7599ZM11.6037 10.9322L16.5563 5.97949L17.9666 7.38977L13.014 12.3424L11.6037 10.9322ZM8.77698 16.5873L7.36396 18.0003L1 11.6363L2.41421 10.2221L3.82723 11.6352L3.82604 11.6363L8.77698 16.5873Z"></path>
                        </svg>
                    </div>
                )}
                <div className={`bg-white w-fit rounded-lg border border-black/10 px-6 py-4 col-start-2 row-start-2 ${position === "LEFT" ? "rounded-tl-none" : "rounded-tr-none"}`}>{content}</div>
                <img className={`w-11 aspect-square rounded-lg row-start-2 border border-black/10 ${position === "LEFT" ? "col-start-1" : "col-start-3"}`} src={avatar} alt={`${name} photo`} />
            </div>
        </div>
    );
};

export default ConversationCard;
