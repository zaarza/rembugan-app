import { render, screen } from '@testing-library/react';
import AuthCarouselButton from '@/src/components/AuthCarouselButton';
// import user from '@testing-library/user-event';

describe('Auth Carousel Button Component', () => {
    it('Should render correctly', () => {
        render(
            <AuthCarouselButton
                isActive={false}
                onClickHandler={() => onClickHandler()}
            />
        );

        screen.getByRole('button');
    });

    it('Should display active/unactive style', () => {
        let isActive = false;
        const view1 = render(
            <AuthCarouselButton
                isActive={isActive}
                onClickHandler={() => onClickHandler()}
            />
        );

        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toHaveClass('bg-white/50');
        view1.unmount();

        const isActive2 = true;
        const view2 = render(
            <AuthCarouselButton
                isActive={isActive2}
                onClickHandler={() => onClickHandler()}
            />
        );
        const buttonElement2 = screen.getByRole('button');
        expect(buttonElement2).toHaveClass('bg-white');
    });

    xit('Slider button should react to click event', async () => {
        user.setup();
        const onClickHandler = jest.fn();
        render(
            <AuthCarouselButton
                isActive={false}
                onClickHandler={() => onClickHandler()}
            />
        );

        const sliderButton = screen.getByRole('button');
        user.click(sliderButton);
    });
});
