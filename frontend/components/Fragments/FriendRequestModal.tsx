import Modal from "@/components/Elements/Modal";
import FriendRequestItem from "@/components/Elements/ConfirmRequest";
import FriendRequest from "@/type/FriendRequest";

type FriendRequestModalProps = {
    data: FriendRequest[];
    show: boolean;
    toggleShow: () => void;
};

const FriendRequestModal = ({ data, show, toggleShow }: FriendRequestModalProps) => {
    return (
        <Modal title={`Friend Request (${data.length})`} show={show} toggleShow={toggleShow}>
            <div className="flex flex-col max-h-72 overflow-y-auto">
                {data.map((dataItem, index) => (
                    <FriendRequestItem name={dataItem.name} time={dataItem.time} profilePicturePath={dataItem.profilePicturePath} key={`friend-request-${index}`} />
                ))}
            </div>
        </Modal>
    );
};

export default FriendRequestModal;
