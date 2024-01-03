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

export function TeaPicker() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button>Pick a Tea, bruh</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>You ready for some good tea bruh?</SheetTitle>
                    <SheetDescription>
                        Pick from my predefined teas here.
                    </SheetDescription>
                </SheetHeader>
                <TeaTable />
                <SheetFooter>
                    <SheetDescription>
                        Soon you'll be able to add your own teas here.
                    </SheetDescription>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

const getTeaRows = () => {
    return teas.map((tea) => (
        <SheetClose
            key={tea.name}
            asChild
            className="cursor-pointer"
            onClick={() => useTeaStore.getState().setTea(tea)}
        >
            <TableRow>
                <TableCell className="w-auto">{tea.name}</TableCell>
                <TableCell className="text-right">
                    {tea.infusions.length}
                </TableCell>
            </TableRow>
        </SheetClose>
    ));
};

const TeaTable = () => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Tea</TableHead>
                    <TableHead className="text-right">Infusions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>{getTeaRows()}</TableBody>
        </Table>
    );
};
