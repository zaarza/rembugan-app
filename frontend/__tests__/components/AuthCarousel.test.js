import { renderHook, render, screen } from '@testing-library/react';
import useAuthCarousel from '@/src/hooks/useAuthCarousel.tsx';
import AuthCarousel from '@/src/components/AuthCarousel.tsx';
import carouselData from '@/src/data/carouselData';

describe('Auth Carousel Component', () => {
    it('Should render correctly', () => {
        renderHook(useAuthCarousel);
        render(<AuthCarousel />);

        // Image element
        screen.getByRole('img', {
            name: 'carousel',
        });

        // Title
        screen.getByRole('heading', {
            level: 1,
        });

        // Description
        screen.getByRole('heading', {
            level: 2,
        });

        const sliderButtons = screen.getAllByRole('button');
        expect(sliderButtons.length).toEqual(carouselData.length);
    });
});
