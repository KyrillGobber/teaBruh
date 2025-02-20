import { Separator } from '@/components/ui/separator';
import { TeaPicker } from './TeaPicker';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from '../ui/navigation-menu';
import { cn } from '@/lib/utils';
import { SettingsDrawer } from './SettingsDrawer';

export const Nav = () => {
    return (
        <div className="bg-background sticky z-50 top-0 inset-x-0 h-16">
            <header className="relative">
                <div className="flex flex-row justify-between items-center mx-2 h-16 px-2">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <a
                                    className="flex flex-row gap-2 text-sm"
                                    target="_blank"
                                    href={'https://www.kyrill.dev'}
                                    rel="noopener noreferrer"
                                >
                                    Kyrill.dev
                                </a>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <div className="flex flex-row gap-2">
                        <TeaPicker />
                        <SettingsDrawer />
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
                        'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
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
