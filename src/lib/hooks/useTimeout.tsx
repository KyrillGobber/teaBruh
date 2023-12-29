import { useState, useRef, useCallback } from "react";

export const useInterval = () => {
    const [isActive, setIsActive] = useState(false);
    const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
    const callbackRef = useRef<() => void>(() => {});

    const set = useCallback((callback: () => void, delay: number) => {
        setIsActive(true);
        callbackRef.current = callback;
        timeoutIdRef.current = setInterval(() => {
            callbackRef.current();
        }, delay);
    }, []);

    const clear = useCallback(() => {
        if (timeoutIdRef.current) {
            clearInterval(timeoutIdRef.current);
            setIsActive(false);
            timeoutIdRef.current = null;
        }
    }, []);

    return { set, clear, isActive };
};

