import { useEffect, useRef, useState } from "react";
import useInterval from "./useInterval";
import audio from '@/assets/yay.mp3';
import { toast } from "sonner";
import { Tea } from "../constants";

export type TimerState = 'running' | 'stopped';


export default function useTimer(tea: Tea) {
    const [timerState, setTimerState] = useState<TimerState>('stopped');
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(tea.infusions[0].duration);
    const [currentInfusion, setCurrentInfusion] = useState(1);
    const { startInterval, stopInterval } = useInterval();
    const fractionRef = useRef(100 / currentTime);
    const audioRef = useRef(new Audio(audio));

    const getAlertContent = () => {
        return {
            description: `Done since ${new Date().toLocaleTimeString()}`,
            duration: 600000,
        };
    };

    useEffect(() => {
        if (timerState === 'running') {
            startInterval(() => {
                setProgress((progress) => progress + fractionRef.current);
                setCurrentTime((currentTime) => currentTime - 1);
            }, 1000)
        }
        if (timerState === 'stopped') {
            stopInterval();
        }
    }, [timerState]);

    // Play sound when timer is done
    useEffect(() => {
        if (currentTime === 0) {
            audioRef.current.play();
            toast.success(
                `INFUSION ${currentInfusion} DONE, ENJOYY`,
                getAlertContent()
            );
            setTimerState('stopped');
        }
    }, [currentTime]);

    return {
        start,
        stop,
        clear,
        setTimerState,
        setCurrentInfusion,
        progress,
    };
}

