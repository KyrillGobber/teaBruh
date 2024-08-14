import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useSettingsStore } from '@/lib/stores/useSettingsStore';

export const PretimerOption = ({ form }: { form: any }) => {
    const { pretimer } = useSettingsStore((state) => state);
    const handleKeyDown = (e: any) => {
        const inputValue = (e.target as HTMLInputElement)?.value;
        const keyValue = e.key;

        if (keyValue === 'Backspace' || keyValue === 'Delete') {
            // Allow deleting the current value
            return;
        }

        if (!keyValue.match(/[0-9]/)) {
            e.preventDefault();
        } else if (inputValue.length === 0 && keyValue === '0') {
            // Allow entering 0 as the first digit
        } else if (
            inputValue.length > 0 &&
            parseInt(inputValue + keyValue) > 10
        ) {
            e.preventDefault();
        }
    };

    return (
        <FormField
            control={form.control}
            name="pretimer"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Pre-Timer</FormLabel>
                    <FormControl>
                        <Input
                            onKeyDown={handleKeyDown}
                            type="text"
                            {...field}
                            onChange={(e) => field.onChange(+e.target.value)}
                        />
                    </FormControl>
                    <FormDescription>
                        Time in seconds, before the actual timer starts, so you
                        have time to pour the water.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
