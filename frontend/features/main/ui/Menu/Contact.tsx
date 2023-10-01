/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import { IconFillUserAdd, IconLineMail } from '@/shared/Icons';
import Button from '@/features/main/ui/reusable/Button';
import ButtonIcon from '@/features/main/ui/reusable/ButtonIcon';
import ModalAddContact from '@/features/main/ui/reusable/Modals/AddContact';
import Searchbar from '@/features/main/ui/reusable/Searchbar';
import MenuItem from '@/features/main/ui/Menu/Item';
import contactType from '@/features/main/type/contact';
import confirmRequestType from '@/features/main/type/confirmRequest';
import ModalFriendRequestList from '@/features/main/ui/reusable/Modals/FriendRequestList';

const MenuContacts = () => {
  const [contacts, setContacts] = useState<contactType[]>([
    //   {
    //       name: 'Samsudin',
    //       status: 'Available',
    //       profilePicturePath: '/assets/images/avatar-dummy.png',
    //   },
    //   {
    //       name: 'Budi',
    //       status: 'Busy',
    //       profilePicturePath: '/assets/images/avatar2-dummy.png',
    //   },
  ]);
  const [query, setQuery] = useState<string>('');
  const [showAddContactModal, setShowAddContactModal] =
      useState<boolean>(false);
  const [showModalFriendRequest, setShowModalFriendRequest] =
      useState<boolean>(false);
  const [friendRequests, setFriendRequests] = useState<confirmRequestType[]>([
      // {
      //     id: '1',
      //     name: 'Samsudin',
      //     time: 1694836137714,
      //     profilePicturePath: '/assets/images/avatar-dummy.png',
      //     type: 'FRIEND',
      // },
      // {
      //     id: '2',
      //     name: 'Bagas',
      //     time: 1694836137714,
      //     profilePicturePath: '/assets/images/avatar2-dummy.png',
      //     type: 'FRIEND',
      // },
  ]);

  const submitQuery = (event: any) => {
      event.preventDefault();
  };

  useEffect(() => {
      // TODO: Api integration for query
  }, [query]);

  return (
      <>
          <div className='flex flex-col w-full h-full relative'>
              <div className='sticky top-0 z-10 flex flex-col p-6 bg-white gap-y-5'>
                  <div className='flex justify-between'>
                      <h1 className='text-xl font-semibold text-slate-800'>
                          Contacts
                      </h1>
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
                  {contacts.length > 0 ? contacts.map((contactItem, index: number) => (
                      <MenuItem
                          name={contactItem.name}
                          message={contactItem.status}
                          profilePicturePath={contactItem.profilePicturePath}
                          key={`message-${index}`}
                          action={() => {}}
                      />
                  )) : <div className='flex justify-center items-center py-5 px-6 m-auto absolute top-[48%] left-0 right-0'>
                  <div className='text-sm text-slate-500 text-center'>
                      You don't have any contact, try <button type="button"  className='cursor-pointer text-primary underline underline-offset-2' onClick={() => setShowAddContactModal(true)}>adding a new contact</button>
                  </div>
              </div>}
              </div>

              <div className='sticky p-6 mt-auto mb-9 lg:mb-0'>
                  <Button
                      variant='PRIMARY'
                      action={() =>
                          setShowModalFriendRequest(!showModalFriendRequest)
                      }
                  >
                      <div className='flex justify-center gap-x-5'>
                          <div className='w-5 first:fill-white'>
                              <IconLineMail />
                          </div>
                          <span className='text-sm text-white'>
                              Friend Request
                          </span>
                      </div>
                  </Button>

                  <ModalFriendRequestList
                      show={showModalFriendRequest}
                      toggleShow={() =>
                          setShowModalFriendRequest(
                              !setShowModalFriendRequest
                          )
                      }
                  />
              </div>

              <ModalAddContact
                  show={showAddContactModal}
                  toggleShow={() =>
                      setShowAddContactModal(!showAddContactModal)
                  }
              />
          </div>
      </>
  );
};

export default MenuContacts;