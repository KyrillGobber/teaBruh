import { useEffect, useRef, useState } from 'react';
import useInterval from './useInterval';
import audio from '@/assets/yay.mp3';
import { toast } from 'sonner';
import { Tea } from '../constants';

export type TimerState = 'running' | 'stopped' | 'pretimer';

export default function useTimer(tea: Tea, pretimer: number) {
    //const [pretimer, setPretimer] = useState(pretimer);
    const { startInterval, stopInterval } = useInterval();
    const [timerState, setTimerState] = useState<TimerState>('stopped');
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(tea.infusions[0].duration);
    const [currentInfusion, setCurrentInfusion] = useState(1);
    const [isLastInfusion, setIsLastInfusion] = useState(false);
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
            }, 1000);
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

    useEffect(() => {
        setTimerState('stopped');

        //Set the first infusion of the new tea
        const newTeaTime = tea.infusions[0].duration;
        setCurrentTime(newTeaTime);

        //Reset stuff
        setCurrentInfusion(1);
        setProgress(0);

        const newFraction = 100 / newTeaTime;
        fractionRef.current = newFraction;
    }, [tea]);

    useEffect(() => {
        if (currentInfusion === tea.infusions.length && currentTime === 0) {
            setIsLastInfusion(true);
        }
        //If infusion changes, should reset everything and set the new values
        setProgress(0);
        const newTime = tea.infusions[currentInfusion - 1].duration;
        setCurrentTime(newTime);
        const newFraction = 100 / newTime;
        fractionRef.current = newFraction;
    }, [currentInfusion]);

    const start = () => {
        if (isLastInfusion) {
            setCurrentInfusion(1);
            setIsLastInfusion(false);
            return;
        }
        if (currentTime === 0) {
            setCurrentInfusion(currentInfusion + 1);
        }
        setTimerState('running');
    };

    const stop = () => {
        setTimerState('stopped');
    };

    const nextInfusion = () => {
        setTimerState('stopped');
        setCurrentInfusion(currentInfusion + 1);
    };

    const previousInfusion = () => {
        setTimerState('stopped');
        setCurrentInfusion(currentInfusion - 1);
    };

    return {
        start,
        stop,
        nextInfusion,
        previousInfusion,
        timerState,
        currentTime,
        currentInfusion,
        isLastInfusion,
        progress,
        pretimer,
    };
}
