import HomeHeader from "@/modules/home/components/HomeHeader.tsx";
import AttendanceCard from "@/modules/home/components/attendance/AttendanceCard.tsx";
import useCheckSessionToken from "@/modules/common/hooks/user/useCheckSessionToken.ts";
import ScheduleCard from "@/modules/home/components/schedule/schedule-card/ScheduleCard.tsx";
import ScheduleTable from "@/modules/home/components/schedule/schedule-table/ScheduleTable.tsx";
import {useState} from "react";
import NewScheduleDialog from "@/modules/home/components/schedule/schedule-table/NewScheduleDialog.tsx";

const Home = () => {
    useCheckSessionToken();

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <main className="container flex flex-col items-center h-full w-full gap-4 py-4 px-8">
            <HomeHeader/>
            <AttendanceCard/>
            <ScheduleCard
                isNewSchedule={isDialogOpen}
                setIsNewSchedule={setIsDialogOpen}
            >
                <NewScheduleDialog
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                />
                <ScheduleTable/>
            </ScheduleCard>
        </main>
    );
};

export default Home;