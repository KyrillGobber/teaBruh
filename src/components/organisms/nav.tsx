import { Separator } from '@/components/ui/separator';
import { TeaPicker } from './TeaPicker';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from '../ui/navigation-menu';
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

