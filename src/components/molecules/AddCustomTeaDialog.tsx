import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";

export const AddCustomTeaDialog = ({
    open,
    onOpenChange,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
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
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};
