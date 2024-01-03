import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { useTeaStore } from "@/lib/stores/TeaStore";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Tea } from "@/lib/constants";

export const TeaInfo = () => {
    const tea = useTeaStore((state) => state.tea);
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>Tea info and description</AccordionTrigger>
                <AccordionContent>
                    {tea.desc}
                </AccordionContent>
            </AccordionItem>
            {(tea.weight || tea.temp) && (
                <AccordionItem value="item-2">
                    <AccordionTrigger>Tea specs</AccordionTrigger>
                    <AccordionContent>
                        <TeaSpecs />
                    </AccordionContent>
                </AccordionItem>
            )}
            <AccordionItem value="item-3">
                <AccordionTrigger>Infusions</AccordionTrigger>
                <AccordionContent>
                    <TeaInfusionTable />
                </AccordionContent>
            </AccordionItem>
        </Accordion>

    );
};

const TeaSpecs = () => {
    const tea = useTeaStore((state) => state.tea);
    return (
        <Table>
            <TableBody>
                {tea.weight && (
                    <TableRow>
                        <TableCell className="w-auto">Amount of leaves:</TableCell>
                        <TableCell className="text-right">
                            {`${tea.weight}g`}
                        </TableCell>
                    </TableRow>
                )}
                {tea.temp && (
                    <TableRow>
                        <TableCell className="w-auto">Temperature:</TableCell>
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
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nr.</TableHead>
                    <TableHead className="text-right">Seconds</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {getTeaInfusionRows(tea)}
            </TableBody>
        </Table >
    );
};
