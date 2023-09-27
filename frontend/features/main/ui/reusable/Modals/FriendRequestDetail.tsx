import { IconFillMail, IconFillClock } from '@/shared/Icons';
import Modal from '@/features/main/ui/reusable/Modals';
import Button from '@/features/main/ui/reusable/Button';

type ModalFriendRequestDetailProps = {
  id: string;
  show: boolean;
  toggleShow: () => void;
};

const ModalFriendRequestDetail = ({
  id,
  show,
  toggleShow,
}: ModalFriendRequestDetailProps) => {
  return (
      <Modal
          title='Friend request'
          subtitle='Profile details'
          show={show}
          toggleShow={toggleShow}
      >
          <div className='max-w-[450px] flex flex-col gap-y-8 p-5 pt-0'>
              <div className='flex flex-col items-center gap-y-1'>
                  <img
                      className='rounded-full w-20'
                      src='/assets/images/avatar-dummy.png'
                      alt='Your photo profile'
                  />
                  <h1 className='font-medium text-slate-800'>Lorem</h1>
                  <small className='text-xs text-slate-500'>
                      @loremipsu123
                  </small>
              </div>
              <p className='text-center text-slate-800 text-sm line-clamp-5 overflow-auto'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Similique minima vitae illum dolorem beatae, dolore aliquid,
                  excepturi ipsam labore quae, quis tenetur earum. Similique,
                  cupiditate quae ea doloribus eaque repudiandae placeat
                  maxime. Nihil esse ducimus obcaecati voluptates! Impedit
                  eligendi ullam animi ratione cum, tenetur veniam ipsam neque
                  eos non delectus similique harum aliquam? Eius dignissimos
                  eaque quod laboriosam accusamus hic, sed repellat sequi
                  placeat unde! Consectetur voluptatem a vero totam similique,
                  iusto eos esse! Vel, accusantium rerum? Modi, est similique,
                  harum quasi commodi quisquam ad sunt perspiciatis eius ipsam
                  explicabo veniam? Nostrum id, quae pariatur eum accusamus
                  explicabo asperiores necessitatibus?
              </p>
              <div className='flex flex-col gap-y-2'>
                  <label
                      className='flex items-center gap-x-2'
                      title='Email address'
                  >
                      <div className='w-4 first:fill-slate-800'>
                          <IconFillMail />
                      </div>
                      <small className='text-slate-800 text-sm'>
                          Samsudin@email.com
                      </small>
                  </label>
                  <label
                      className='flex items-center gap-x-2'
                      title='Joined at'
                  >
                      <div className='w-4 first:fill-slate-800'>
                          <IconFillClock />
                      </div>
                      <small className='text-slate-800 text-sm'>
                          Joined at 1695352333298
                      </small>
                  </label>
              </div>
              <div className='flex flex-col gap-y-3'>
                  <small className='text-slate-800 font-medium text-sm'>
                      Want to be your friend list
                  </small>
                  <div className='flex gap-x-4'>
                      <Button
                          displayText='Reject'
                          variant='BORDER-PRIMARY'
                          action={toggleShow}
                      />
                      <Button
                          displayText='Accept'
                          variant='PRIMARY'
                          type='submit'
                      />
                  </div>
              </div>
          </div>
      </Modal>
  );
};

export default ModalFriendRequestDetail;