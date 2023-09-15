import React from 'react'
import Carousel from '@/components/Elements/Carousel';
import carouselData from "@/data/carousel";

const AuthCarousel = () => {
  return (
    <Carousel data={carouselData} />
  )
}

export default AuthCarousel