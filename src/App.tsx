import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import { Toaster, toast } from "sonner";
import { cn } from "./lib/utils";
import { Nav } from "./components/organisms/nav";

function App() {
    const [count, setCount] = useState(0);

    return (
        <body
            className={cn(
                "relative h-full font-sans antialiased"
            )}
        >
            <main className="relative flex flex-col min-h-screen">
                <Nav />
                <Button
                    variant={"ghost"}
                    onClick={() => {
                        setCount((count) => count + 1);
                        toast(count + 1, {
                            description: `${new Date().toLocaleDateString()} @ ${new Date().toLocaleTimeString()}`,
                            action: {
                                label: "Undo",
                                onClick: () => {
                                    setCount((count) => count - 1);
                                },
                            },
                        });
                    }}
                >
                    count is {count}
                </Button>
            </main>
            <Toaster duration={2000} />
        </body>
    );
}

export default App;
