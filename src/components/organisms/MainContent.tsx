import { toast } from "sonner";
import { Button } from "../ui/button";
import { Card, CardHeader } from "../ui/card";
import { ArrowBigLeft, ArrowBigRight, ArrowLeftFromLine, Pause, Play } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { teas } from "@/lib/constants";
import { Progress } from "../ui/progress";
import { useTeaStore } from "@/lib/stores/TeaStore";
import { TeaInfo } from "../molecules/TeaInfo";
import audio from "@/assets/yay.mp3";
import { useTranslation } from 'react-i18next';

const getIcon = (timerState: TimerState, isLastInfusion: boolean) => {
    switch (timerState) {
        case "running":
            return <Pause size={128} />;
        case "stopped":
            if (isLastInfusion) return <ArrowLeftFromLine size={128} />;
            return <Play size={128} />;
    }
};

type TimerState = "running" | "stopped";

const SECOND = 1000;

export const MainContent = () => {
    const { t } = useTranslation();
    const tea = useTeaStore((state) => state.tea);
    const [timerState, setTimerState] = useState<TimerState>("stopped");
    const [progress, setProgress] = useState(0);
    const [currentInfusion, setCurrentInfusion] = useState(1);
    const [currentTime, setCurrentTime] = useState(
        teas[0].infusions[0].duration
    );
    const timerIdRef = useRef<NodeJS.Timeout | null>(null);
    const fractionRef = useRef(100 / currentTime);
    const audioRef = useRef(new Audio(audio));
    const [isLastInfusion, setIsLastInfusion] = useState(false);

    const handleBrewButtonEvent = () => {
        if (isLastInfusion) {
            setCurrentInfusion(1);
            setIsLastInfusion(false);
            return;
        }
        if (timerState === "stopped") {
            if (currentTime === 0) {
                setCurrentInfusion(currentInfusion + 1);
            }
            setTimerState("running");
        }
        else {
            setTimerState("stopped");
            timerIdRef.current && clearInterval(timerIdRef.current);
        }
    };

    useEffect(() => {
        if (timerState === "running") {
            const timerId = setInterval(() => {
                setProgress(progress => progress + fractionRef.current);
                setCurrentTime(currentTime => currentTime - 1);
            }, SECOND);
            timerIdRef.current = timerId;
        }
        if (timerState === "stopped") {
            timerIdRef.current && clearInterval(timerIdRef.current);
        }
    }, [timerState]);

    useEffect(() => {
        //If infusion changes, should reset everything and set the new values
        setProgress(0);
        const newTime = tea.infusions[currentInfusion - 1].duration;
        setCurrentTime(newTime);
        const newFraction = 100 / newTime;
        fractionRef.current = newFraction;
    }, [currentInfusion]);

    // Play sound when timer is done
    useEffect(() => {
        if (currentTime === 0) {
            audioRef.current.play();
            toast.success(`INFUSION ${currentInfusion} DONE, ENJOYY`, getAlertContent());
            timerIdRef.current && clearInterval(timerIdRef.current);
            setTimerState("stopped");
        }
    }, [currentTime]);

    useEffect(() => {
        setTimerState('stopped');
        const resetInfusion = 1;
        const newTeaTime = tea.infusions[resetInfusion - 1].duration;
        setCurrentTime(newTeaTime);
        setCurrentInfusion(resetInfusion);
        setProgress(0);
        const newFraction = 100 / newTeaTime;
        fractionRef.current = newFraction;
    }, [tea]);

    const getAlertContent = () => {
        return {
            description: `Done since ${new Date().toLocaleTimeString()}`,
            duration: 600000,
        };
    };

    useMemo(() => {
        if (currentInfusion === tea.infusions.length && currentTime === 0) {
            setIsLastInfusion(true);
        };
    }, [currentInfusion, tea.infusions.length, currentTime]);

    return (
        <div className="flex flex-col justify-between items-center gap-24">
            <div className="flex flex-col justify-center items-center gap-8 mt-12">
                <div className="flex flex-col gap-2">
                    <h1>{t(tea.name)}</h1>
                    <h2>{`Infusion: ${currentInfusion}/${tea.infusions.length}`}</h2>
                </div>
                <Card>
                    <CardHeader className="flex flex-col items-center w-32">
                        <h1 className="text-5xl">{currentTime}</h1>
                        <Progress value={progress} />
                    </CardHeader>
                </Card>
                <div className="flex flex-col gap-4">
                    <Button
                        className="p-8 h-64 rounded-full border border-white"
                        variant={"ghost"}
                        onClick={handleBrewButtonEvent}
                    >
                        {getIcon(timerState, isLastInfusion)}
                    </Button>
                    <div className="flex flex-row gap-8">
                        <Button
                            className="p-8"
                            variant={"ghost"}
                            disabled={currentInfusion === 1}
                            onClick={() => {
                                setTimerState("stopped");
                                setCurrentInfusion(currentInfusion - 1);
                            }}
                        >
                            <span className="flex flex-col">
                                <ArrowBigLeft size={48} />
                                {t('general.previous')}
                            </span>
                        </Button>
                        <Button
                            className="p-8"
                            variant={"ghost"}
                            disabled={
                                currentInfusion === tea.infusions.length
                            }
                            onClick={() => {
                                setTimerState("stopped");
                                setCurrentInfusion(currentInfusion + 1);
                            }}
                        >
                            <span className="flex flex-col">
                                <ArrowBigRight size={48} />
                                {t('general.next')}
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-full p-4 md:p-0 md:w-1/5">
                <TeaInfo />
            </div>
        </div>
    );
};
