import { toast } from "sonner";
import { Button } from "../ui/button";
import { Card, CardHeader } from "../ui/card";
import { ArrowBigLeft, ArrowBigRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Tea, teas } from "@/lib/constants";
import { Progress } from "../ui/progress";

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
    const [currentTea, setCurrentTea] = useState<Tea>(teas[0]);
    const [timerState, setTimerState] = useState<TimerState>("stopped");
    const [progress, setProgress] = useState(0);
    const [currentInfusion, setCurrentInfusion] = useState(1);
    const [currentTime, setCurrentTime] = useState(
        teas[0].infusions[0].duration
    );
    const timerIdRef = useRef<NodeJS.Timeout | null>(null);

    const [fraction, setFraction] = useState(100 / currentTime);

    const handleBrewButtonEvent = () => {
        if (timerState === "stopped") {
            if (currentTime === 0) {
                setProgress(0);
                setCurrentInfusion(currentInfusion => {
                    const newInfusion = currentInfusion + 1;
                    setCurrentTime(() => {
                        const newTime = currentTea.infusions[newInfusion - 1].duration;
                        setFraction(100 / newTime);
                        return newTime;
                    });
                    return newInfusion;
                });
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
            toast("BREW TIME", getAlertContent());
            const timerId = setInterval(() => {
                setProgress(progress => progress + fraction);
                setCurrentTime(currentTime => currentTime - 1);
            }, SECOND);
            timerIdRef.current = timerId;
        }
    }, [timerState]);

    useEffect(() => {
        if (currentTime === 0) {
            console.log("play the fucking sound");
            timerIdRef.current && clearInterval(timerIdRef.current);
            setTimerState("stopped");
        }
    }, [currentTime]);

    const getAlertContent = () => {
        return {
            description: `BrewTime: ${currentTime}, fraction: ${fraction}`,
            action: {
                label: "X",
                onClick: () => {
                    console.log("clicked");
                },
            },
        };
    };

    return (
        <div className="flex flex-col justify-center items-center gap-8 mt-12">
            <h1>{currentTea.name}</h1>
            <Card>
                <CardHeader className="flex flex-col items-center w-32">
                    <h1>{currentTime}</h1>
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
                            currentInfusion === currentTea.infusions.length
                        }
                        onClick={() => {
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
