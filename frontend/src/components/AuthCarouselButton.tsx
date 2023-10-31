import React from 'react';

type TAuthCarouselButton = {
    isActive: boolean;
    onClickHandler: () => void;
};

const AuthCarouselButton = (props: TAuthCarouselButton) => {
    const { onClickHandler, isActive } = props;
    return (
        <button
            className={` rounded-full w-3 aspect-square ${isActive ? 'bg-white' : 'bg-white/50'}`}
            onClick={() => onClickHandler()}
        />
    );
};

export default AuthCarouselButton;
