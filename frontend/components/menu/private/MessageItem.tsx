import useAppStore from "@/store/app.store";

type MessageItemProps = {
    name: string;
    time: number;
    message: string;
    notificationCount?: number;
    profilePicturePath: string;
};
const MessageItem = ({ name, time, message, notificationCount = 0, profilePicturePath }: MessageItemProps) => {
    const { setShowConversation, setActiveConversationType } = useAppStore((state: any) => ({ setShowConversation: state.setShowConversation, setActiveConversationType: state.setActiveConversationType }));

    return (
        <button
            className="bg-white hover:bg-primary/5 duration-300 flex py-4 px-6 gap-x-5 items-center"
            type="button"
            onClick={() => {
                setShowConversation(true);
                setActiveConversationType("PRIVATE");
            }}
        >
            <div className="w-[54px] h-[54px] rounded-lg overflow-hidden">
                <img className="w-full" src={profilePicturePath} alt="" />
            </div>
            <div className="flex flex-col items-start gap-y-1 lg:w-[80%] w-full">
                <div className="flex justify-between w-full items-start">
                    <h1 className="font-medium text-base text-slate-800">{name}</h1>
                    <small className="text-xs text-black/40">{time}</small>
                </div>
                <div className="flex justify-between w-full items-start">
                    <h2 className="text-sm text-slate-800 line-clamp-1 overflow-clip text-left max-w-[90%]">{message}</h2>
                    <small className={`bg-primary rounded-full w-5 aspect-square text-white justify-center items-center relative hidden ${notificationCount > 0 && "flex"}`}>
                        <span className="absolute">{notificationCount}</span>
                    </small>
                </div>
            </div>
        </button>
    );
};

export default MessageItem;
