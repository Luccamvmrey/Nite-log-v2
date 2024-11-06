import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import DayOfWeekSelect from "@/modules/home/components/schedule/schedule-form/DayOfWeekSelect.tsx";
import HoursSelect from "@/modules/home/components/schedule/schedule-form/HoursSelect.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Plus} from "lucide-react";
import React, {useEffect, useState} from "react";
import useMutateUser from "@/modules/common/hooks/user/useMutateUser.ts";
import useQueryUser from "@/modules/common/hooks/user/useQueryUser.ts";
import {toast} from "sonner";
import User from "@/modules/common/models/User.ts";

const initialValues = {
    dayOfWeek: 0,
    startTime: "",
    endTime: "",
}

type NewScheduleDialogProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const NewScheduleDialog = ({open, onOpenChange}: NewScheduleDialogProps) => {
    const {addScheduleMutation} = useMutateUser();
    const {userQuery} = useQueryUser();

    const [formValues, setFormValues] = useState(initialValues);

    const handleChange = (field: keyof typeof initialValues) => (value: string | number) => {
        setFormValues({...formValues, [field]: value});
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!formValues.startTime || !formValues.endTime) {
            toast("Os campos de horário são obrigatórios.");
            return;
        }

        if (!userQuery.data) return;
        const {data: user} = userQuery.data;

        addScheduleMutation.mutate({
            user: user as User,
            schedule: {...formValues}
        });
        onOpenChange(false);
    };

    useEffect(() => {
        if (addScheduleMutation.isSuccess) setFormValues(initialValues);
        if (addScheduleMutation.isError) toast(addScheduleMutation.error.message);
    }, [addScheduleMutation]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-4/5 rounded-xl flex flex-col gap-6" aria-describedby={undefined}>
                <DialogHeader>
                    <DialogTitle>Novo horário</DialogTitle>
                </DialogHeader>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <DayOfWeekSelect
                        value={formValues.dayOfWeek}
                        onChange={handleChange("dayOfWeek")}
                    />
                    <div className="flex justify-between gap-4">
                        <HoursSelect
                            label="Entrada"
                            id="start-time"
                            value={formValues.startTime}
                            onChange={handleChange("startTime")}
                        />
                        <HoursSelect
                            label="Saída"
                            id="end-time"
                            hoursValidFrom={formValues.startTime}
                            value={formValues.endTime}
                            onChange={handleChange("endTime")}
                        />
                    </div>
                    <div className="flex justify-end mt-3 w-full">
                        <Button type="submit" className="flex gap-2">
                            <Plus/> Adicionar
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default NewScheduleDialog;