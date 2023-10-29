import { IconFillMail, IconFillClock } from '@/shared/Icons';
import Modal from '@/features/main/ui/reusable/Modals';
import Button from '@/features/main/ui/reusable/Button';
import userType from '@/type/userType';
import { useEffect, useState } from 'react';
import timeFormatter from '@/features/main/utils/timeFormatter';
import useGroupsStore from '@/store/groups.store';
import useAppStore from '@/store/app.store';
import useUserStore from '@/store/user.store';
import useContactsStore from '@/store/contacts.store';
import { kickMemberFromGroup, postFriendRequest, setMemberAsAnAdmin } from '@/features/auth/data/api';

type ModalMemberInfoProps = {
    show: boolean;
    toggleShow: () => void;
    data: userType;
};

const ModalMemberInfo = ({ data, show, toggleShow }: ModalMemberInfoProps) => {
    const addFriendHandler = async (data: userType) => {
        if (!confirm(`Send friend request to ${data.name}?`)) return;

        try {
            await postFriendRequest({ id: data.id, currentUserId: useUserStore.getState().user.id });
        } catch (error: any) {
            alert('Failed to send friend request!');
        }
    };

    const onKickMemberHandler = async (groupId: string | null, data: userType, callbacks: (() => void)[]) => {
        if (!groupId) return;
        if (!confirm(`Kick ${data.name} from this group?`)) return;

        try {
            await kickMemberFromGroup(groupId, data.id);
            useGroupsStore.getState().removeMember(groupId, data.id);
            callbacks.forEach((callback) => callback());
        } catch (error: any) {
            alert('Failed to kick member from group');
        }
    };

    const onSetMemberAsAdminHandler = async (groupId: string | null, data: userType) => {
        if (!confirm(`Set ${data.name} as an admin?`)) return;

        useGroupsStore.getState().setMemberAsAdmin(groupId, data.id);
        try {
            await setMemberAsAnAdmin(groupId, data.id);
        } catch (error: any) {
            useGroupsStore.getState().deleteAdmin(groupId, data.id);
        }
    };
    return (
        <Modal
            title='Member info'
            subtitle='Profile details'
            show={show}
            toggleShow={toggleShow}
        >
            <div className='max-w-[450px] flex flex-col gap-y-8 p-5 pt-0 min-w-[400px]'>
                <div className='flex flex-col items-center gap-y-1'>
                    <img
                        className='rounded-full w-20'
                        src={
                            data.avatar
                                ? `${process.env.NEXT_PUBLIC_API_URL}${data.avatar}`
                                : '/assets/illustrations/avatar-empty.svg'
                        }
                        alt='Your photo profile'
                    />
                    <h1 className='font-medium text-slate-800'>{data.name}</h1>
                    <small className='text-xs text-slate-500'>@{data.id}</small>
                </div>
                <p className='text-slate-800 text-sm line-clamp-5 overflow-auto'>
                    {data.description || 'No description'}
                </p>
                <div className='flex flex-col gap-y-2'>
                    <label
                        className='flex items-center gap-x-2'
                        title='Email address'
                    >
                        <div className='w-4 first:fill-slate-800'>
                            <IconFillMail />
                        </div>
                        <small className='text-slate-800 text-sm'>{data.email}</small>
                    </label>
                    <label
                        className='flex items-center gap-x-2'
                        title='Joined at'
                    >
                        <div className='w-4 first:fill-slate-800'>
                            <IconFillClock />
                        </div>
                        <small className='text-slate-800 text-sm'>Joined at {timeFormatter(data.joined_at)}</small>
                    </label>
                </div>
                <div className='flex flex-col gap-y-3'>
                    {useUserStore.getState().user.id !== data.id &&
                        useContactsStore.getState().findContact(data.id) === undefined && (
                            <Button
                                displayText='Add friend'
                                variant='PRIMARY'
                                action={() => addFriendHandler(data)}
                            />
                        )}

                    {useGroupsStore
                        .getState()
                        .isAdmin(useUserStore.getState().user.id, useAppStore.getState().activeTargetId) &&
                        useUserStore.getState().user.id !== data.id &&
                        !useGroupsStore.getState().isAdmin(data.id, useAppStore.getState().activeTargetId) && (
                            <div className='flex gap-x-4'>
                                <Button
                                    displayText='Kick'
                                    variant='BORDER-PRIMARY'
                                    action={() =>
                                        onKickMemberHandler(useAppStore.getState().activeTargetId, data, [
                                            () => toggleShow(),
                                        ])
                                    }
                                />

                                <Button
                                    displayText='Set as admin'
                                    variant='PRIMARY'
                                    action={() =>
                                        onSetMemberAsAdminHandler(useAppStore.getState().activeTargetId, data)
                                    }
                                />
                            </div>
                        )}
                </div>
            </div>
        </Modal>
    );
};

export default ModalMemberInfo;
