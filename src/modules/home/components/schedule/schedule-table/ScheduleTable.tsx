import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import useQueryUser from "@/modules/common/hooks/user/useQueryUser.ts";
import Schedule from "@/modules/common/models/Schedule.ts";
import {useEffect, useState} from "react";
import {daysOfWeek} from "@/modules/common/models/DaysOfWeek.ts";
import {Loader} from "lucide-react";
import DeleteScheduleDialog from "@/modules/home/components/schedule/schedule-table/DeleteScheduleDialog.tsx";
import DeleteScheduleContextMenu from "@/modules/home/components/schedule/schedule-table/DeleteScheduleContextMenu.tsx";


const ScheduleTable = () => {
    const {userQuery} = useQueryUser();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState<Schedule>();
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const orderedSchedules = schedules.sort((a, b) => a.dayOfWeek - b.dayOfWeek);

    const handleContextOpen = (schedule: Schedule) => {
        setSelectedSchedule(schedule);
        setIsDialogOpen(true);
    }

    useEffect(() => {
        if (userQuery.isSuccess && userQuery.data) {
            const {data: user} = userQuery.data;

            if (!user || !user.schedules) return;

            setSchedules(user.schedules);
        }
    }, [userQuery]);

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">Dia</TableHead>
                        <TableHead className="text-center">Entrada</TableHead>
                        <TableHead className="text-center">Saída</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {orderedSchedules.map(schedule => (
                        <DeleteScheduleContextMenu key={schedule.id} schedule={schedule} onContextOpen={handleContextOpen}>
                            <TableRow>
                                <TableCell>{daysOfWeek[schedule.dayOfWeek]}</TableCell>
                                <TableCell className="text-center">{schedule.startTime}</TableCell>
                                <TableCell className="text-center">{schedule.endTime}</TableCell>
                            </TableRow>
                        </DeleteScheduleContextMenu>
                    ))}
                </TableBody>
            </Table>
            <DeleteScheduleDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} scheduleId={selectedSchedule?.id} />
            {userQuery.isLoading && <Loader className="absolute size-4"/>}
        </>
    );
};

export default ScheduleTable;