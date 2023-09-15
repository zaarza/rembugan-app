import { useRef, useEffect } from "react";

const useOnClickOutside = (callback: any) => {
    const ref: any = useRef();

    const clickOutsideToClose = (event: any) => {
        if (ref.current && !ref.current?.contains(event.target)) {
            callback();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", clickOutsideToClose);

        return () => {
            document.removeEventListener("mousedown", clickOutsideToClose);
        };
    }, [ref]);

    return ref;
};

export default useOnClickOutside;
