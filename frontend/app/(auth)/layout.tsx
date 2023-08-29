"use client";

import carouselData from "@/data/carousel";
import Carousel from "@/components/Carousel";

const AuthLayout = ({ children }: any) => {
    return (
        <div className="flex flex-col lg:flex-row w-full lg:min-h-screen">
            <Carousel data={ carouselData }/>
            { children }
        </div>
    )
}

export default AuthLayout;