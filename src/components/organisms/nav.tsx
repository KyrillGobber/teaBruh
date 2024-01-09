import { ModeToggle } from "../mode-toggle";
import { Separator } from "@/components/ui/separator"
import { TeaPicker } from "./TeaPicker";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../atoms/LanguageSwitcher";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu";
import { cn } from "@/lib/utils";

export const Nav = () => {
    const { t } = useTranslation();
    return (
        <div className="bg-background sticky z-50 top-0 inset-x-0 h-16">
            <header className="relative">
                <div className="flex flex-row justify-between items-center mx-2 h-16">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-secondary dark:bg-secondary p-2 rounded-lg">
                                    {t('nav.myApps')}
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                        <li className="row-span-3">
                                            <NavigationMenuLink asChild>
                                                <a
                                                    className="flex h-full w-full select-none flex-col justify-start rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                    target="_blank"
                                                    href="https://www.gobber.ch"
                                                >
                                                    <div className="mb-2 text-lg font-medium">
                                                        Gobber.ch
                                                    </div>
                                                    <p className="text-sm leading-tight text-muted-foreground">
                                                        {t("nav.myPlace")}
                                                    </p>
                                                </a>
                                            </NavigationMenuLink>
                                        </li>
                                        <ListItem
                                            href="https://teabruh.gobber.ch"
                                            title="TeaBruh"
                                            text={t('nav.teaBruhDesc')}
                                        />
                                        <ListItem
                                            href="https://miit.gobber.ch"
                                            title="Miit"
                                            text={t('nav.miitDesc')}
                                        />
                                        <ListItem
                                            href="https://kybits.gobber.ch"
                                            title="KyBits"
                                            text={'A simple habit tracker app.'}
                                        />
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <div className="flex flex-row gap-2">
                        <TeaPicker/>
                        <LanguageSwitcher />
                        <ModeToggle />
                    </div>
                </div>
                <Separator className="bg-secondary" />
            </header>
        </div>
    );
};

type ListItemProps = {
    title: string;
    href: string;
    text: string;
};

const ListItem = ({ title, href, text }: ListItemProps) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    href={href}
                    target="_blank"
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    )}
                >
                    <div className="text-sm font-medium leading-none">
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {text}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
};
