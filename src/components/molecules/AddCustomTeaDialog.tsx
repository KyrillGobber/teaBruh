import { z } from 'zod'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '../ui/dialog'
import { toast } from 'sonner'
import { t } from 'i18next'
import { Button } from '../ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form'
import { useForm } from 'react-hook-form'
import { useTeaStore } from '@/lib/stores/TeaStore'

export const AddCustomTeaDialog = ({
    open,
    onOpenChange,
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
}) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create your tea timings</DialogTitle>
                    <DialogDescription>
                        The custom tea will be saved locally on your device
                        cache only
                    </DialogDescription>
                    <CustomTeaForm />
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

const CustomTeaForm = () => {
    const { allTeas, setAllTeas } = useTeaStore()
    const FormSchema = z.object({
        teaName: z.string().min(3),
        startingTime: z.number().min(0),
        increment: z.number().min(1),
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            teaName: '',
            startingTime: 0,
            increment: 1,
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        setAllTeas([
            ...allTeas,
            { name: data.teaName, infusions: [], custom: true },
        ])
        toast.success(t('teaPicker.saved'))
    }

    const handleKeyDown = (e: any) => {
        const inputValue = (e.target as HTMLInputElement)?.value
        const keyValue = e.key

        if (keyValue === 'Backspace' || keyValue === 'Delete') {
            // Allow deleting the current value
            return
        }

        if (!keyValue.match(/[0-9]/)) {
            e.preventDefault()
        } else if (inputValue.length === 0 && keyValue === '0') {
            // Allow entering 0 as the first digit
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
            >
                <FormField
                    control={form.control}
                    name="teaName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tea name</FormLabel>
                            <FormControl>
                                <Input placeholder="teawsome" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="startingTime"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Starting time</FormLabel>
                            <FormControl>
                                <Input
                                    onKeyDown={handleKeyDown}
                                    type="text"
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(+e.target.value)
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="increment"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Increment by</FormLabel>
                            <FormControl>
                                <Input
                                    onKeyDown={handleKeyDown}
                                    type="text"
                                    {...field}
                                    onChange={(e) =>
                                        field.onChange(+e.target.value)
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex gap-4">
                    <Button type="submit" className={'w-full'}>
                        Save
                    </Button>
                </div>
            </form>
        </Form>
    )
}
