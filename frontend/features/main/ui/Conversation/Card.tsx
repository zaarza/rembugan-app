import { IconLineDoubleCheckMark } from '@/shared/Icons';
import timeFormatter from '@/features/main/utils/timeFormatter';

type ConversationCardProps = {
  name?: string;
  message: string;
  avatar?: string | null;
  position: 'LEFT' | 'RIGHT';
  time: number;
  is_seen?: 0 | 1;
};

const ConversationCard = ({
  name = "",
  message,
  avatar,
  position,
  time,
  is_seen,
}: ConversationCardProps) => {
  return (
      <div className={`flex flex-col max-w-[400px] ${position === 'RIGHT' && 'self-end'}`}>
          <div className='grid grid-cols-[auto_auto_auto] grid-rows-1 w-fit gap-x-4 gap-y-1' >
              <div
                  className={`flex gap-x-3 self-end place-self-end col-start-2 items-center ${
                      position === 'LEFT' && 'flex-row-reverse justify-self-start'
                  }`}
              >
                  <small className='text-xs text-black/40'>{timeFormatter(time)}</small>
                  <small className='text-base font-medium'>{name || ""}</small>
              </div>
              {is_seen != undefined && (
                  <div
                      className={`place-self-end w-5 row-start-2 col-start-1 ${
                          is_seen === 1
                              ? 'first:fill-primary'
                              : 'first:fill-slate-500'
                      }`}
                  >
                      <IconLineDoubleCheckMark />
                  </div>
              )}
              <div
                  className={`w-fit rounded-lg border border-black/10 px-6 py-4 col-start-2 row-start-2 ${
                      position === 'LEFT'
                          ? 'rounded-tl-none bg-primary text-white'
                          : 'rounded-tr-none bg-white text-slate-800 justify-self-end'
                  }`}
              >
                  {message}
              </div>
              <img
                  className={`w-11 aspect-square rounded-lg row-start-2 border border-black/10 ${
                      position === 'LEFT' ? 'col-start-1' : 'col-start-3'
                  }`}
                  src={avatar ? `${process.env.NEXT_PUBLIC_API_URL}avatar` : '/assets/illustrations/avatar-empty.svg' }
                  alt={`${name || ""} profile picture`}
              />
          </div>
      </div>
  );
};

export default ConversationCard;