import { useRef, useState } from 'react';
import Modal from '@/features/main/ui/reusable/Modals';
import Button from '@/features/main/ui/reusable/Button';
import Searchbar from '@/features/main/ui/reusable/Searchbar';
import contactType from '@/type/contactType';
import userType from '@/type/userType';
import useContactsStore from '@/store/contacts.store';
import { IconLineClose } from '@/shared/Icons';
import ButtonIcon from '../ButtonIcon';
import { postGroupInvitation } from '@/features/auth/data/api';
import useGroupsStore from '@/store/groups.store';
import useAppStore from '@/store/app.store';

type ModalInviteContactsProps = {
    show: boolean;
    toggleShow: () => void;
};

const ContactItem = ({
    data,
    selectHandler,
    unselectHandler,
    isSelected,
}: {
    data: userType;
    selectHandler: () => void;
    unselectHandler: () => void;
    isSelected: boolean;
}) => {
    return (
        <div className='flex gap-x-5 items-center'>
            <img
                className='w-12 aspect-square rounded-lg'
                src={
                    data.avatar
                        ? `${process.env.NEXT_PUBLIC_API_URL}/${data.avatar}`
                        : '/assets/illustrations/avatar-empty.svg'
                }
                alt=''
            />
            <div className='flex flex-col gap-y-2'>
                <span className='text-slate-800 text-xs'>{data.name}</span>
                <span className='text-slate-500 text-xs'>{data.status}</span>
            </div>
            <button
                className='ml-auto h-fit bg-primary rounded-lg px-2 py-1 text-xs text-white hover:brightness-95'
                onClick={() => (isSelected ? unselectHandler() : selectHandler())}
            >
                {isSelected ? 'Unselect' : 'Select'}
            </button>
        </div>
    );
};

const SelectedContacts = ({ data, unselectHandler }: { data: userType; unselectHandler: () => void }) => (
    <div className='flex flex-col items-center relative'>
        <img
            className='rounded-lg w-12 aspect-square'
            src={
                data.avatar
                    ? `${process.env.NEXT_PUBLIC_API_URL}/${data.avatar}`
                    : '/assets/illustrations/avatar-empty.svg'
            }
            alt=''
        />
        <small>{data.name}</small>
        <button
            className='absolute w-4 aspect-square overflow-hidden flex justify-center items-center bg-primary rounded-full -top-1 -right-1 fill-white'
            onClick={() => unselectHandler()}
        >
            <IconLineClose />
        </button>
    </div>
);

const ModalInviteContacts = ({ show, toggleShow }: ModalInviteContactsProps) => {
    const [query, setQuery] = useState<string>('');
    const [selectedContacts, setSelectedContacts] = useState<contactType[]>([]);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const submitHandler = async () => {
        const groupId = useAppStore.getState().activeTargetId;
        if (!groupId) return;
        if (selectedContacts.length === 0) return;

        if (!confirm(`Invite ${selectedContacts.length} contact to join this group?`)) {
            return;
        }

        setIsSubmitting(true);

        try {
            const usersId = selectedContacts.map((selectedContactItem) => selectedContactItem.user_id);
            await postGroupInvitation(groupId, usersId);
            alert(`Invite ${usersId.length} contacts success!`);
            toggleShow();
        } catch (error: any) {
            console.error(error);
            alert('Send invitation failed!');
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <Modal
            title='Invite contacts'
            subtitle='Select at least one contact to invite'
            show={show}
            toggleShow={toggleShow}
        >
            <div className='p-5 pt-0 flex flex-col gap-y-5'>
                <Searchbar
                    name='name'
                    placeholder='Search contact'
                    value={query}
                    setValue={(event) => setQuery(event.target.value)}
                />

                {selectedContacts.length > 0 && (
                    <>
                        <div className='flex gap-x-5'>
                            {selectedContacts.map((contact, index) => {
                                return (
                                    <SelectedContacts
                                        key={`selected-${index}`}
                                        data={contact.details}
                                        unselectHandler={() =>
                                            setSelectedContacts([
                                                ...selectedContacts.filter(
                                                    (contactItem) => contactItem.user_id !== contact.user_id
                                                ),
                                            ])
                                        }
                                    />
                                );
                            })}
                        </div>
                        <hr />
                    </>
                )}

                <div className='flex flex-col gap-y-3 max-h-[250px] overflow-y-auto'>
                    {useContactsStore.getState().contacts.map((contactItem, index) => {
                        if (query.length > 0) {
                            if (!contactItem.details.name.toLowerCase().includes(query.toLowerCase())) return;
                        }

                        return (
                            <ContactItem
                                key={`contact-${index}`}
                                data={contactItem.details}
                                isSelected={
                                    selectedContacts.find((item) => item.user_id === contactItem.user_id) !== undefined
                                        ? true
                                        : false
                                }
                                selectHandler={() => setSelectedContacts([...selectedContacts, contactItem])}
                                unselectHandler={() =>
                                    setSelectedContacts([
                                        ...selectedContacts.filter(
                                            (contact) => contact.user_id !== contactItem.user_id
                                        ),
                                    ])
                                }
                            />
                        );
                    })}
                </div>
                <div className='flex gap-x-4'>
                    <Button
                        displayText='Cancel'
                        variant='BORDER-PRIMARY'
                        action={toggleShow}
                    />
                    <Button
                        displayText='Invite'
                        variant='PRIMARY'
                        action={submitHandler}
                        disabled={isSubmitting || selectedContacts.length === 0}
                        type='button'
                    />
                </div>
            </div>
        </Modal>
    );
};

export default ModalInviteContacts;
