import useAppStore from '@/store/app.store';
import Modal from '@/features/main/ui/reusable/Modals';
import ConfirmRequest from '@/features/main/ui/reusable/ConfirmRequest';
import useInboxesStore from '@/store/inboxes.store';
import { useGroup } from '@/features/auth/data/api';

type ModalGroupInvitationsListProps = {
    show: boolean;
    toggleShow: () => void;
};

const ModalGroupInvitationsList = ({ show, toggleShow }: ModalGroupInvitationsListProps) => {
    const { inboxes } = useInboxesStore((state) => ({
        inboxes: state.inboxes.filter((item) => item.type === 'group'),
    }));
    return (
        <Modal
            title='Group Invitation'
            show={show}
            toggleShow={toggleShow}
        >
            <div className='flex flex-col overflow-y-auto max-h-72'>
                {inboxes.length > 0 ? (
                    inboxes.map((groupInvitationDataItem, index: number) => (
                        <ConfirmRequest
                            sender_id={groupInvitationDataItem.sender_id}
                            id={groupInvitationDataItem.id}
                            time={groupInvitationDataItem.created_at}
                            type='group'
                            key={`group-invitation-request-${index}`}
                        />
                    ))
                ) : (
                    <div className='h-36 w-[450px] flex justify-center items-center pb-5'>
                        <div className='text-sm text-slate-500'>Group invitation is empty!</div>
                    </div>
                )}
            </div>
        </Modal>
    );
};

export default ModalGroupInvitationsList;
