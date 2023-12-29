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
        <p>
            Tea timer app made with React and Shadcn,
            by Kyrill Gobber
        </p>
    );
};

const FooterSrc = () => {
    return (
        <a
            className="flex flex-row gap-2"
            target="_blank"
            href={'https://github.com/KyrillGobber/kybits'}
            rel="noopener noreferrer"
        >
            Homepage Source
            <Code />
        </a>
    );
};