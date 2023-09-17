import H1 from "@/components/Elements/Heading/H1";
import CloseButton from "@/components/Elements/Modal/CloseButton";

type ModalProps = {
    title: string;
    show: boolean;
    toggleShow: () => void;
    children: any;
}

const Modal = ({ title, show, toggleShow, children }: ModalProps) => {
    if (show)
        return (
            <div className="absolute top-0 left-0 z-50 w-full h-full bg-black/50 flex justify-center items-center">
                <div className="bg-white rounded-lg flex flex-col gap-y-5 border border-black/10 overflow-hidden">
                    <div className="flex justify-between px-5 pt-5">
                        <H1 text={title} size="12px" />
                        <CloseButton action={toggleShow}/>
                    </div>

                    { children }
                </div>
            </div>
        );
};

export default Modal;
