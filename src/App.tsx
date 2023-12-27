import "./App.css";
import { Toaster } from "sonner";
import { cn } from "./lib/utils";
import { Nav } from "./components/organisms/nav";
import { MainContent } from "./components/organisms/MainContent";

function App() {
    return (
        <div className={cn("relative h-full font-sans antialiased")}>
            <main className="relative flex flex-col min-h-screen">
                <Nav />
                <MainContent />
            </main>
            <Toaster duration={2000} />
        </div>
    );
}

export default App;
