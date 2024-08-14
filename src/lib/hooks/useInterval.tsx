import { useCallback, useRef } from 'react';

export default function useInterval() {
    const intervalId = useRef<NodeJS.Timeout | null>(null);

    const stopInterval = () => {
        intervalId.current && clearInterval(intervalId.current);
    };

    const startInterval = useCallback(
        (callback: () => void, duration: number) => {
            intervalId.current = setInterval(callback, duration);
        },
        [intervalId]
    );

    return {
        stopInterval,
        startInterval,
    };
}

