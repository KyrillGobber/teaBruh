import { Code } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="mt-auto mb-6 flex flex-col justify-center items-center bottom-0 sticky">
            <FooterText />
            <FooterSrc />
        </footer>
    );
};


const FooterText = () => {
    return (
        <p className="text-sm md:text-base">
            Tea timer app made with React and Shadcn,
            by Kyrill Gobber
        </p>
    );
};

const FooterSrc = () => {
    return (
        <a
            className="flex flex-row gap-2 text-sm md:text-base"
            target="_blank"
            href={'https://github.com/KyrillGobber/teaBruh'}
            rel="noopener noreferrer"
        >
            Homepage Source
            <Code />
        </a>
    );
};
