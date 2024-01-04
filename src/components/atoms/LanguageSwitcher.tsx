/// <reference types="vite-plugin-svgr/client" />

import { useTranslation } from "react-i18next";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import EN from "../../assets/countries/us.svg?react";
import CH from "../../assets/countries/ch.svg?react";
import { cn } from "@/lib/utils";

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const languages = [
        { name: "English", code: "en" },
        { name: "Deutsch", code: "de" },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <LanguageComponent langCode={i18n.language} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {languages.map((language) => (
                    <DropdownMenuItem
                        key={language.code}
                        className="flex flex-row gap-2"
                        onClick={() => i18n.changeLanguage(language.code)}
                    >
                        <LanguageComponent langCode={language.code} />
                        {language.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

type LanguageComponentProps = {
    langCode: string;
    showText?: boolean;
};

const LanguageComponent = ({ langCode }: LanguageComponentProps) => {
    return (
        <>
            <EN
                className={cn(
                    langCode === "en" && "rotate-0 scale-100",
                    langCode === "de" && "rotate-180 scale-0",
                    "h-[1.2rem] w-[1.2rem] transition-all"
                )}
            />
            <CH
                className={cn(
                    "absolute h-[1.2rem] w-[1.2rem]",
                    langCode === "en" && "rotate-180 scale-0",
                    langCode === "de" && "rotate-0 scale-100",
                    "transition-all"
                )}
            />
        </>
    );
};
