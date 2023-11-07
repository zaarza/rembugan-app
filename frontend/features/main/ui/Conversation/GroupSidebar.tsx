import { useEffect, useState } from 'react';
import {
    IconLineArrowLeft,
    IconLineMenuList,
    IconFillMail,
    IconFillClock,
    IconFillSmile,
    IconFillGroup,
    IconFillAdmin,
    IconFillUserSearch,
} from '@/shared/Icons';
import useOnClickOutside from '@/features/main/hooks/useOnClickOutside';
import ButtonIcon from '@/features/main/ui/reusable/ButtonIcon';
import ModalInviteContacts from '@/features/main/ui/reusable/Modals/InviteContacts';
import ModalMemberInfo from '@/features/main/ui/reusable/Modals/MemberInfo';
import ModalUpdateGroupInfo from '@/features/main/ui/reusable/Modals/UpdateGroupInfo';
import timeFormatter from '@/features/main/utils/timeFormatter';
import { leaveGroup, useUser } from '@/features/auth/data/api';
import useGroupsStore from '@/store/groups.store';
import useAppStore from '@/store/app.store';
import useUserStore from '@/store/user.store';

type GroupSidebarProps = {
    data: {
        id: string;
        name: string;
        description: string | null;
        membership: number;
        created_by: string;
        createdAt: number;
        avatar: string | null;
    };
    show: boolean;
    toggleSidebar: () => void;
};

const GroupMemberCard = ({
    userId,
    showDetailModalHandler,
}: {
    userId: string;
    showDetailModalHandler: () => void;
}) => {
    const { data, isLoading, error } = useUser(userId);
    const [showDetail, setShowDetail] = useState<boolean>(false);

    if (data && !isLoading && !error) {
        return (
            <>
                <div className='flex gap-x-4 items-center w-full'>
                    <img
                        className='w-12 rounded-lg'
                        src={
                            data.data.avatar
                                ? `${process.env.NEXT_PUBLIC_API_URL}${data.data.avatar}`
                                : '/assets/illustrations/avatar-empty.svg'
                        }
                        alt=''
                    />
                    <div className='flex flex-col justify-between gap-y-1'>
                        <span className='text-slate-800 font-medium text-xs'>{data.data.name}</span>
                        <span className='text-slate-500 text-xs'>Joined at {timeFormatter(data.data.joined_at)}</span>
                    </div>
                    <button
                        className='ml-auto w-8 px-2 py-1 aspect-square hover:brightness-95 rounded-lg border text-xs border-primary'
                        onClick={() => setShowDetail(true)}
                    >
                        <div className='first:fill-primary'>
                            <IconFillUserSearch />
                        </div>
                    </button>
                </div>
                <ModalMemberInfo
                    data={data.data}
                    show={showDetail}
                    toggleShow={() => setShowDetail(false)}
                />
            </>
        );
    }
};

const GroupSidebar = ({ data, show, toggleSidebar }: GroupSidebarProps) => {
    const [showAction, setShowAction] = useState<boolean>(false);
    const [showModalMemberInfo, setShowModalMemberInfo] = useState<boolean>(false);
    const [showModalInviteContacts, setShowModalInviteContacts] = useState<boolean>(false);
    const [showModalUpdateGroupInfo, setShowModalUpdateGroupInfo] = useState<boolean>(false);
    const actionRef = useOnClickOutside(() => setShowAction(false));
    const { group } = useGroupsStore((state) => ({ group: state.groups[data.id] }));
    const onLeaveGroupHandler = async (id: string) => {
        if (!confirm('Leave this group?')) {
            return;
        }

        useAppStore.setState({
            activeTargetId: null,
            activeConversationId: null,
            showConversation: false,
        });

        // Delete group object from store
        const currentGroups = useGroupsStore.getState().groups;
        const group = currentGroups[id];
        delete currentGroups[id];
        useGroupsStore.setState({ groups: currentGroups });
        try {
            await leaveGroup(id);
        } catch (error: any) {
            useGroupsStore.setState({ groups: { ...currentGroups, group } });
            alert('Failed to leave group');
        }
    };

    return (
        <>
            <div
                className={`flex fixed h-full flex-col gap-y-10 px-5 py-3 md:static right-0 top-0 border-l border-l-black/10 md:border-0 bg-white w-[80%] max-w-[340px] z-20 ${
                    show ? '-mr-0 duration-300' : '-mr-[9999px] duration-300'
                } overflow-auto`}
            >
                <div className='flex items-center justify-between title'>
                    <ButtonIcon
                        icon={<IconLineArrowLeft />}
                        action={() => toggleSidebar()}
                    />
                    <div className='flex flex-col gap-y-1'>
                        <h1 className='text-sm font-semibold text-slate-800'>Group Information</h1>
                        <h2 className='text-xs text-slate-800'>Detail information about this group</h2>
                    </div>
                    <div className='relative'>
                        <ButtonIcon
                            icon={<IconLineMenuList />}
                            action={() => setShowAction(!showAction)}
                        />

                        <div
                            className={`bg-white overflow-hidden rounded-lg border border-black/10 absolute right-0 top-[50px] ${
                                showAction ? 'block' : 'hidden'
                            }`}
                            ref={actionRef}
                        >
                            {useGroupsStore.getState().isAdmin(useUserStore.getState().user.id, data.id) && (
                                <>
                                    <div
                                        className='py-3 px-5 text-center cursor-pointer text-slate-800 whitespace-nowrap bg-white hover:brightness-95'
                                        onClick={() => setShowModalInviteContacts(true)}
                                    >
                                        Invite contacts
                                    </div>
                                    <div
                                        className='py-3 px-5 text-center cursor-pointer text-slate-800 whitespace-nowrap bg-white hover:brightness-95'
                                        onClick={() => setShowModalUpdateGroupInfo(true)}
                                    >
                                        Change group info
                                    </div>
                                </>
                            )}
                            <div
                                className='py-3 px-5 cursor-pointer text-center text-red-500 whitespace-nowrap bg-white hover:brightness-95'
                                onClick={() => onLeaveGroupHandler(data.id)}
                            >
                                Leave group
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-y-3'>
                    <img
                        className='rounded-lg self-center max-w-[100px] w-full min-w-[24px]'
                        src={
                            data.avatar
                                ? `${process.env.NEXT_PUBLIC_API_URL}/${data.avatar}`
                                : '/assets/illustrations/avatar-empty.svg'
                        }
                        alt=''
                    />
                    <div className='flex flex-col items-center gap-y-1'>
                        <h1 className='font-semibold text-slate-800'>{data.name || ''}</h1>
                        <h2 className='text-xs text-slate-500'>@{data.id || ''}</h2>
                    </div>
                </div>
                <div className='flex flex-col gap-y-1'>
                    <h1 className='font-medium text-sm text-slate-800'>Group Description</h1>
                    <h2 className='text-xs text-slate-800'>{data.description || 'No description'}</h2>
                </div>
                <div className='flex flex-col gap-y-1'>
                    <h3 className='font-medium text-sm text-slate-800'>More Information</h3>
                    <div className='flex flex-col gap-y-2'></div>

                    <div className='flex flex-col gap-y-2'>
                        <span
                            title='Membership'
                            className='flex items-center gap-x-3'
                        >
                            <div className='w-5 first:fill-slate-800'>
                                <IconFillGroup />
                            </div>
                            <p className='text-xs text-slate-800'>{data.membership} members</p>
                        </span>
                        <span
                            title='Joined at'
                            className='flex items-center gap-x-3'
                        >
                            <div className='w-5 first:fill-slate-800'>
                                <IconFillClock />
                            </div>
                            <p className='text-xs text-slate-800'>
                                Created at {data.createdAt && timeFormatter(data.createdAt)}
                            </p>
                        </span>
                        <span
                            title='Creator'
                            className='flex items-center gap-x-3'
                        >
                            <div className='w-5 first:fill-slate-800'>
                                <IconFillAdmin />
                            </div>
                            <p className='text-xs text-slate-800'>{data.created_by}</p>
                        </span>
                    </div>
                </div>

                <div className='flex flex-col gap-y-2'>
                    <h3 className='font-medium text-sm text-slate-800'>Members ({data.membership})</h3>
                    <div className='flex flex-col gap-y-3'>
                        {group &&
                            group[0].members.map((member, index) => (
                                <GroupMemberCard
                                    key={`member-${index}`}
                                    userId={member.user_id}
                                    showDetailModalHandler={() => setShowModalMemberInfo(true)}
                                />
                            ))}
                    </div>
                </div>
            </div>
            <ModalInviteContacts
                show={showModalInviteContacts}
                toggleShow={() => setShowModalInviteContacts(!showModalInviteContacts)}
            />
            <ModalUpdateGroupInfo
                id={data.id}
                show={showModalUpdateGroupInfo}
                toggleShow={() => setShowModalUpdateGroupInfo(!showModalUpdateGroupInfo)}
            />
        </>
    );
};

export default GroupSidebar;
