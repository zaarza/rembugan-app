type MenuItemProps = {
  name: string;
  time?: number;
  message: string | number;
  notificationCount?: number;
  profilePicturePath?: string;
  action: () => any;
};

const MenuItem = ({
  name,
  time,
  message,
  notificationCount = 0,
  profilePicturePath,
  action,
}: MenuItemProps) => {
  return (
      <button
          className='bg-white hover:bg-primary/5 duration-300 flex py-4 px-6 gap-x-5 items-center'
          type='button'
          onClick={() => action()}
      >
          <div className='w-[54px] h-[54px] rounded-lg overflow-hidden'>
              <img
                  className='w-full'
                  src={profilePicturePath}
                  alt=''
              />
          </div>
          <div className='flex flex-col items-start gap-y-1 lg:w-[80%] w-full'>
              <div className='flex justify-between w-full items-start'>
                  <h1 className='font-medium text-base text-slate-800'>
                      {name}
                  </h1>
                  <small className='text-xs text-slate-500'>{time}</small>
              </div>
              <div className='flex justify-between w-full items-start'>
                  <h2 className='text-sm text-slate-500 line-clamp-1 overflow-clip text-left max-w-[90%]'>
                      {message}
                  </h2>
                  <small
                      className={`bg-primary rounded-full w-5 aspect-square text-white justify-center items-center relative hidden ${
                          notificationCount > 0 && 'flex'
                      }`}
                  >
                      <span className='absolute'>{notificationCount}</span>
                  </small>
              </div>
          </div>
      </button>
  );
};

export default MenuItem;