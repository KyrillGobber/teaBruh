import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table'
import { Tea } from '@/lib/constants'
import { useTeaStore } from '@/lib/stores/TeaStore'
import { t } from 'i18next'
import { AddCustomTeaDialog } from '../molecules/AddCustomTeaDialog'
import { useState } from 'react'
import { Trash2 } from 'lucide-react'

export function TeaPicker() {
    const [openCustomTeaDialog, setOpenCustomTeaDialog] = useState(false)
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
                    <SheetDescription className="mx-auto">
                        <Button
                            variant="link"
                            onClick={() => setOpenCustomTeaDialog(true)}
                        >
                            {t('teaPicker.add')}
                        </Button>
                    </SheetDescription>
                </SheetFooter>
            </SheetContent>
            <AddCustomTeaDialog
                open={openCustomTeaDialog}
                onOpenChange={setOpenCustomTeaDialog}
            />
        </Sheet>
    )
}

const getTeaRows = (allTeas: Tea[]) => {
    return allTeas.map((tea) => (
        <SheetClose key={tea.name} asChild className="cursor-pointer">
            <TableRow>
                <TableCell className="w-auto flex gap-2 items-center">
                    {tea.custom && (
                        <Trash2
                            size={14}
                            onClick={() =>
                                useTeaStore
                                    .getState()
                                    .setAllTeas([
                                        ...allTeas.filter(
                                            (t) => t.name !== tea.name
                                        ),
                                    ])
                            }
                        />
                    )}
                    <p onClick={() => useTeaStore.getState().setTea(tea)}>
                        {t(tea.name)}
                    </p>
                </TableCell>
                <TableCell className="text-right">
                    {tea.custom ? 'custom' : tea.infusions.length}
                </TableCell>
            </TableRow>
        </SheetClose>
    ))
}

const TeaTable = () => {
    const { allTeas } = useTeaStore()
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>{t('teaPicker.table.tea')}</TableHead>
                    <TableHead className="text-right">
                        {t('teaPicker.table.infusions')}
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>{getTeaRows(allTeas)}</TableBody>
        </Table>
    )
}
