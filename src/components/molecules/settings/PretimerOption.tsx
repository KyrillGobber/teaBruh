import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { KeyboardEvent } from 'react';
import type { UseFormReturn } from 'react-hook-form';

type PretimerFormValues = {
    pretimer: number;
};

export const PretimerOption = ({
    form,
}: {
    form: UseFormReturn<PretimerFormValues>;
}) => {
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        const inputValue = e.currentTarget.value;
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
