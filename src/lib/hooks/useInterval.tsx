import { useCallback, useRef } from 'react';

export default function useInterval() {
    const intervalId = useRef<NodeJS.Timeout | null>(null);

    const stopInterval = useCallback(() => {
        if (intervalId.current) {
            clearInterval(intervalId.current);
            intervalId.current = null;
        }
    }, []);

    const startInterval = useCallback(
        (callback: () => void, duration: number) => {
            intervalId.current = setInterval(callback, duration);
        },
        []
    );

    return {
        stopInterval,
        startInterval,
    };
}
