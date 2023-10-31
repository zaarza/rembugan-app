import { useEffect, useState } from 'react';
import carouselData from './../data/carouselData';

const useAuthCarousel = () => {
    const [activeCarousel, setActiveCarousel] = useState<number>(0);

    useEffect(() => {
        const automatedCarousel = setInterval(() => {
            if (activeCarousel < carouselData.length - 1) {
                setActiveCarousel(activeCarousel + 1);
            } else {
                setActiveCarousel(0);
            }
        }, 5000);

        return () => {
            clearInterval(automatedCarousel);
        };
    }, [activeCarousel]);

    return {
        data: carouselData,
        active: activeCarousel,
        setActive: setActiveCarousel,
    };
};

export default useAuthCarousel;
