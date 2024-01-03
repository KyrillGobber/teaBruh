import { useState, useRef, useCallback, useEffect } from "react";

export const useInterval = () => {
    const [isActive, setIsActive] = useState(false);
    const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
    const callbackRef = useRef<() => void>(() => {});

    const set = useCallback((callback: () => void, delay: number) => {
        setIsActive(true);
        callbackRef.current = callback;
        const id = setInterval(() => {
            callbackRef.current();
            clear();
        }, delay);
        timeoutIdRef.current = id;
    }, []);

    const clear = useCallback(() => {
        if (timeoutIdRef.current) {
            clearInterval(timeoutIdRef.current);
            setIsActive(false);
            timeoutIdRef.current = null;
        }
    }, []);

    const reset = useCallback(
        (callback: () => void, delay: number) => {
            clear();
            set(callback, delay);
        },
        [clear, set]
    );

    useEffect(() => {
        return clear;
    }, [clear]);

    return { set, clear, reset, isActive };
};
