import useAppStore from '@/store/app.store';
import Modal from '@/features/main/ui/reusable/Modals';
import ConfirmRequest from '@/features/main/ui/reusable/ConfirmRequest';
import useInboxesStore from '@/store/inboxes.store';

type ModalFriendRequestListProps = {
    show: boolean;
    toggleShow: () => void;
};

const ModalFriendRequestList = ({ show, toggleShow }: ModalFriendRequestListProps) => {
    const { friendRequestData } = useInboxesStore((state) => ({
        friendRequestData: state.inboxes.filter((item) => item.type === 'friend'),
    }));
    return (
        <Modal
            title={`Friend Request (${friendRequestData.length})`}
            show={show}
            toggleShow={toggleShow}
        >
            <div className='flex flex-col max-h-72 overflow-y-auto w-[350px]'>
                {friendRequestData.length > 0 ? (
                    friendRequestData.map((friendRequestDataItem, index) => (
                        <ConfirmRequest
                            id={friendRequestDataItem.id}
                            name={friendRequestDataItem.sender_details.name}
                            sender_id={friendRequestDataItem.sender_details.id}
                            time={friendRequestDataItem.created_at}
                            profilePicturePath={friendRequestDataItem.sender_details.avatar}
                            type='friend'
                            key={`friend-request-${index}`}
                        />
                    ))
                ) : (
                    <div className='h-36 flex justify-center items-center pb-5'>
                        <div className='text-sm text-slate-800'>Friend request is empty!</div>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default ModalFriendRequestList;
