import { toast } from 'sonner';
import { PretimerOption } from '../molecules/settings/PretimerOption';
import { Button, buttonVariants } from '../ui/button';
import { Form, FormField, FormItem } from '../ui/form';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '../ui/sheet';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useSettingsStore } from '@/lib/stores/useSettingsStore';
import { cn } from '@/lib/utils';

export const SettingsDrawer = () => {
    const { t } = useTranslation();
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button>{t('settings.title')}</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{t('settings.title')}</SheetTitle>
                </SheetHeader>
                <Options />
                <SheetFooter>
                    <SheetDescription>{t('settings.desc')}</SheetDescription>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

const Options = () => {
    const { pretimer, setPretimer } = useSettingsStore((state) => state);
    const { t } = useTranslation();
    const FormSchema = z.object({
        pretimer: z.number().max(10),
    });

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pretimer: pretimer,
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        setPretimer(data.pretimer);
        toast.success(t('settings.saved'));
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
            >
                <div className="flex flex-col justify-center items-center gap-4">
                    <PretimerOption form={form} />
                </div>
                <div className="flex gap-4">
                    <SheetClose
                        type="submit"
                        className={cn(
                            buttonVariants({ variant: 'default' }),
                            'w-full'
                        )}
                    >
                        Save
                    </SheetClose>
                    <SheetClose
                        className={cn(
                            buttonVariants({ variant: 'outline' }),
                            'w-full'
                        )}
                    >
                        Close
                    </SheetClose>
                </div>
            </form>
        </Form>
    );
};
