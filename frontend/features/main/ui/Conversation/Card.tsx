import { IconLineDoubleCheckMark } from '@/shared/Icons';

type ConversationCardProps = {
  name: string;
  content: string;
  avatar: string;
  position: 'LEFT' | 'RIGHT';
  time: number;
  is_readed: boolean;
};

const ConversationCard = ({
  name,
  content,
  avatar,
  position,
  time,
  is_readed,
}: ConversationCardProps) => {
  return (
      <div className={`flex flex-col ${position === 'RIGHT' && 'items-end'}`}>
          <div className='grid grid-cols-[auto_auto_auto] grid-rows-2 w-fit gap-x-4 gap-y-1'>
              <div
                  className={`flex gap-x-3 self-end place-self-end col-start-2 items-center ${
                      position === 'LEFT' && 'flex-row-reverse'
                  }`}
              >
                  <small className='text-xs text-black/40'>{time}</small>
                  <small className='text-base font-medium'>{name}</small>
              </div>
              {is_readed !== undefined && (
                  <div
                      className={`place-self-end w-5 row-start-2 ${
                          position === 'LEFT' ? 'col-start-3' : 'col-start-1'
                      } ${
                          is_readed
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
                          : 'rounded-tr-none bg-white text-slate-800'
                  }`}
              >
                  {content}
              </div>
              <img
                  className={`w-11 aspect-square rounded-lg row-start-2 border border-black/10 ${
                      position === 'LEFT' ? 'col-start-1' : 'col-start-3'
                  }`}
                  src={avatar}
                  alt={`${name} profile picture`}
              />
          </div>
      </div>
  );
};

export default ConversationCard;