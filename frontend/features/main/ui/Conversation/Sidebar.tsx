import { useState } from 'react';
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
import useAppStore from '@/store/app.store';
import useOnClickOutside from '@/features/main/hooks/useOnClickOutside';
import ButtonIcon from '@/features/main/ui/reusable/ButtonIcon';
import ModalInviteContacts from '@/features/main/ui/reusable/Modals/InviteContacts';
import ModalMemberInfo from '@/features/main/ui/reusable/Modals/MemberInfo';
import ModalUpdateGroupInfo from '@/features/main/ui/reusable/Modals/UpdateGroupInfo';
import timeFormatter from '@/features/main/utils/timeFormatter';

type ConversationSidebarProps = {
    data: {
        name: string;
        id: number;
        description: string;
        email?: string;
        joinedAt?: number;
        status?: string;
        membership?: number;
        creator?: string;
        createdAt?: number;
    };
    show: boolean;
    toggleSidebar: () => void;
};

const ConversationSidebar = ({
    data,
    show,
    toggleSidebar,
}: ConversationSidebarProps) => {
    const [showAction, setShowAction] = useState<boolean>(false);
    const { activeConversationType } = useAppStore((state) => ({
        activeConversationType: state.activeConversationType,
    }));
    const actionRef = useOnClickOutside(() => setShowAction(false));
    const [showModalMemberInfo, setShowModalMemberInfo] =
        useState<boolean>(false);
    const [showModalInviteContacts, setShowModalInviteContacts] =
        useState<boolean>(false);
    const [showModalUpdateGroupInfo, setShowModalUpdateGroupInfo] =
        useState<boolean>(false);

    return (
        <>
            <div
                className={`flex fixed h-full flex-col gap-y-10 px-5 py-3 md:static right-0 top-0 border-l border-l-black/10 md:border-0 bg-white w-[80%] max-w-[340px] z-20 ${
                    show ? '-mr-0 duration-300' : '-mr-[9999px] duration-300'
                } overflow-auto`}
            >
                {/* TITLE */}
                <div className='flex items-center justify-between title'>
                    <ButtonIcon
                        icon={<IconLineArrowLeft />}
                        action={() => toggleSidebar()}
                    />
                    <div className='flex flex-col gap-y-1'>
                        <h1 className='text-sm font-semibold text-slate-800'>
                            {activeConversationType === 'PRIVATE'
                                ? 'Contact'
                                : 'Group'}{' '}
                            Information
                        </h1>
                        <h2 className='text-xs text-slate-800'>
                            Detail information about this{' '}
                            {activeConversationType === 'PRIVATE'
                                ? 'contact'
                                : 'group'}
                        </h2>
                    </div>
                    <div className='relative'>
                        <ButtonIcon
                            icon={<IconLineMenuList />}
                            action={() => setShowAction(!showAction)}
                        />
                        {activeConversationType === 'PRIVATE' && (
                            <div
                                className={`bg-white overflow-hidden rounded-lg border border-black/10 absolute right-0 top-[50px] ${
                                    showAction ? 'block' : 'hidden'
                                }`}
                                ref={actionRef}
                            >
                                <div className='py-3 px-5 text-red-500 whitespace-nowrap bg-white hover:brightness-95'>
                                    Delete Contact
                                </div>
                            </div>
                        )}

                        {activeConversationType === 'GROUPS' && (
                            <div
                                className={`bg-white overflow-hidden rounded-lg border border-black/10 absolute right-0 top-[50px] ${
                                    showAction ? 'block' : 'hidden'
                                }`}
                                ref={actionRef}
                            >
                                <div
                                    className='py-3 px-5 text-center cursor-pointer text-slate-800 whitespace-nowrap bg-white hover:brightness-95'
                                    onClick={() =>
                                        setShowModalInviteContacts(true)
                                    }
                                >
                                    Invite contacts
                                </div>
                                <div
                                    className='py-3 px-5 text-center cursor-pointer text-slate-800 whitespace-nowrap bg-white hover:brightness-95'
                                    onClick={() =>
                                        setShowModalUpdateGroupInfo(true)
                                    }
                                >
                                    Change group info
                                </div>
                                <div className='py-3 px-5 cursor-pointer text-center text-red-500 whitespace-nowrap bg-white hover:brightness-95'>
                                    Leave group
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* PROFILE */}
                <div className='flex flex-col gap-y-3'>
                    <img
                        className='rounded-lg self-center max-w-[100px] w-full min-w-[24px]'
                        src='/assets/images/avatar2-dummy.png'
                        alt=''
                    />
                    <div className='flex flex-col items-center gap-y-1'>
                        <h1 className='font-semibold text-slate-800'>
                            {data.name}
                        </h1>
                        <h2 className='text-xs text-slate-500'>@{data.id}</h2>
                    </div>
                </div>
                <div className='flex flex-col gap-y-1'>
                    <h1 className='font-medium text-sm text-slate-800'>
                        {activeConversationType === 'PRIVATE'
                            ? 'Contact'
                            : 'Group'}{' '}
                        Description
                    </h1>
                    <h2 className='text-xs text-slate-800'>
                        {data.description}
                    </h2>
                </div>
                <div className='flex flex-col gap-y-1'>
                    <h3 className='font-medium text-sm text-slate-800'>
                        More Information
                    </h3>

                    {activeConversationType === 'PRIVATE' && (
                        <div className='flex flex-col gap-y-2'>
                            <span
                                title='Email address'
                                className='flex items-center gap-x-3'
                            >
                                <div className='w-5 first:fill-slate-800'>
                                    <IconFillMail />
                                </div>
                                <p className='text-xs text-slate-800'>
                                    {data.email}
                                </p>
                            </span>
                            <span
                                title='Joined at'
                                className='flex items-center gap-x-3'
                            >
                                <div className='w-5 first:fill-slate-800'>
                                    <IconFillClock />
                                </div>
                                <p className='text-xs text-slate-800'>
                                    {data.joinedAt &&
                                        timeFormatter(data.joinedAt)}
                                </p>
                            </span>
                            <span
                                title='Status'
                                className='flex items-center gap-x-3'
                            >
                                <div className='w-5 first:fill-slate-800'>
                                    <IconFillSmile />
                                </div>
                                <p className='text-xs text-slate-800'>
                                    {data.status}
                                </p>
                            </span>
                        </div>
                    )}

                    {activeConversationType === 'GROUPS' && (
                        <div className='flex flex-col gap-y-2'>
                            <span
                                title='Membership'
                                className='flex items-center gap-x-3'
                            >
                                <div className='w-5 first:fill-slate-800'>
                                    <IconFillGroup />
                                </div>
                                <p className='text-xs text-slate-800'>
                                    {data.membership} members
                                </p>
                            </span>
                            <span
                                title='Joined at'
                                className='flex items-center gap-x-3'
                            >
                                <div className='w-5 first:fill-slate-800'>
                                    <IconFillClock />
                                </div>
                                <p className='text-xs text-slate-800'>
                                    Created at{' '}
                                    {data.createdAt &&
                                        timeFormatter(data.createdAt)}
                                </p>
                            </span>
                            <span
                                title='Creator'
                                className='flex items-center gap-x-3'
                            >
                                <div className='w-5 first:fill-slate-800'>
                                    <IconFillAdmin />
                                </div>
                                <p className='text-xs text-slate-800'>
                                    {data.creator}
                                </p>
                            </span>
                        </div>
                    )}
                </div>
                {activeConversationType === 'GROUPS' && (
                    <div className='flex flex-col gap-y-2'>
                        <h3 className='font-medium text-sm text-slate-800'>
                            Members ({data.membership})
                        </h3>
                        <div className='flex flex-col gap-y-3'>
                            <div className='flex gap-x-4 items-center w-full'>
                                <img
                                    className='w-12 rounded-lg'
                                    src='/assets/images/avatar-dummy.png'
                                    alt=''
                                />
                                <div className='flex flex-col justify-between gap-y-1'>
                                    <span className='text-slate-800 font-medium text-xs'>
                                        Samsudin
                                    </span>
                                    <span className='text-slate-500 text-xs'>
                                        Joined today
                                    </span>
                                </div>
                                <button
                                    className='ml-auto w-8 px-2 py-1 aspect-square hover:brightness-95 rounded-lg border text-xs border-primary'
                                    onClick={() => setShowModalMemberInfo(true)}
                                >
                                    <div className='first:fill-primary'>
                                        <IconFillUserSearch />
                                    </div>
                                </button>
                            </div>
                            <div className='flex gap-x-4 items-center w-full'>
                                <img
                                    className='w-12 rounded-lg'
                                    src='/assets/images/avatar-dummy.png'
                                    alt=''
                                />
                                <div className='flex flex-col justify-between gap-y-1'>
                                    <span className='text-slate-800 font-medium text-xs'>
                                        Samsudin
                                    </span>
                                    <span className='text-slate-500 text-xs'>
                                        Joined today
                                    </span>
                                </div>
                                <button
                                    className='ml-auto w-8 px-2 py-1 aspect-square hover:brightness-95 rounded-lg border text-xs border-primary'
                                    onClick={() => {}}
                                >
                                    <div className='first:fill-primary'>
                                        <IconFillUserSearch />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <ModalMemberInfo
                id='1'
                show={showModalMemberInfo}
                toggleShow={() => setShowModalMemberInfo(!showModalMemberInfo)}
            />
            <ModalInviteContacts
                show={showModalInviteContacts}
                toggleShow={() =>
                    setShowModalInviteContacts(!showModalInviteContacts)
                }
            />
            <ModalUpdateGroupInfo
                id='1'
                show={showModalUpdateGroupInfo}
                toggleShow={() =>
                    setShowModalUpdateGroupInfo(!showModalUpdateGroupInfo)
                }
            />
        </>
    );
};

export default ConversationSidebar;
