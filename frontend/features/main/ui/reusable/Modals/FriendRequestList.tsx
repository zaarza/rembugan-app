import useAppStore from '@/store/app.store';
import Modal from '@/features/main/ui/reusable/Modals';
import ConfirmRequest from '@/features/main/ui/reusable/ConfirmRequest';

type ModalFriendRequestListProps = {
  show: boolean;
  toggleShow: () => void;
};

const ModalFriendRequestList = ({
  show,
  toggleShow,
}: ModalFriendRequestListProps) => {
  const { friendRequestData } = useAppStore((state) => ({
      friendRequestData: state.inbox.filter((item) => item.type === 'FRIEND'),
  }));
  return (
      <Modal
          title={`Friend Request (${friendRequestData.length})`}
          show={show}
          toggleShow={toggleShow}
      >
          <div className='flex flex-col max-h-72 overflow-y-auto min-w-[450px]'>
              {friendRequestData.length > 0 ? (
                  friendRequestData.map((friendRequestDataItem, index) => (
                      <ConfirmRequest
                          id={friendRequestDataItem.id}
                          name={friendRequestDataItem.name}
                          time={friendRequestDataItem.time}
                          profilePicturePath={
                              friendRequestDataItem.profilePicturePath
                          }
                          type='FRIEND'
                          key={`friend-request-${index}`}
                      />
                  ))
              ) : (
                  <div className='h-36 flex justify-center items-center pb-5'>
                      <div className='text-sm text-slate-800'>
                          Friend request is empty!
                      </div>
                  </div>
              )}
          </div>
      </Modal>
  );
};

export default ModalFriendRequestList;