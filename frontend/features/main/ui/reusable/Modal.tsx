import { createPortal } from "react-dom";
import { useState, useEffect } from "react";

import ButtonIcon from "@/features/main/ui/reusable/ButtonIcon";
import CloseSvg from "@/shared/icons/Close";

type ModalProps = {
    title: string;
    subtitle?: string;
    show: boolean;
    toggleShow: () => void;
    children: any;
};

const Modal = ({ title, subtitle, show, toggleShow, children }: ModalProps) => {
    const [documentReady, setDocumentReady] = useState<boolean>(false);

    useEffect(() => {
        setDocumentReady(true);
    }, []);

    if (show && documentReady) {
        return (
            <>
                {createPortal(
                    <div className="absolute top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black/50 min-w-fit overflow-auto">
                        <div className="flex flex-col overflow-hidden bg-white border rounded-lg gap-y-5 border-black/10">
                            <div className="p-5 pb-0">
                                <div className="flex justify-between">
                                    <h1 className="text-base font-semibold text-slate-800">{title}</h1>
                                    <ButtonIcon icon={<CloseSvg />} action={toggleShow} />
                                </div>
                                {subtitle && <small className="text-xs text-slate-500">{subtitle}</small>}
                            </div>
                            {children}
                        </div>
                    </div>,
                    document.body
                )}
            </>
        );
    }
};

export default Modal;
