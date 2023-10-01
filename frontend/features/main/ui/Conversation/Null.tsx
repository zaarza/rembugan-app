const ConversationNull = () => {
  return (
      <div className='flex-col items-center justify-center hidden w-full h-screen gap-y-8 lg:flex bg-background'>
          <div className='max-w-xs '>
              <img
                  src='/assets/illustrations/no-conversation.svg'
                  alt=''
              />
          </div>
          <div className='flex flex-col gap-y-2'>
              <h1 className='text-xl text-center text-slate-800'>No chat selected</h1>
              <p className='max-w-[500px] text-center text-slate-800'>
                  Select chat to start conversation!
              </p>
          </div>
      </div>
  );
};

export default ConversationNull;