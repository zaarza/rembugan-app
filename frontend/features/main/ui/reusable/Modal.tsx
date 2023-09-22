import { createPortal } from "react-dom";

import ButtonIcon from "@/features/main/ui/reusable/ButtonIcon";
import CloseSvg from "@/shared/icons/Close";

type ModalProps = {
    title: string;
    show: boolean;
    toggleShow: () => void;
    children: any;
};

const Modal = ({ title, show, toggleShow, children }: ModalProps) => {
    if (show) {
        return (
            <>
                {createPortal(
                    <div className="absolute top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black/50">
                        <div className="flex flex-col overflow-hidden bg-white border rounded-lg gap-y-5 border-black/10">
                            <div className="flex justify-between px-5 pt-5">
                                <h1 className="text-base font-semibold text-slate-800">{title}</h1>
                                <ButtonIcon icon={<CloseSvg />} action={toggleShow} />
                            </div>
                            {children}
                        </div>
                    </div>, document.body
                )}
            </>
        );
    }
};

export default Modal;
