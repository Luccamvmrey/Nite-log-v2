import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Camera, NotebookPen} from "lucide-react";
import {useLocation} from "wouter";
import useMutateUser from "@/modules/common/hooks/user/useMutateUser.ts";
import useQueryUser from "@/modules/common/hooks/user/useQueryUser.ts";
import {useEffect, useState} from "react";

const AttendanceCard = () => {
    const {finishAttendanceMutation} = useMutateUser();
    const {userQuery} = useQueryUser();

    const [isUserOnList, setIsUserOnList] = useState(false);

    const handleFinishAttendance = () => {
        if (userQuery.data) {
            const {data: user} = userQuery.data;

            finishAttendanceMutation.mutate(user.id);
        }
    }

    useEffect(() => {
        if (userQuery.isSuccess && userQuery.data) {
            const {data: user} = userQuery.data;
            if (!user || !user.isOnAttendance) return;

            setIsUserOnList(true);
        }
    }, [userQuery]);

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex gap-2">Está no Nite? <NotebookPen/></CardTitle>
                <CardDescription>Registre sua presença!</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
                {!isUserOnList && <CaptureQR/>}
                {isUserOnList && <FinishAttendance onFinishAttendance={handleFinishAttendance}/>}
            </CardContent>
        </Card>
    );
};

const CaptureQR = () => {
    const [, navigate] = useLocation();

    return (
        <Button className="flex gap-2" onClick={() => navigate("/qr-reader")}>
            <Camera /> Capturar QR
        </Button>
    )
}

const FinishAttendance = ({onFinishAttendance}: {onFinishAttendance: () => void}) => {
    return (
        <Button className="flex gap-2" onClick={onFinishAttendance}>
            Finalizar Presença
        </Button>
    )
}

export default AttendanceCard;