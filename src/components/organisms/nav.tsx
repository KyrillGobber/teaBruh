import { ModeToggle } from "../mode-toggle";
import { Separator } from "@/components/ui/separator"
import { TeaPicker } from "./TeaPicker";

export const Nav = () => {
    return (
        <div className="bg-background sticky z-50 top-0 inset-x-0 h-16">
            <header className="relative">
                <div className="flex flex-row justify-between items-center mx-2 h-16">
                    <div className="bg-secondary dark:bg-secondary p-2 rounded-lg">
                        Tea Bruh
                    </div>
                    <div className="flex flex-row gap-2">
                        <TeaPicker/>
                        <ModeToggle />
                    </div>
                </div>
                <Separator className="bg-secondary" />
            </header>
        </div>
    );
};
