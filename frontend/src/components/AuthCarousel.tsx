'use client';
import useAuthCarousel from '@/src/hooks/useAuthCarousel';
import AuthCarouselButton from './AuthCarouselButton';

const AuthCarousel = () => {
    const { active, setActive, data } = useAuthCarousel();

    return (
        <div className='bg-primary flex flex-col items-center px-8 py-12 gap-y-10 justify-center'>
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
                    <AuthCarouselButton
                        isActive={active === index}
                        onClickHandler={() => setActive(index)}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
};

export default AuthCarousel;
