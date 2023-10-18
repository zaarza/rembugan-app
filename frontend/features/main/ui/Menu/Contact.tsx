/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import { IconFillUserAdd, IconLineMail } from '@/shared/Icons';
import Button from '@/features/main/ui/reusable/Button';
import ButtonIcon from '@/features/main/ui/reusable/ButtonIcon';
import ModalAddContact from '@/features/main/ui/reusable/Modals/AddContact';
import Searchbar from '@/features/main/ui/reusable/Searchbar';
import MenuItem from '@/features/main/ui/Menu/Item';
import ModalFriendRequestList from '@/features/main/ui/reusable/Modals/FriendRequestList';
import useContactsStore from '@/store/contacts.store';

const MenuContacts = () => {
    const { contacts, fetch } = useContactsStore((state) => ({ contacts: state.contacts, fetch: state.fetch }));
    const [query, setQuery] = useState<string>('');
    const [showAddContactModal, setShowAddContactModal] = useState<boolean>(false);
    const [showModalFriendRequest, setShowModalFriendRequest] = useState<boolean>(false);

    const submitQuery = (event: any) => {
        event.preventDefault();
    };

    useEffect(() => {
        fetch();
    }, []);

    useEffect(() => {
        // TODO: Api integration for query
        const searchTimeout = setTimeout(() => {
            fetch(query);
        }, 1000);

        return () => {
            clearTimeout(searchTimeout);
        };
    }, [query]);

    return (
        <>
            <div className='flex flex-col w-full h-full relative'>
                <div className='sticky top-0 z-10 flex flex-col p-6 bg-white gap-y-5'>
                    <div className='flex justify-between'>
                        <h1 className='text-xl font-semibold text-slate-800'>Contacts</h1>
                        <ButtonIcon
                            icon={<IconFillUserAdd />}
                            action={() => {
                                setShowAddContactModal(!showAddContactModal);
                            }}
                            active={false}
                        />
                    </div>
                    <Searchbar
                        name='contacts'
                        placeholder='Search contact...'
                        value={query}
                        setValue={(event) => setQuery(event.target.value)}
                        submitHandler={submitQuery}
                    />
                </div>

                <div className='flex flex-col overflow-auto pb-36 h-full'>
                    {contacts.length > 0 ? (
                        contacts.map((contactItem, index: number) => (
                            <MenuItem
                                name={contactItem.details.name}
                                message={contactItem.details.status}
                                profilePicturePath={contactItem.details.avatar}
                                key={`message-${index}`}
                                action={() => {}}
                            />
                        ))
                    ) : (
                        <div className='flex justify-center items-center py-5 px-6 m-auto absolute top-[48%] left-0 right-0'>
                            <div className='text-sm text-slate-500 text-center'>
                                You don't have any contact, try{' '}
                                <button
                                    type='button'
                                    className='cursor-pointer text-primary underline underline-offset-2'
                                    onClick={() => setShowAddContactModal(true)}
                                >
                                    adding a new contact
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className='sticky p-6 mt-auto mb-9 lg:mb-0'>
                    <Button
                        variant='PRIMARY'
                        action={() => setShowModalFriendRequest(!showModalFriendRequest)}
                    >
                        <div className='flex justify-center gap-x-5'>
                            <div className='w-5 first:fill-white'>
                                <IconLineMail />
                            </div>
                            <span className='text-sm text-white'>Friend Request</span>
                        </div>
                    </Button>

                    <ModalFriendRequestList
                        show={showModalFriendRequest}
                        toggleShow={() => setShowModalFriendRequest(!setShowModalFriendRequest)}
                    />
                </div>

                <ModalAddContact
                    show={showAddContactModal}
                    toggleShow={() => setShowAddContactModal(!showAddContactModal)}
                />
            </div>
        </>
    );
};

export default MenuContacts;
