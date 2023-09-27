import { useState } from 'react';
import Modal from '@/features/main/ui/reusable/Modals';
import Button from '@/features/main/ui/reusable/Button';
import Searchbar from '@/features/main/ui/reusable/Searchbar';

type ModalInviteContactsProps = {
  show: boolean;
  toggleShow: () => void;
};

const ModalInviteContacts = ({
  show,
  toggleShow,
}: ModalInviteContactsProps) => {
  const [query, setQuery] = useState<string>('');

  const submitHandler = () => {
      console.log('ok');
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
                  submitHandler={submitHandler}
              />
              <div className='flex gap-x-5'>
                  <div className='flex flex-col items-center'>
                      <img
                          className='rounded-lg w-12 aspect-square'
                          src='/assets/images/avatar-dummy.png'
                          alt=''
                      />
                      <small>Budi</small>
                  </div>
                  <div className='flex flex-col items-center'>
                      <img
                          className='rounded-lg w-12 aspect-square'
                          src='/assets/images/avatar-dummy.png'
                          alt=''
                      />
                      <small>Budi</small>
                  </div>
              </div>
              <hr />
              <div className='flex flex-col gap-y-3 max-h-[250px] overflow-y-auto'>
                  <div className='flex gap-x-5 items-center'>
                      <img
                          className='w-12 aspect-square rounded-lg'
                          src='/assets/images/avatar-dummy.png'
                          alt=''
                      />
                      <div className='flex flex-col gap-y-2'>
                          <span className='text-slate-800 text-xs'>
                              Samsudin
                          </span>
                          <span className='text-slate-500 text-xs'>
                              Chat only
                          </span>
                      </div>
                      <button className='ml-auto h-fit bg-primary rounded-lg px-2 py-1 text-xs text-white hover:brightness-95'>
                          Unselect
                      </button>
                  </div>
                  <div className='flex gap-x-5 items-center'>
                      <img
                          className='w-12 aspect-square rounded-lg'
                          src='/assets/images/avatar-dummy.png'
                          alt=''
                      />
                      <div className='flex flex-col gap-y-2'>
                          <span className='text-slate-800 text-xs'>
                              Samsudin
                          </span>
                          <span className='text-slate-500 text-xs'>
                              Chat only
                          </span>
                      </div>
                      <button className='ml-auto h-fit bg-primary rounded-lg px-2 py-1 text-xs text-white hover:brightness-95'>
                          Unselect
                      </button>
                  </div>
                  <div className='flex gap-x-5 items-center'>
                      <img
                          className='w-12 aspect-square rounded-lg'
                          src='/assets/images/avatar-dummy.png'
                          alt=''
                      />
                      <div className='flex flex-col gap-y-2'>
                          <span className='text-slate-800 text-xs'>
                              Samsudin
                          </span>
                          <span className='text-slate-500 text-xs'>
                              Chat only
                          </span>
                      </div>
                      <button className='ml-auto h-fit bg-primary rounded-lg px-2 py-1 text-xs text-white hover:brightness-95'>
                          Unselect
                      </button>
                  </div>
                  <div className='flex gap-x-5 items-center'>
                      <img
                          className='w-12 aspect-square rounded-lg'
                          src='/assets/images/avatar-dummy.png'
                          alt=''
                      />
                      <div className='flex flex-col gap-y-2'>
                          <span className='text-slate-800 text-xs'>
                              Samsudin
                          </span>
                          <span className='text-slate-500 text-xs'>
                              Chat only
                          </span>
                      </div>
                      <button className='ml-auto h-fit bg-primary rounded-lg px-2 py-1 text-xs text-white hover:brightness-95'>
                          Unselect
                      </button>
                  </div>
                  <div className='flex gap-x-5 items-center'>
                      <img
                          className='w-12 aspect-square rounded-lg'
                          src='/assets/images/avatar-dummy.png'
                          alt=''
                      />
                      <div className='flex flex-col gap-y-2'>
                          <span className='text-slate-800 text-xs'>
                              Samsudin
                          </span>
                          <span className='text-slate-500 text-xs'>
                              Chat only
                          </span>
                      </div>
                      <button className='ml-auto h-fit bg-primary rounded-lg px-2 py-1 text-xs text-white hover:brightness-95'>
                          Unselect
                      </button>
                  </div>
                  <div className='flex gap-x-5 items-center'>
                      <img
                          className='w-12 aspect-square rounded-lg'
                          src='/assets/images/avatar-dummy.png'
                          alt=''
                      />
                      <div className='flex flex-col gap-y-2'>
                          <span className='text-slate-800 text-xs'>
                              Samsudin
                          </span>
                          <span className='text-slate-500 text-xs'>
                              Chat only
                          </span>
                      </div>
                      <button className='ml-auto h-fit bg-primary rounded-lg px-2 py-1 text-xs text-white hover:brightness-95'>
                          Unselect
                      </button>
                  </div>
                  <div className='flex gap-x-5 items-center'>
                      <img
                          className='w-12 aspect-square rounded-lg'
                          src='/assets/images/avatar-dummy.png'
                          alt=''
                      />
                      <div className='flex flex-col gap-y-2'>
                          <span className='text-slate-800 text-xs'>
                              Samsudin
                          </span>
                          <span className='text-slate-500 text-xs'>
                              Chat only
                          </span>
                      </div>
                      <button className='ml-auto h-fit bg-primary rounded-lg px-2 py-1 text-xs text-white hover:brightness-95'>
                          Unselect
                      </button>
                  </div>
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
                      action={function () {}}
                  />
              </div>
          </div>
      </Modal>
  );
};

export default ModalInviteContacts;