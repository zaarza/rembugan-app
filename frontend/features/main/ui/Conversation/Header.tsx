import { IconLineArrowLeft } from '@/shared/Icons';

type ConversationHeaderProps = {
  name?: string;
  isOnline?: boolean;
  isTyping: boolean;
  profilePicturePath?: string;
  showSidebarHandler: () => void;
  toggleConversation: () => void;
};

const ConversationHeader = ({
  name,
  isOnline,
  isTyping,
  profilePicturePath,
  showSidebarHandler,
  toggleConversation,
}: ConversationHeaderProps) => {
  return (
      <div className='sticky top-0 flex items-center justify-between px-3 py-3 bg-white border border-l-0 title lg:px-8 border-b-black/10'>
          <div className='flex gap-x-4'>
              <button
                  type='button'
                  className='w-5 lg:hidden group'
                  onClick={() => toggleConversation()}
              >
                  <IconLineArrowLeft />
              </button>
              <img
                  src={profilePicturePath ? `${process.env.NEXT_PUBLIC_API}${profilePicturePath}` : "/assets/illustrations/avatar-empty.svg"}
                  className='w-12 rounded-lg aspect-square'
                  alt={`${name || ""}`}
              />
              <div className='flex flex-col justify-center gap-y-1'>
                  <h1 className='text-sm font-medium text-slate-800'>
                      {name || ""}
                  </h1>
                  <h2 className='text-xs text-primary'>{isTyping ? "Typing..." : isOnline !== undefined ? (isOnline ? "Online" : "Offline") : ""}</h2>
              </div>
          </div>
          <button
              className='w-8 group '
              onClick={() => showSidebarHandler()}
          >
              <svg
                  className='fill-slate-800 group-hover:fill-primary'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
              >
                  <path d='M3 4.99509C3 3.89323 3.89262 3 4.99509 3H19.0049C20.1068 3 21 3.89262 21 4.99509V19.0049C21 20.1068 20.1074 21 19.0049 21H4.99509C3.89323 21 3 20.1074 3 19.0049V4.99509ZM6.35687 18H17.8475C16.5825 16.1865 14.4809 15 12.1022 15C9.72344 15 7.62182 16.1865 6.35687 18ZM12 13C13.933 13 15.5 11.433 15.5 9.5C15.5 7.567 13.933 6 12 6C10.067 6 8.5 7.567 8.5 9.5C8.5 11.433 10.067 13 12 13Z'></path>
              </svg>
          </button>
      </div>
  );
};

export default ConversationHeader;