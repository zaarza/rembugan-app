/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import { IconLinePlus } from '@/shared/Icons';
import useAppStore from '@/store/app.store';
import Button from '@/features/main/ui/reusable/Button';
import ButtonIcon from '@/features/main/ui/reusable/ButtonIcon';
import ModalCreateNewGroup from '@/features/main/ui/reusable/Modals/CreateNewGroup';
import ModalJoinGroup from '@/features/main/ui/reusable/Modals/JoinGroup';
import Searchbar from '@/features/main/ui/reusable/Searchbar';
import MenuItem from '@/features/main/ui/Menu/Item';
import ModalGroupInvitationsList from '@/features/main/ui/reusable/Modals/GroupInvitationList';
import useGroupsStore from '@/store/groups.store';
import groupChatType from '@/type/groupChatType';
import useUserStore from '@/store/user.store';

type groupType = {
    id: string;
    name: string;
    members: number;
    profilePicturePath?: string;
};

const MenuGroups = () => {
    const { groups } = useGroupsStore((state) => ({ groups: state.groups }));
    const [query, setQuery] = useState<string>('');
    const { setActiveConversationType, setActiveConversationId, setShowConversation } = useAppStore((state) => ({
        setActiveConversationId: state.setActiveConversationId,
        setActiveConversationType: state.setActiveConversationType,
        setShowConversation: state.setShowConversation,
    }));
    const [showCreateNewGroupModal, setShowCreateNewGroupModal] = useState<boolean>(false);
    const [showGroupInvitationModal, setShowGroupInvitationModal] = useState<boolean>(false);

    return (
        <>
            <div className='flex flex-col w-full h-full relative'>
                <div className='sticky top-0 z-10 flex flex-col p-6 bg-white gap-y-5'>
                    <div className='flex justify-between'>
                        <h1 className='text-xl font-semibold text-slate-800'>Groups</h1>
                    </div>
                    <Searchbar
                        name='contacts'
                        placeholder='Search groups...'
                        value={query}
                        setValue={(event) => setQuery(event.target.value)}
                    />
                </div>

                <div className='flex flex-col overflow-auto pb-36 h-full'>
                    {Object.keys(groups).length > 0 ? (
                        Object.keys(groups).map((groupId, index: number) => {
                            const group = groups[groupId];
                            if (!group) return;

                            if (query.length > 0) {
                                if (!group[0].name.toLowerCase().includes(query.toLowerCase())) {
                                    return;
                                }
                            }
                            const lastMessage: groupChatType | undefined =
                                group[0].messages[group[0].messages.length - 1];

                            return (
                                <MenuItem
                                    name={group[0].name}
                                    message={
                                        lastMessage !== undefined
                                            ? `${
                                                  lastMessage.sender_id === useUserStore.getState().user.id
                                                      ? 'You'
                                                      : lastMessage.sender_id
                                              }: ${lastMessage.content}`
                                            : ''
                                    }
                                    profilePicturePath={group[0].avatar}
                                    key={`group-${index}`}
                                    targetId={group[0].id}
                                    conversationId={group[0].id}
                                    type='GROUP'
                                    time={new Date().getTime()}
                                />
                            );
                        })
                    ) : (
                        <div className='flex justify-center items-center py-5 px-6 m-auto absolute top-[48%] left-0 right-0'>
                            <div className='text-sm text-slate-500 text-center'>
                                You doesn't join any group, try{' '}
                                <button
                                    type='button'
                                    className='cursor-pointer text-primary underline underline-offset-2'
                                    onClick={() => setShowCreateNewGroupModal(true)}
                                >
                                    create a group
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className='sticky flex flex-col p-6 mt-auto gap-y-2 mb-9 lg:mb-0'>
                    <Button
                        variant='PRIMARY'
                        action={() => setShowGroupInvitationModal(!showGroupInvitationModal)}
                    >
                        <div className='flex justify-center gap-x-5'>
                            <svg
                                className='w-5 fill-white aspect-square'
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                            >
                                <path d='M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z'></path>
                            </svg>
                            <span className='text-sm text-white'>Group Invitation</span>
                        </div>
                    </Button>

                    <Button
                        variant='PRIMARY'
                        action={() => setShowCreateNewGroupModal(!showCreateNewGroupModal)}
                    >
                        <div className='flex justify-center gap-x-5'>
                            <div className='w-5 first:fill-white'>
                                <IconLinePlus />
                            </div>
                            <span className='text-sm text-white'>Create a New Group</span>
                        </div>
                    </Button>
                </div>
            </div>

            <ModalGroupInvitationsList
                show={showGroupInvitationModal}
                toggleShow={() => setShowGroupInvitationModal(!showGroupInvitationModal)}
            />
            <ModalCreateNewGroup
                show={showCreateNewGroupModal}
                toggleShow={() => setShowCreateNewGroupModal(!showCreateNewGroupModal)}
            />
        </>
    );
};

export default MenuGroups;
