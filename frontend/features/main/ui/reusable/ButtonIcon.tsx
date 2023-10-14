type ButtonIconProps = {
    action?: () => void;
    icon: React.JSX.Element;
    active?: boolean;
    notificationCount?: number;
    type?: 'button' | 'submit';
};

const ButtonIcon = ({
    action,
    icon,
    active,
    notificationCount,
    type = 'button',
}: ButtonIconProps) => {
    return (
        <button
            className='relative flex items-center justify-center group w-7 aspect-square'
            type={type}
            onClick={() => (action ? action() : {})}
        >
            <div
                className={`${
                    active
                        ? 'first:fill-primary'
                        : 'first:fill-slate-800 hover:first:fill-primary'
                } w-full`}
            >
                {icon}
            </div>

            {notificationCount && notificationCount > 0 && (
                <div className='absolute flex items-center justify-center w-4 text-xs text-center text-white rounded-full aspect-square -top-1 -right-1 bg-primary'>
                    <div>{notificationCount}</div>
                </div>
            )}
        </button>
    );
};

export default ButtonIcon;
