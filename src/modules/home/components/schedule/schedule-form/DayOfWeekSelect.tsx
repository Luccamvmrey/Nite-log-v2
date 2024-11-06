// noinspection JSNonASCIINames

import {Label} from "@/components/ui/label.tsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {daysOfWeek} from "@/modules/common/models/DaysOfWeek.ts";

type DayOfWeekSelectProps = {
    onChange: (dayOfWeek: number) => void;
    value: number;
}

const DayOfWeekSelect = ({value, onChange}: DayOfWeekSelectProps) => {
    const getValue = () => {
        return daysOfWeek[value];
    }

    const handleChange = (dayOfWeek: string) => {
        onChange(daysOfWeek.indexOf(dayOfWeek));
    }

    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor="dayOfWeek" className="pl-1">Dia da semana</Label>
            <Select value={getValue()} onValueChange={handleChange}>
                <SelectTrigger id="dayOfWeek">
                    <SelectValue placeholder="Dia da semana"/>
                </SelectTrigger>
                <SelectContent>
                    {daysOfWeek.map((day, index) => (
                        <SelectItem value={day} key={index}>{day}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};

export default DayOfWeekSelect;