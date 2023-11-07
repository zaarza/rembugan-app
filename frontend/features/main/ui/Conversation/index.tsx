import useAppStore from '@/store/app.store';
import PrivateConversation from '@/features/main/ui/Conversation/Private';
import GroupConversation from '@/features/main/ui/Conversation/Group';
import Null from './Null';

const Conversation = () => {
    const { activeConversationType, activeTargetId } = useAppStore((state) => ({
        activeConversationType: state.activeConversationType,
        activeTargetId: state.activeTargetId,
    }));

    if (activeTargetId === null) {
        return <Null />;
    }

    if (activeConversationType === 'PRIVATE') {
        return <PrivateConversation />;
    } else {
        return <GroupConversation />;
    }
};

export default Conversation;
