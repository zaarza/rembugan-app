import { ReactNode } from "react";

type MenuButtonProps = {
    action?: () => any,
    notificationCount?: number,
    children: {
        svgIcon: any
    },
    img?: never,
    alt?: never,
    className?: string,
    active?: boolean
} | {
    action?: () => any,
    notificationCount?: number,
    children?: {
        svgIcon: never
    },
    img?: string,
    alt?: string,
    className?: string,
    active?: boolean
}

const MenuButton = ({ children, action, notificationCount = 0, img, alt, className, active}: MenuButtonProps) => {
    return (
        <button className={`group w-11 aspect-square relative flex justify-center items-center ${ className }`} type="button"  onClick={ action }>
            { children?.svgIcon && <div className={`first:group-hover:fill-primary first:w-7 first:fill-slate-800 first:duration-300 ${active && "first:fill-primary"}`}>{ children.svgIcon }</div> } 
            { img && <img className="w-full" src={ img } alt={ alt } /> }
            { notificationCount > 0 && !active && <span className="w-4 absolute right-[5px] top-1 aspect-square bg-primary rounded-full text-white text-xs">{ notificationCount }</span>}
        </button>
    )
};

export default MenuButton;