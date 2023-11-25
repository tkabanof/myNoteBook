import {useEffect, useState} from "react";

type WindowDimensions = {
    width: number, // Ширина области просмотра окна браузера
    height: number, // Высота области просмотра окна браузера
}

const getWindowDimensions = (): WindowDimensions => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
};

export const useWindowDimensions = (): WindowDimensions => {
    const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>(getWindowDimensions());

    useEffect(() => {
        const handleResize = (): void => {
            setWindowDimensions(getWindowDimensions());
            return undefined;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}