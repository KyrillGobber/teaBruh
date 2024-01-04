import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { teas } from "@/lib/constants";
import { useTeaStore } from "@/lib/stores/TeaStore";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";

export function TeaPicker() {
    const { t } = useTranslation();
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button>{t('teaPicker.pickATea')}</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{t('teaPicker.ready')}</SheetTitle>
                    <SheetDescription>
                        {t('teaPicker.pickHere')}
                    </SheetDescription>
                </SheetHeader>
                <TeaTable />
                <SheetFooter>
                    <SheetDescription>
                        {t('teaPicker.soon')}
                    </SheetDescription>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

const getTeaRows = (t: TFunction<"translation", undefined>) => {
    return teas.map((tea) => (
        <SheetClose
            key={tea.name}
            asChild
            className="cursor-pointer"
            onClick={() => useTeaStore.getState().setTea(tea)}
        >
            <TableRow>
                <TableCell className="w-auto">{t(tea.name)}</TableCell>
                <TableCell className="text-right">
                    {tea.infusions.length}
                </TableCell>
            </TableRow>
        </SheetClose>
    ));
};

const TeaTable = () => {
    const { t } = useTranslation();
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>{t('teaPicker.table.tea')}</TableHead>
                    <TableHead className="text-right">{t('teaPicker.table.infusions')}</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>{getTeaRows(t)}</TableBody>
        </Table>
    );
};
