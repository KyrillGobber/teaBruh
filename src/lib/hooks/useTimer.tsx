import { useCallback, useRef } from 'react';

export default function useTimer() {
    const timerId = useRef<NodeJS.Timeout | null>(null);

    const clearTimer = useCallback(() => {
        timerId.current && clearInterval(timerId.current);
    }, []);

    const startTimer = useCallback(
        (callback: () => void, duration: number) => {
            timerId.current = setInterval(callback, duration);
        },
        [timerId]
    );

    return {
        clearTimer,
        startTimer,
    };
}
