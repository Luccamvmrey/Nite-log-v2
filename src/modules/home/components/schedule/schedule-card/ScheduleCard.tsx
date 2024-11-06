import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {CalendarCheck} from "lucide-react";
import React from "react";
import {Button} from "@/components/ui/button.tsx";

type ScheduleCardProps = {
    isNewSchedule: boolean;
    setIsNewSchedule: (value: boolean) => void;
    children: React.ReactNode;
};

const ScheduleCard = ({isNewSchedule, setIsNewSchedule, children}: ScheduleCardProps) => {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex gap-2">Horários <CalendarCheck/></CardTitle>
                <CardDescription>Conte-nos mais sobre seus horários.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                {children}
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button variant="secondary" onClick={() => setIsNewSchedule(!isNewSchedule)}>
                    Novo horário
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ScheduleCard;