const ItemSkeleton = () => {
    return (
        <button
            className='bg-white hover:bg-primary/5 duration-300 flex py-4 px-6 gap-x-5 items-center'
            type='button'
            disabled
        >
            <div className='rounded-lg overflow-hidden'>
                <div className='w-[54px] aspect-square bg-background' />
            </div>
            <div className='flex flex-col items-start gap-y-1 lg:w-[80%] w-full'>
                <div className='flex justify-between w-full items-start'>
                    <div className='bg-background w-[150px] h-[15px]' />
                    <div className='bg-background w-[50px] h-[15px]' />
                </div>
                <div className='flex justify-between w-full items-start'>
                    <div className='bg-background w-[200px] h-[15px]' />
                </div>
            </div>
        </button>
    );
};

export default ItemSkeleton;
