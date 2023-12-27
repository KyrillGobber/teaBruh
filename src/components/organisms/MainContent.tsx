import { toast } from "sonner";
import { Button } from "../ui/button";
import { Card, CardHeader } from "../ui/card";
import {
    ArrowBigLeft,
    ArrowBigRight,
    Pause,
    Play,
} from "lucide-react";
import { useState } from "react";
import { teas } from "@/lib/constants";

export const MainContent = () => {
    const [timerState, setTimerState] = useState<"running" | "stopped">(
        "stopped"
    );
    const defaultCountdown = teas[0].infusions[0].duration;
    const [currentInfusion, setCurrentInfusion] = useState(1);
    const [currentTime, setCurrentTime] = useState(defaultCountdown);

    const getIcon = () => {
        switch (timerState) {
            case "running":
                return <Pause size={62} />;
            case "stopped":
                return <Play size={62} />;
        }
    };

    return (
        <div className="flex flex-col justify-center items-center gap-8 mt-12">
            <Card>
                <CardHeader>
                    <h1>{currentTime}</h1>
                </CardHeader>
            </Card>
            <div className="flex flex-col">
                <Button
                    className="p-8"
                    variant={"ghost"}
                    onClick={() => {
                        toast("BREW TIME", {
                            description: `${new Date().toLocaleDateString()} @ ${new Date().toLocaleTimeString()}`,
                            action: {
                                label: "X",
                                onClick: () => {
                                    console.log("clicked");
                                },
                            },
                        });
                        if (timerState === "running") setTimerState("stopped");
                        else setTimerState("running");
                    }}
                >
                    {getIcon()}
                </Button>
                <div className="flex flex-row gap-8">
                    <Button
                        className="p-8"
                        variant={"ghost"}
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
