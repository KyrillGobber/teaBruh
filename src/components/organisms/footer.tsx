import { Code } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="mt-auto mb-6 flex flex-col justify-center items-center bottom-0">
            <FooterText />
            <FooterSrc />
        </footer>
    );
};

const FooterText = () => {
    return (
        <p className="text-sm">
            Sincerly, your friendly neighbourhood tea enjoyer.
        </p>
    );
};

const FooterSrc = () => {
    return (
        <a
            className="flex flex-row gap-2 text-sm"
            target="_blank"
            href={'https://www.kyrill.dev'}
            rel="noopener noreferrer"
        >
            Kyrill.dev
            <Code />
        </a>
    );
};
