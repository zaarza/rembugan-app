import useAppStore from '@/store/app.store';
import Modal from '@/features/main/ui/reusable/Modals';
import ConfirmRequest from '@/features/main/ui/reusable/ConfirmRequest';

type ModalGroupInvitationsListProps = {
  show: boolean;
  toggleShow: () => void;
};

const ModalGroupInvitationsList = ({
  show,
  toggleShow,
}: ModalGroupInvitationsListProps) => {
  const { groupInvitationData } = useAppStore((state) => ({
      groupInvitationData: state.inbox.filter(
          (item) => item.type === 'GROUP'
      ),
  }));
  return (
      <Modal
          title='Group Invitation'
          show={show}
          toggleShow={toggleShow}
      >
          <div className='flex flex-col overflow-y-auto max-h-72'>
              {groupInvitationData.length > 0 ? (
                  groupInvitationData.map(
                      (groupInvitationDataItem, index: number) => (
                          <ConfirmRequest
                              id={groupInvitationDataItem.id}
                              name={groupInvitationDataItem.name}
                              time={groupInvitationDataItem.time}
                              profilePicturePath={
                                  groupInvitationDataItem.profilePicturePath
                              }
                              type='GROUP'
                              key={`group-invitation-request-${index}`}
                          />
                      )
                  )
              ) : (
                  <div className='h-36 w-[450px] flex justify-center items-center pb-5'>
                      <div className='text-sm text-slate-500'>
                          Group invitation is empty!
                      </div>
                  </div>
              )}
          </div>
      </Modal>
  );
};

export default ModalGroupInvitationsList;