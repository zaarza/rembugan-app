/* eslint-disable react-hooks/exhaustive-deps */
import { IconFillMail, IconFillClock } from '@/shared/Icons';
import Modal from '@/features/main/ui/reusable/Modals';
import Button from '@/features/main/ui/reusable/Button';
import { useEffect, useState } from 'react';
import { getUserDetailById } from '@/features/auth/data/api';
import userType from '@/type/userType';
import timeFormatter from '@/features/main/utils/timeFormatter';
import useInboxesStore from '@/store/inboxes.store';

type ModalFriendRequestDetailProps = {
    id: string;
    show: boolean;
    toggleShow: () => void;
    acceptRequestHandler: () => Promise<void>;
    rejectRequestHandler: () => Promise<void>;
};

const ModalFriendRequestDetail = ({
    id,
    show,
    toggleShow,
    acceptRequestHandler,
    rejectRequestHandler,
}: ModalFriendRequestDetailProps) => {
    const [data, setData] = useState<userType | null>(null);

    useEffect(() => {
        if (id && show) {
            try {
                getUserDetailById(id).then((response) => {
                    setData(response.data.data);
                });
            } catch (error: any) {
                return;
            }
        }
    }, [show]);

    return (
        <Modal
            title='Friend request'
            subtitle='Profile details'
            show={show}
            toggleShow={toggleShow}
        >
            <div className='min-w-[350px] max-w-[450px] flex flex-col gap-y-8 p-5 pt-0'>
                <div className='flex flex-col items-center gap-y-1'>
                    <img
                        className='rounded-full w-20 aspect-square'
                        src={
                            (data?.avatar && `${process.env.NEXT_PUBLIC_API_URL}${data?.avatar}`) ||
                            '/assets/illustrations/avatar-empty.svg'
                        }
                        alt='Your photo profile'
                    />
                    <h1 className='font-medium text-slate-800'>{data?.name || ''}</h1>
                    <small className='text-xs text-slate-500'>@{data?.id || ''}</small>
                </div>
                {data?.description && (
                    <p className='text-center text-slate-800 text-sm line-clamp-5 overflow-auto'>{data?.description}</p>
                )}
                <div className='flex flex-col gap-y-2'>
                    <label
                        className='flex items-center gap-x-2'
                        title='Email address'
                    >
                        <div className='w-4 first:fill-slate-800'>
                            <IconFillMail />
                        </div>
                        <small className='text-slate-800 text-sm'>{data?.email || ''}</small>
                    </label>
                    <label
                        className='flex items-center gap-x-2'
                        title='Joined at'
                    >
                        <div className='w-4 first:fill-slate-800'>
                            <IconFillClock />
                        </div>
                        <small className='text-slate-800 text-sm'>
                            Joined at {(data?.joined_at && timeFormatter(data.joined_at)) || ''}
                        </small>
                    </label>
                </div>
                <div className='flex flex-col gap-y-3'>
                    <small className='text-slate-800 font-medium text-sm'>Want to be your friend list</small>
                    <div className='flex gap-x-4'>
                        <Button
                            displayText='Reject'
                            variant='BORDER-PRIMARY'
                            action={() => {
                                rejectRequestHandler()
                                toggleShow();
                            }}
                        />
                        <Button
                            displayText='Accept'
                            variant='PRIMARY'
                            action={() => {
                                acceptRequestHandler();
                                toggleShow();
                            }}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ModalFriendRequestDetail;
