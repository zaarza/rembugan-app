const MessageCard = ({ name, content, utcTime, avatar, is_readed, flip = false }: {
    name: string,
    content: string,
    utcTime: number,
    avatar: string,
    is_readed?: boolean,
    flip?: boolean
}) => {
    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-[auto_auto_auto] grid-rows-2 w-fit gap-x-4 gap-y-1">
                <div className="flex gap-x-3 self-end place-self-end col-start-2 items-center">
                    <small className="text-xs text-black/40">{utcTime}</small>
                    <small className="text-base font-medium">{name}</small>
                </div>
               { is_readed !== undefined && 
                 <div className={`place-self-end w-5 row-start-2 ${flip ? "col-start-3" : "col-start-1"}`}>
                 <svg className={`${is_readed ? "fill-primary" : "fill-slate-500"}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.602 13.7599L13.014 15.1719L21.4795 6.7063L22.8938 8.12051L13.014 18.0003L6.65 11.6363L8.06421 10.2221L10.189 12.3469L11.6025 13.7594L11.602 13.7599ZM11.6037 10.9322L16.5563 5.97949L17.9666 7.38977L13.014 12.3424L11.6037 10.9322ZM8.77698 16.5873L7.36396 18.0003L1 11.6363L2.41421 10.2221L3.82723 11.6352L3.82604 11.6363L8.77698 16.5873Z"></path></svg>
             </div>
               }
                <div className={`bg-white rounded-lg border border-black/10 px-6 py-4 col-start-2 row-start-2 ${flip ? "rounded-tl-none" : "rounded-tr-none"}`}>
                    {content}
                </div>
                <img
                    className={`w-11 aspect-square rounded-lg row-start-2 border border-black/10 ${flip ? "col-start-1" : "col-start-3"}`}
                    src={avatar}
                    alt={`${name} photo`}
                />
            </div>
        </div>
    );
};

export default MessageCard;
