type ConfirmRequestProps = {
    name: string;
    time: number;
    profilePicturePath: string;
    type: "FRIEND" | "GROUP";
}

const ConfirmRequest = ({ name, time, profilePicturePath, type }: ConfirmRequestProps) => {
    return (
        <div className="flex gap-x-5 px-6 py-4 bg-white hover:bg-primary/5">
            <img className="w-11 h-11 rounded-lg border border-black/10" src={profilePicturePath} alt={`${name} profile picture`} />
            <div className="flex flex-col gap-y-2">
                <h1 className="text-sm text-slate-800 font-medium whitespace-nowrap">
                    {type === "FRIEND" ? 
                        `${name} sent you a friend request`
                        : `You are invited to join ${name}`
                    }
                </h1>
                <h2 className="text-xs text-slate-500">{time}</h2>
                <div className="flex gap-x-3">
                    <button className="hover:bg-gray-50 border border-primary text-primary rounded-lg px-4 py-2 text-xs">Reject</button>
                    <button className="border hover:brightness-95 border-black/10 text-white bg-primary rounded-lg px-4 py-2 text-xs">Accept</button>
                    <button className="hover:bg-gray-50 h-full group border rounded-lg border-primary px-3">
                        <svg className="fill-primary w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 14V22H4C4 17.5817 7.58172 14 12 14ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM21.4462 20.032L22.9497 21.5355L21.5355 22.9497L20.032 21.4462C19.4365 21.7981 18.7418 22 18 22C15.7909 22 14 20.2091 14 18C14 15.7909 15.7909 14 18 14C20.2091 14 22 15.7909 22 18C22 18.7418 21.7981 19.4365 21.4462 20.032ZM18 20C19.1046 20 20 19.1046 20 18C20 16.8954 19.1046 16 18 16C16.8954 16 16 16.8954 16 18C16 19.1046 16.8954 20 18 20Z"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmRequest;
