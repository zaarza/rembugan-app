import ConfirmRequestProps from "@/features/main/type/confirmRequest";
import SearchUserSvg from "@/shared/icons/SearchUser";

type confirmationButtonProps = {
    text?: string;
    children?: any;
    variant: "OUTLINE" | "FILL";
    action: () => void;
};

const ConfirmationButton = ({ text, variant, action, children }: confirmationButtonProps) => {
    return (
        <button className={`hover:brightness-95 rounded-lg px-4 py-2 border text-xs ${variant === "FILL" ? "bg-primary text-white border-black/10" : "border-primary text-primary"}`} onClick={() => action()}>
            {text || children}
        </button>
    );
};

const ConfirmRequest = ({ id, name, time, profilePicturePath, type }: ConfirmRequestProps) => {
    const rejectRequestHandler = (id: string, type: "FRIEND" | "GROUP") => {
        console.log("Reject");
    };

    const acceptRequestHandler = (id: string, type: "FRIEND" | "GROUP") => {
        console.log("Accept");
    };

    const viewDetailsHandler = (id: string, type: "FRIEND" | "GROUP") => {
        console.log("view");
    };

    return (
        <div className="flex gap-x-5 px-6 py-4 bg-white hover:bg-primary/5">
            <img className="w-11 h-11 rounded-lg border border-black/10" src={profilePicturePath} alt={`${name} profile picture`} />
            <div className="flex flex-col gap-y-2">
                <h1 className="text-sm text-slate-800 font-medium whitespace-nowrap">{type === "FRIEND" ? `${name} sent you a friend request` : `You are invited to join ${name}`}</h1>
                <h2 className="text-xs text-slate-500">{time}</h2>
                <div className="flex gap-x-3">
                    <ConfirmationButton text="Reject" variant="OUTLINE" action={() => rejectRequestHandler(id, type)} />
                    <ConfirmationButton text="Reject" variant="FILL" action={() => acceptRequestHandler(id, type)} />
                    <ConfirmationButton variant="OUTLINE" action={() => viewDetailsHandler(id, type)}>
                        <div className="first:fill-primary w-4">
                            <SearchUserSvg />
                        </div>
                    </ConfirmationButton>
                </div>
            </div>
        </div>
    );
};

export default ConfirmRequest;