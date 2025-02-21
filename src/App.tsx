import { Toaster, toast } from "sonner";
import { cn } from "./lib/utils";
import { Nav } from "./components/organisms/nav";
import { MainContent } from "./components/organisms/MainContent";
import { Footer } from "./components/organisms/footer";
import { useEffect } from "react";
import { t } from "i18next";

function App() {
    const saveCookieCloseToLocalStorage = () => {
        localStorage.setItem('cookie-messge-eliminated', 'true');
    };

    useEffect(() => {
        if (localStorage.getItem('cookie-messge-eliminated') === 'true') return;
        toast(t('general.cookieMessage'), {
            action: {
                label: t('general.thanks'),
                onClick: () => saveCookieCloseToLocalStorage(),
            },
            duration: Infinity,
            className: 'text-center',
        });
    }, []);
    return (
        <div className={cn("relative h-full font-sans antialiased")}>
            <main className="relative flex flex-col min-h-screen">
                <Nav />
                <MainContent />
                <Footer />
            </main>
            <Toaster />
        </div>
    );
}

export default App;
