import { toast } from "sonner";
import { Button } from "../ui/button";
import { Card, CardHeader } from "../ui/card";
import { ArrowBigLeft, ArrowBigRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { teas } from "@/lib/constants";
import { Progress } from "../ui/progress";
import { useTeaStore } from "@/lib/stores/TeaStore";

const getIcon = (timerState: TimerState) => {
    switch (timerState) {
        case "running":
            return <Pause size={62} />;
        case "stopped":
            return <Play size={62} />;
    }
};

type TimerState = "running" | "stopped";

const SECOND = 1000;

export const MainContent = () => {
    const tea = useTeaStore((state) => state.tea);
    const [timerState, setTimerState] = useState<TimerState>("stopped");
    const [progress, setProgress] = useState(0);
    const [currentInfusion, setCurrentInfusion] = useState(1);
    const [currentTime, setCurrentTime] = useState(
        teas[0].infusions[0].duration
    );
    const timerIdRef = useRef<NodeJS.Timeout | null>(null);
    const fractionRef = useRef(100 / currentTime);

    const handleBrewButtonEvent = () => {
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
            console.log("play the fucking sound");
            toast.success(`INFUSION ${currentInfusion} DONE, ENJOYY`, getAlertContent());
            timerIdRef.current && clearInterval(timerIdRef.current);
            setTimerState("stopped");
        }
    }, [currentTime]);

    useEffect(() => {
        const resetInfusion = 1;
        const newTeaTime = tea.infusions[resetInfusion - 1].duration;
        setCurrentTime(newTeaTime);
        setCurrentInfusion(resetInfusion);
    }, [tea]);

    const getAlertContent = () => {
        return {
            description: `Done since ${new Date().toLocaleTimeString()}`,
            action: {
                label: "X",
                onClick: () => {
                    console.log("clicked");
                },
            },
            duration: 600000,
        };
    };

    return (
        <div className="flex flex-col justify-center items-center gap-8 mt-12">
            <div className="flex flex-col gap-2">
                <h1>{tea.name}</h1>
                <h2>{`Infusion: ${currentInfusion}`}</h2>
            </div>
            <Card>
                <CardHeader className="flex flex-col items-center w-32">
                    <h1 className="text-5xl">{currentTime}</h1>
                    <Progress value={progress} />
                </CardHeader>
            </Card>
            <div className="flex flex-col">
                <Button
                    className="p-8"
                    variant={"ghost"}
                    onClick={handleBrewButtonEvent}
                >
                    {getIcon(timerState)}
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
                            Previous
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
                            Next
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    );
};
