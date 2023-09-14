import { useState, useEffect } from "react";

type CarouselData = {
    image: string;
    title: string;
    description: string;
};

type CarouselProps = {
    data: CarouselData[];
};

const Carousel = ({ data }: CarouselProps) => {
    const [activeCarousel, setActiveCarousel] = useState<number>(0);

    useEffect(() => {
        const automatedCarousel = setInterval(() => {
            if (activeCarousel < data.length - 1) {
                setActiveCarousel(activeCarousel + 1);
            } else {
                setActiveCarousel(0);
            }
        }, 5000);

        return () => {
            clearInterval(automatedCarousel);
        };
    }, [activeCarousel]);

    return (
        <div className="carousel bg-primary flex flex-col items-center px-8 py-12 gap-y-10 lg:w-full lg:order-2 justify-center">
            <img className="h-[200px]  rounded-lg shadow-lg lg:h-[350px]" src={data[activeCarousel].image} alt="carousel" />
            <div className="h-[120px] flex flex-col gap-y-4">
                <h1 className="font-semibold text-2xl text-white text-center lg:text-3xl">{data[activeCarousel].title}</h1>
                <h2 className="text-base text-white text-center">{data[activeCarousel].description}</h2>
            </div>
            <div className="flex gap-x-3">
                {data.map((carouselItem, index) => (
                    <button className={` rounded-full w-3 aspect-square ${activeCarousel === index ? "bg-white" : "bg-white/50"}`} key={index} onClick={() => setActiveCarousel(index)} />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
