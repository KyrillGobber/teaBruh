import { toast } from "sonner";
import { Button } from "../ui/button";
import { Card, CardHeader } from "../ui/card";
import { ArrowBigLeft, ArrowBigRight, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { Tea, teas } from "@/lib/constants";
import { Progress } from "../ui/progress";
import { useInterval } from "@/lib/hooks/useTimeout";

const getIcon = (timerState: TimerState) => {
    switch (timerState) {
        case "running":
            return <Pause size={62} />;
        case "stopped":
            return <Play size={62} />;
    }
};

type TimerState = "running" | "stopped";

export const MainContent = () => {
    const { set, clear } = useInterval();
    const [currentTea, setCurrentTea] = useState<Tea>(teas[0]);
    const [timerState, setTimerState] = useState<TimerState>("stopped");
    const [progress, setProgress] = useState(0);
    const [currentInfusion, setCurrentInfusion] = useState(1);
    const [currentTime, setCurrentTime] = useState(
        teas[0].infusions[0].duration
    );

    const handleBrewButtonEvent = () => {
        toast("BREW TIME", getAlertContent());
        if (currentTime === 0) {
            setCurrentInfusion(currentInfusion + 1);
            setCurrentTime(currentTea.infusions[currentInfusion].duration);
        }
        if (timerState === "stopped") {
            setTimerState("running");
            const fraction = 100 / currentTime;
            set(() => {
                setCurrentTime(currentTime => currentTime - 1);
                setProgress(progress => progress += fraction);
            }, 1000);
        }
        else {
            setTimerState("stopped");
            clear();
        }
    };
    const getAlertContent = () => {
        return {
            description: `${new Date().toLocaleDateString()} @ ${new Date().toLocaleTimeString()}`,
            action: {
                label: "X",
                onClick: () => {
                    console.log("clicked");
                },
            },
        };
    };

    useEffect(() => {
        setCurrentTime(teas[0].infusions[currentInfusion - 1].duration);
    }, [currentInfusion]);

    useEffect(() => {
        if (currentTime === 0) {
            console.log("play the fucking sound");
            clear();
            setTimerState("stopped");
        }
    }, [currentTime, clear]);

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
