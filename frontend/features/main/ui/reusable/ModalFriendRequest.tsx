import confirmRequestType from "@/features/main/type/confirmRequest";
import ConfirmRequest from "@/features/main/ui/reusable/ConfirmRequest";
import Modal from "@/features/main/ui/reusable/Modal";

type ModalFriendRequestProps = {
    data: confirmRequestType[];
    show: boolean;
    toggleShow: () => void;
};

const ModalFriendRequest = ({ data, show, toggleShow }: ModalFriendRequestProps) => {
    return (
        <Modal title={`Friend Request (${data.length})`} show={show} toggleShow={toggleShow}>
            <div className="flex flex-col max-h-72 overflow-y-auto">
                {data.map((dataItem, index) => (
                    <ConfirmRequest id={data.id} name={dataItem.name} time={dataItem.time} profilePicturePath={dataItem.profilePicturePath} type="FRIEND" key={`friend-request-${index}`} />
                ))}
            </div>
        </Modal>
    );
};

export default ModalFriendRequest;