import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { useTeaStore } from "@/lib/stores/TeaStore";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Tea } from "@/lib/constants";
import { useTranslation } from "react-i18next";

export const TeaInfo = () => {
    const tea = useTeaStore((state) => state.tea);
    const { t } = useTranslation();
    return (
        <Accordion type="single" collapsible>
            {tea.desc && (
                <AccordionItem value="item-1">
                    <AccordionTrigger>{t('teaInfo.desc')}</AccordionTrigger>
                    <AccordionContent>
                        {t(tea.desc)}
                    </AccordionContent>
                </AccordionItem>
            )}
            {(tea.weight || tea.temp) && (
                <AccordionItem value="item-2">
                    <AccordionTrigger>{t('teaInfo.specs')}</AccordionTrigger>
                    <AccordionContent>
                        <TeaSpecs />
                    </AccordionContent>
                </AccordionItem>
            )}
            <AccordionItem value="item-3">
                <AccordionTrigger>{t('teaInfo.infusions')}</AccordionTrigger>
                <AccordionContent>
                    <TeaInfusionTable />
                </AccordionContent>
            </AccordionItem>
        </Accordion>

    );
};

const TeaSpecs = () => {
    const tea = useTeaStore((state) => state.tea);
    const { t } = useTranslation();
    return (
        <Table>
            <TableBody>
                {tea.weight && (
                    <TableRow>
                        <TableCell className="w-auto">{t('teaInfo.amountOfLeaves')}</TableCell>
                        <TableCell className="text-right">
                            {`${tea.weight}g`}
                        </TableCell>
                    </TableRow>
                )}
                {tea.temp && (
                    <TableRow>
                        <TableCell className="w-auto">{t('teaInfo.temp')}</TableCell>
                        <TableCell className="text-right">
                            {`${tea.temp}°C`}
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table >
    );
};

const getTeaInfusionRows = (tea: Tea) => {
    return tea.infusions.map((infusion) => {
        return (
            <TableRow key={infusion.id}>
                <TableCell className="w-auto">{infusion.id}</TableCell>
                <TableCell className="text-right">{infusion.duration}</TableCell>
            </TableRow>
        );
    });
};

const TeaInfusionTable = () => {
    const tea = useTeaStore((state) => state.tea);
    const { t } = useTranslation();
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nr.</TableHead>
                    <TableHead className="text-right">{t('teaInfo.seconds')}</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {getTeaInfusionRows(tea)}
            </TableBody>
        </Table >
    );
};
