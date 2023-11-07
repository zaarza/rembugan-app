'use client';

import useCarousel from '@/features/auth/hooks/useCarousel';

const Carousel = () => {
    const { active, setActive, data } = useCarousel();

    return (
        <div className='bg-primary flex flex-col items-center px-8 py-12 gap-y-10 justify-center w-full'>
            <img
                className='h-[200px]  rounded-lg shadow-lg lg:h-[350px]'
                src={data[active].image}
                alt='carousel'
            />
            <div className='h-[120px] flex flex-col gap-y-4'>
                <h1 className='font-semibold text-2xl text-white text-center lg:text-3xl'>{data[active].title}</h1>
                <h2 className='text-base text-white text-center'>{data[active].description}</h2>
            </div>
            <div className='flex gap-x-3'>
                {data.map((carouselItem, index) => (
                    <button
                        className={` rounded-full w-3 aspect-square ${active === index ? 'bg-white' : 'bg-white/50'}`}
                        key={index}
                        onClick={() => setActive(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
