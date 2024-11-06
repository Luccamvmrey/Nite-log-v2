import {
    AlertDialog,
    AlertDialogContent, AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import useMutateUser from "@/modules/common/hooks/user/useMutateUser.ts";
import {Button} from "@/components/ui/button.tsx";
import useQueryUser from "@/modules/common/hooks/user/useQueryUser.ts";

type DeleteScheduleDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    scheduleId?: string;
};

const DeleteScheduleDialog = ({scheduleId, open, onOpenChange}: DeleteScheduleDialogProps) => {
    const {deleteScheduleMutation} = useMutateUser();
    const {userQuery} = useQueryUser();

    const handleDelete = () => {
        if (!scheduleId || !userQuery.data) return;
        const {data: user} = userQuery.data;
        const info = {user, scheduleId}
        deleteScheduleMutation.mutate(info);
        onOpenChange(false);
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="w-[300px] rounded-lg">
                <AlertDialogHeader aria-describedby={undefined}>
                    <AlertDialogTitle>Apagar horário?</AlertDialogTitle>
                    <AlertDialogDescription>Esta ação não pode ser desfeita.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex flex-row items-center justify-around">
                    <Button variant="secondary" onClick={() => onOpenChange(!open)}>Cancelar</Button>
                    <Button variant="destructive" onClick={handleDelete}>Deletar</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteScheduleDialog;