type ButtonIconProps = {
    children: any;
    action: () => void;
    active: boolean;
    notificationCount?: number;
};

const ButtonIcon = ({ action, children, active, notificationCount }: ButtonIconProps) => {
    return (
        <button className="group w-7 aspect-square relative flex justify-center items-center" type="button" onClick={() => action()}>
            <div className={`${active ? "first:fill-primary" : "first:fill-slate-800 hover:first:fill-primary"}`}>{children}</div>

            {notificationCount && notificationCount > 0 && (
                <p className="absolute items-center justify-center text-xs w-4 aspect-square flex -top-1 -right-1 rounded-full text-white bg-primary text-center">
                    <div>{notificationCount}</div>
                </p>
            )}
        </button>
    );
};

export default ButtonIcon;
