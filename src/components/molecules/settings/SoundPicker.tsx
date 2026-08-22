import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { UseFormReturn } from "react-hook-form"

export const SoundPicker = ({ form }: { form: UseFormReturn<{ pretimer: string }> }) => {
    return (
        <FormField
            control={form.control}
            name="pretimer"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>SoundPicker</FormLabel>
                    <FormControl>
                        <Input placeholder="stuff" {...field} />
                    </FormControl>
                    <FormDescription>
                        The sound you hear at the end of the infusion.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
