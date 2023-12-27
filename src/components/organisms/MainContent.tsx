import { toast } from "sonner";
import { Button } from "../ui/button";
import { Card, CardHeader } from "../ui/card";
import { Pause, Play, TimerReset } from "lucide-react";
import { useState } from "react";

export const MainContent = () => {
    const [timerState, setTimerState] = useState<"running" | "stopped">("stopped");

    const getIcon = () => {
        switch (timerState) {
            case "running":
                return <Pause size={48} />;
            case "stopped":
                return <Play size={48} />;
        }
    };

    return (
        <div className="flex flex-col justify-center items-center gap-8 mt-12">
            <Card>
                <CardHeader>
                    <h1>Timer will be here</h1>
                </CardHeader>
            </Card>
            <div className="flex flex-row">
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
                <Button
                    className="p-8"
                    variant={"ghost"}
                    onClick={() => {
                        toast("RESET??", {
                            description: `${new Date().toLocaleDateString()} @ ${new Date().toLocaleTimeString()}`,
                            action: {
                                label: "X",
                                onClick: () => {
                                    console.log("clicked");
                                },
                            },
                        });
                    }}
                >
                    <TimerReset size={48} />
                </Button>
            </div>
        </div>
    );
};
